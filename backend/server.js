require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const dns = require("dns").promises;  // for MX record check
const validator = require("validator"); // for email validation


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
const cors = require("cors");

const corsOptions = {
  origin: [
    "http://127.0.0.1:5503",
    "http://localhost:5503",
    "https://anuya-10.github.io", // old placeholder
    "https://treata-yug.onrender.com" // ✅ your actual frontend
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
};
const express = require("express");
const app = express();
app.use(cors(corsOptions));


app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)

  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit if DB can't connect
  });


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },              // store OTP for forgot password
  otpExpiry: { type: Date }  ,
  verified: { type: Boolean, default: false },
verificationCode: { type: String },

           // OTP expiry time
});

// User Model
const User = mongoose.model("User", userSchema);

// Nodemailer setup (replace with your actual email and app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter Error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const { promisify } = require('util');
const sendMailAsync = promisify(transporter.sendMail).bind(transporter);



// Utility: Validate email syntax and check domain MX records
async function isValidEmail(email) {
  if (!validator.isEmail(email)) return false;

  const domain = email.split("@")[1];
  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (err) {
    return false;
  }
}


// Routes
// Verify Email Route
app.post("/verify-email", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationCode === verificationCode) {
      user.verified = true;
      user.verificationCode = undefined;
      await user.save();
      return res.status(200).json({ message: "Email verified" });
    } else {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




// Sign Up Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!(await isValidEmail(email))) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      if (!existingUser.verified) {
        // User exists but not verified — resend verification code

        // Generate new verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        existingUser.verificationCode = verificationCode;
        await existingUser.save();

        // Send verification email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Verify Your Email (Resent)',
          text: `Your verification code is: ${verificationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error resending verification email:", error);
            return res.status(500).json({ message: "Error sending verification email" });
          } else {
            return res.status(200).json({ 
              message: "Verification email resent. Please check your email." ,
              requireVerification: true
            });
          }
        });
      } else {
        // User exists and verified
        return res.status(400).json({ message: "User already exists. Please sign in." });
      }
      return; // exit after handling existing user
    }

    // New user - create account as usual
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      email,
      password: hashedPassword,
      verified: false,
      verificationCode,
    });

    await newUser.save();

    // Send verification email to new user
    const mailOptions = {
      from: 'anushkayadav9e.gr1@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${verificationCode}`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        return res.status(500).json({ message: "Error sending verification email" });
      } else {
        return res.status(201).json({ message: "User created. Check your email to verify your account." });
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Sign In Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.verified) {
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = verificationCode;
      await user.save();

      const mailOptions = {
        from: 'anushkayadav9e.gr1@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${verificationCode}`,
      };

      try {
        await sendMailAsync(mailOptions);
        return res.status(403).json({
          message: "Email not verified. Verification code sent to your email.",
          requireVerification: true
        });
      } catch (error) {
        console.error("Error sending verification email:", error);
        return res.status(500).json({ message: "Error sending verification email" });
      }
    }

    // Verified — check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "Sign in successful", token });

  } catch (error) {
    console.error("Full sign-in error:", error); // <--- This logs the full error to terminal
    res.status(500).json({ message: "Error during sign in", error: error.message });
  }
  
});


// Forgot Password Route - send OTP if email is valid & registered
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!(await isValidEmail(email))) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and expiry (e.g., 10 minutes from now)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: 'anushkayadav9e.gr1@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send OTP email" });
      } else {
        console.log("OTP email sent:", info.response);
        res.status(200).json({ message: "OTP sent to your email" });
      }
      console.log("Nodemailer response:", info);

    });
  } catch (error) {
    res.status(500).json({ message: "Error in forgot password", error });
  }
});

// Optionally, add route to verify OTP and reset password here...
// Reset Password Route
app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!(await isValidEmail(email))) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (!otp || !newPassword) {
    return res.status(400).json({ message: "OTP and new password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Hash the new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP and expiry fields
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in reset-password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get('/', (req, res) => {
  res.send('Backend is live!');
});
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});



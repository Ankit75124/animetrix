import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Anime } from "../models/Anime.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file =req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all details", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 409));
  }

  // Upload image to cloudinary;

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempurl",
    },
  });
  sendToken(res, user, "Registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // const file =req.file;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all details", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 401));
  }

  // Upload image to cloudinary;

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Email or Password", 401));
  }
  sendToken(res, user, `Welcome! back to Animetrix, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all details", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect old Password", 400));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed sucessfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated sucessfully",
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile Picture Updated sucessfully",
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `click on the link below to reset your password: \n\n${url}\n\nIf you have not requested this email, then ignore it.`;

  await sendEmail(user.email, "Animetrix Password Reset", message);
  res.status(200).json({
    success: true,
    message: `Reset link has been sent to your email ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has expired", 401)
    );
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated sucessfully",
  });
});

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const anime = await Anime.findById(req.body._id);

  if (!anime) return next(new ErrorHandler("Invalid Anime Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.anime.toString() === anime._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Anime Already Exist", 409));

  user.playlist.push({
    anime: anime._id,
    poster: anime.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist sucessfully",
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {

  const user = await User.findById(req.user._id);

  const anime = await Anime.findById(req.query.id);

  if (!anime) return next(new ErrorHandler("Invalid Anime Id", 404));

  const newPlaylist = user.playlist.filter(item=>{
    if(item.anime.toString()!=anime._id.toString()) return item;
  })

  user.playlist=newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed from playlist sucessfully",
  });

});

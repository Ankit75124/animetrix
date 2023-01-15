import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import  singleUpload  from "../middlewares/multer.js";

const router = express.Router();

// Register a user
router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// My Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete Own Profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Profile Picture
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload, updateProfilePicture);

// forget password
router.route("/forgetpassword").post(forgotPassword);

// reset password
router.route("/resetpassword/:token").put(resetPassword);

// Add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);



// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin,getAllUsers);


router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole).delete(isAuthenticated, authorizeAdmin, deleteUser);




export default router;

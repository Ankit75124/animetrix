import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {sendEmail} from "../utils/sendEmail.js";


export const contact = catchAsyncError(async (req, res, next) => {


    const {name,email,message} = req.body;

      if (!name || !email || !message)
        return next(new ErrorHandler("All fields are mandatory", 400));

    const to = process.env.MY_MAIL;

    const subject = "Contact Form Animetrix";
    const text = `I am ${name} and my email is ${email}. \n${message}`;

    await sendEmail(to,subject,text);

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
});

export const animeRequest = catchAsyncError(async (req, res, next) => {

  const { name, email, anime } = req.body;

        if (!name || !email || !anime)
          return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;

  const subject = "Request for new Anime on Animetrix";
  const text = `I am ${name} and my email is ${email}. \nI am requesting ${anime}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your request sent successfully",
  });
});


export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
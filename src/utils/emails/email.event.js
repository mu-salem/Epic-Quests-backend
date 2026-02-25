// Email Events
import { EventEmitter } from "events";
import { resetPasswordTemplate, verifyEmailTemplate } from './generateHTML.js';
import sendEmails from "./sendEmails.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("verifyEmail", async (email, otp, subject) => {
  await sendEmails({
    to: email,
    subject,
    html: verifyEmailTemplate(otp, email),
  });
});

eventEmitter.on("forgotPassword", async (email, code) => {
  await sendEmails({
    to: email,
    subject: "Reset Your Password",
    html: resetPasswordTemplate(code, email),
  });
});


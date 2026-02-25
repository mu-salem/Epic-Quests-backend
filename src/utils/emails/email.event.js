// Email Events
import { EventEmitter } from "events";
import sendEmails from "./sendEmails.js";
import { verifyEmailTemplate } from './generateHTML.js';

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


import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import nodemailer from "nodemailer";

class Notification {
  constructor(mainProcess: MainProcess) {}

  public async sendEmail(context: Context): Promise<Response> {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dvq2804@gmail.com",
          pass: "eyrd twqp objo irmc",
        },
      });
      var mailOptions = {
        from: "dvq2804@gmail.com",
        to: "dovanquan28041999@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return ResponseHelper.resOK(1);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }
}

export = Notification;

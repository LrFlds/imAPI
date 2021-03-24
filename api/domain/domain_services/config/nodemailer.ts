import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'; 
import * as dotenvExpand  from "dotenv-expand";



export class SendMail {

      private _transporter: nodemailer.Transporter; 
      constructor() { 
        this._transporter = nodemailer.createTransport( 
          `smtps://<username>%40gmail.com:<password>@smtp.gmail.com` 
        ); 
      } 
      sendMail(to: string, subject: string, content: string) { 
        let options = { 
          from: 'from_test@gmail.com', 
          to: to, 
          subject: subject, 
          text: content 
        } 
 
        this._transporter.sendMail(  
          options, (error, info) => { 
            if (error) { 
              return console.log(`error: ${error}`); 
            } 
            console.log(`Message Sent ${info.response}`); 
          }); 
      } 
    } 




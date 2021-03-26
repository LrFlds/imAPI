import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'; 
import * as dotenvExpand  from "dotenv-expand";



export class SendMail {

      private _transporter: nodemailer.Transporter; 
      constructor() { 
        this._transporter = nodemailer.createTransport( 
          `smtps://gladys%40gmail.com:gladys@smtp.gmail.com` 
        ); 
      } 
      sendMail(to: string, subject: string, content: string) { 
        let options = { 
          from: 'gladys.akela.pro@gmail.com', 
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




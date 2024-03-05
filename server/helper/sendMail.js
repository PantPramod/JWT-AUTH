import nodemailer from "nodemailer";

async function sendMail(sender, password, receiver, doc, token) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: sender,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        let info = await transporter.sendMail({
            from: sender,
            to: receiver,
            subject: "Welcome Message ",
            html: `<!DOCTYPE html>
            <html>
            <head>
                <title>Verify Email Address</title>
                <meta charset="utf-8" />
                <meta content="width=device-width" name="viewport" />
                <style>
                    * {
                        box-sizing: border-box
                    }
            
                    body,
                    h1,
                    p {
                        margin: 0,
                    }
                    h1{
                        padding:20px;
                    }
                    p{
                        margin-top:50px
                    }
                </style>
            </head>
            
            <body>
              <div class="max-width:500px; margin:auto">
                 <h1 style="color:#1e0e4b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:38px;font-weight:700;letter-spacing:1px;line-height:150%;text-align:center;margin-top:0;margin-bottom:0;"><span class="tinyMce-placeholder"><span style="color: #3019c7;">Welcome</span> </span> </h1>
                 <p style="text-align:center">
                 <a href="${process.env.CLIENT_URL}/verify?token=${token}">Click here to Veriy Email Address</a>
                 </p>
                 <p style="text-align:center">Thank you ${doc.email} For Signingup. After Email verification you can Browse Posts.</p>
              </div>
            </body>
            
        </html>`,
        });

        console.log("Message sent: %s", info.messageId);

    } catch (err) {
        console.log(err)
    }

}

export default sendMail
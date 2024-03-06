import nodemailer from "nodemailer";

async function sendMail(sender, password, receiver, token, getTemplate, subject) {
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
            subject: subject,
            html: getTemplate(token, receiver),
        });

        console.log("Message sent: %s", info.messageId);

    } catch (err) {
        console.log(err)
    }

}

export default sendMail
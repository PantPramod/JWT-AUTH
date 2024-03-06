const signupEmailTemplate=(token, email)=>{
return `<!DOCTYPE html>
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
     <p style="text-align:center">Thank you ${email} For Signingup. After Email verification you can Browse Posts.</p>
  </div>
</body>

</html>`
}


const ForgotPasswordTemplate=(token, email)=>{
    return`<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password Reset Link</title>
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
     <h1 style="color:#1e0e4b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:38px;font-weight:700;letter-spacing:1px;line-height:150%;text-align:center;margin-top:0;margin-bottom:0;"><span class="tinyMce-placeholder"><span style="color: #3019c7;">RESET PASSWORD</span> </span> </h1>
     <p style="text-align:center">
     <a href="${process.env.CLIENT_URL}/resetpassword?token=${token}">Click here to  Reset Password</a><br/>
     </p>
     <p style="text-align:center">Thank you ${email} .</p>
  </div>
</body>

</html>`
    }

export {signupEmailTemplate, ForgotPasswordTemplate}
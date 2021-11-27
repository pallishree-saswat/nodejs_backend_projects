const { nanoid } = require("nanoid");
const AWS = require("aws-sdk");

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
//   apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

const sendmail = async () => {
  const email = "pallishreeb@thecloudriders.com";
  const shortCode = nanoid(6).toUpperCase();
  
  try {
      // prepare for email
    const params = {
    Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
                  <html>
                    <h1>Reset password</h1>
                    <p>Use this code to reset your password</p>
                    <h2 style="color:red;">${shortCode}</h2>
                    <i>edemy.com</i>
                  </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset Password",
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

// module.exports = sendmail;
sendmail()

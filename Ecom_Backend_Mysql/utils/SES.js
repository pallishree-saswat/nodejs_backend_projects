const { nanoid } = require("nanoid");
const AWS = require("aws-sdk");

const env = require("dotenv");
env.config();

const awsConfig = {
  accessKeyId: "AKIAQMNOG7WXCVCLMONB",
  secretAccessKey: "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",
  region: "ap-south-1",
};

const SES = new AWS.SES(awsConfig);

const sendmail = async () => {
  const email = "pallishreebehera01@gmail.com";
  const shortCode = nanoid(6).toUpperCase();

  try {
    // prepare for email
    const params = {
      Source: "pallishreebehera01@gmail.com",
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
                    <i>cloudhub.com</i>
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
sendmail();

// AccessDenied: User `arn:aws:iam::454522539655:user/homedrect-s3' is not authorized to perform `ses:SendEmail' on resource `arn:aws:ses:ap-south-1:454522539655:identity/admin@thecloudriders.com'

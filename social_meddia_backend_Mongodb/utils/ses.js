const { nanoid } = require("nanoid");
const AWS = require("aws-sdk");

const env = require("dotenv");
env.config();

const awsConfig = {
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
};

const SES = new AWS.SES(awsConfig);

const sendmail = async () => {
  const email = "";
  const shortCode = nanoid(6).toUpperCase();

  try {
    // prepare for email
    const params = {
      Source: "welcome@vichayan.com", //from email
      Destination: {
        ToAddresses: [email], // user /To email - should recieved as parameter
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
                  <html>
                    <h1>OTP Verification - Vichayan</h1>
                    <p>Hi, Please find your OTP for verification</p>
                    <h2 style="color:red;">${shortCode}</h2>
                    <i>vichayan.com</i>
                  </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "OTP FROM Vichayan Application",
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log("Email Sent Successfully", data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

sendmail();

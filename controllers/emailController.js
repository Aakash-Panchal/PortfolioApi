const nodemailer = require("nodemailer");

const sendMail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.password,
  },
});

const sendEmail = (req, res) => {
  try {
    const mailOptions = {
      from: req.body.useremail,
      to: process.env.Email,
      subject: req.body.subject,
      text: req.body.message,
    };
    if (req.body.useremail === undefined) {
      res.status(404).send("Please enter your email");
    } else if (req.body.subject === undefined) {
      res.status(404).send("Please enter subject");
    } else if (req.body.message === undefined) {
      res.status(404).send("Please enter your message");
    } else {
      sendMail.sendMail(mailOptions, function (error, info) {
        res.send({ Message: "Email sent", info: info });
      });
    }
  } catch (error) {
    res.send({ Error: error });
  }
};

module.exports = sendEmail;

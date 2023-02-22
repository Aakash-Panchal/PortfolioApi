const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.password,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

const sendEmail = async (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.Email,
      subject: `You have a new email from ${req.body.name}`,
      text: req.body.message,
      template: "email",
      context: {
        name: req.body.name,
        email: req.body.email,
        work: req.body.work,
        my_info: req.body.my_info,
        message: req.body.message,
      },
    };

    const ResMailOptions = {
      from: req.body.email,
      to: req.body.email,
      subject: `Thank you for contacting Aakash`,
      text: req.body.message,
      template: "thankyou",
      context: {
        name: req.body.name,
        messgae: req.body.message,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
    });

    transporter.sendMail(ResMailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
    });

    res.send({ Message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.send({ Error: error });
  }
};

module.exports = sendEmail;

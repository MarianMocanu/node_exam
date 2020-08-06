const nodemailer = require('nodemailer');
const mailCredentials = require('../config/mailCredentials.js')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: mailCredentials.host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: mailCredentials.auth
});

module.exports = transporter;
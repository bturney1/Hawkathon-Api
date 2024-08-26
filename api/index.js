const express = require('express');
const nodeMailer = require('nodemailer');
const app = express();
app.use(express.json());
const port = 3000;

var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rewards.experience.hawkathon@gmail.com',
        pass: 'othd ixjs ocjl ebjd'
    }
});

app.post('/email', (req, res) => {
    var mailOptions = {
        from: 'rewards.experience.hawkathon@gmail.com',
        to: 'rewards.experience.hawkathon@gmail.com',// req.body.email, // email given from the api call
        subject: 'Sample email for test api.',
        text: 'Email was sent.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.status(500).json({'Message' : 'Error'});
        } else {
            console.log(`Email sent: ${info.response}`);
            res.status(200).json({'Message' : 'Email was sent'});
        }
    });
});

const postEmail = () => {
    var mailOptions = {
        from: 'rewards.experience.hawkathon@gmail.com',
        to: 'rewards.experience.hawkathon@gmail.com',// req.body.email, // email given from the api call
        subject: 'Sample email for test api.',
        text: 'Email was sent.'
      };
    
      try {
        transporter.sendMail(mailOptions);
        return {
          status: 200,
          data: 'Email sent.'
        }
      } catch(e) {
        console.error(e);
        return {
          status: 500,
          data: e
        }
      }
}

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(port, () => {
  console.log(`Test app listening on port ${port}`)
});
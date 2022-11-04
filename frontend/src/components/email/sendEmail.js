import emailjs from '@emailjs/browser';

var templateParams = {
    to_name: 'James',
    message: 'Hola Ya llegue!'
};

const sendEmail = () => {
    emailjs.send('', '', templateParams, '')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

export default sendEmail;
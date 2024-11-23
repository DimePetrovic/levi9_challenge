const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });  // Use your SES region


const SENDER_EMAIL = 'your-verified-email@example.com';
// const RECIPIENT_EMAIL = 'recipient-email@example.com';

exports.handler = async (event)=>{
    try {
        const {subject,body, recipient} = JSON.parse(event.body);
    } catch (error) {
        const params = {
            Soucre: SENDER_EMAIL,
            Destination: {
                toAddress: [recipient],
            }
        }
    }
}
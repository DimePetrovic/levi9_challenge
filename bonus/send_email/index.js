const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });  // Use your SES region


const SENDER_EMAIL = 'your-verified-email@example.com';
// const RECIPIENT_EMAIL = 'recipient-email@example.com';

exports.handler = async (event)=>{
    try {
        const {subject,body, recipient} = JSON.parse(event.body);
        const params = {
            Soucre: SENDER_EMAIL,
            Destination: {
                toAddress: [recipient],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Text: {
                        Data: body,
                    }
                }
            }
        }
        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Email sent successfully',
            }),
        };

    } catch (error) {
        console.error('Error sending email:', error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to send email',
                error: error.message,
            }),
        };
    }
}
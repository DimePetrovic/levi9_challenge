const AWS = require("aws-sdk");
const s3 = new AWS.S3();


const BUCKET_NAME = 'match-results-bucket';

exports.handler = async(event)=>{
    try{
        const incomingData = JSON.parse(event.body);
        const matchId = JSON.parse(event.body.matchId)
        const fileName = `match_results_${matchId}.json`
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: JSON.stringify(incomingData),
            ContentType: 'application/json'
        }
        await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Match results saved successfully',
                file: fileName,
            })
        }
    } catch (error){
        console.error('Error saving data to S3:',error);

        return{
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to save data',
                error: error.message
            })
        }
    }
}
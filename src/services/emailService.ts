import {SendEmailCommand, SESClient} from '@aws-sdk/client-ses';
import { error } from 'console';
require('dotenv').config()

const ses= new SESClient({region: 'us-east-2',});

function createSendEmailCommand(ToAddress: string, fromAddress: string, message: string){
    return new SendEmailCommand ({
        Destination: {
            ToAddresses: [ToAddress],
        },
        Source: fromAddress,
        Message: {
                Subject: {
                    Charset: 'UTF-8',
                    Data: "Your one-time password"
                },
                Body: {
                    Text: {
                        Charset: 'UTF-8',
                        Data: message,

                    },
                },
        },
    });
}

export async function sendEmailToken(email:string, token:string) {
    console.log('Email', email, token);

    const message= `Your one time password is: ${token}`;
    const command= createSendEmailCommand(
        email, 
        'robtheman2323@gmail.com',
        message
    );

    try {
        return await ses.send(command);
    } catch (e) {
        console.log('Error sending email', e);
        return error;
    }
}
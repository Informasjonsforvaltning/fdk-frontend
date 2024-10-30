import _ from 'lodash';
import { SchemaType } from './schema';

const getEmailContent = (emailData: SchemaType) => ({
    subject: 'Takk for din forespørsel til Datajegeren',
    body: `Når en av våre datajegere starter søket etter datasettet du ønsker tilgang på, får du en epost fra oss. I perioder med stor pågang kan det ta lenger tid før du hører fra oss igjen.

Vi gjør vårt ytterste for å hjelpe deg, men vi kan ikke garantere vi finner dataene du ønsker. Vi har heller ikke kontroll på datakvaliteten på det forespurte datasettet.

Under er kopi av forespørselen din. Dersom du har ytterligere informasjon å legge til, er det bare å svare på denne e-posten.

Med vennlig hilsen
Data.norge.no

Hvilket datasett trenger du?
${_.escape(emailData.dataset)}

Vet du hvor datasettet befinner seg?
${_.escape(emailData.location)}

Har du forsøkt å få tak i dette datasettet selv?
${_.escape(emailData.efforts)}

Ditt navn
${_.escape(emailData.name)}

E-postadresse
${_.escape(emailData.email)}

Telefonnummer
${_.escape(emailData.phoneNumber)}

Organisasjonsnummer
${_.escape(emailData.organizationNumber)}
`,
});

export const sendEmail = async (emailData: SchemaType) => {
    const { DATAJEGER_EMAIL_ADDRESS, FDK_MAIL_SERVICE_ENDPOINT, FDK_MAIL_SERVICE_API_KEY } = process.env;
    const emailContent = getEmailContent(emailData);
    const mail = {
        from: DATAJEGER_EMAIL_ADDRESS,
        to: emailData.email,
        bcc: DATAJEGER_EMAIL_ADDRESS,
        subject: emailContent.subject,
        body: emailContent.body,
    };
    const fetchOptions = {
        headers: {
            'X-API-KEY': FDK_MAIL_SERVICE_API_KEY ?? '',
        },
        method: 'POST',
        body: JSON.stringify(mail),
    };

    try {
        if (!FDK_MAIL_SERVICE_ENDPOINT) {
            throw new Error('Missing FDK_MAIL_SERVICE_ENDPOINT');
        }
        return await fetch(FDK_MAIL_SERVICE_ENDPOINT, fetchOptions);
    } catch (e) {
        return e;
    }
};

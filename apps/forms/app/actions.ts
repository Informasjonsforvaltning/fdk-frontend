/* eslint-disable no-console */
'use server';

import { revalidatePath } from 'next/cache';
import { extractFormEntries, FormState, FormStatusEnum, getFormState } from '@fdk-frontend/utils';
import { schema } from './[lang]/data-hunter/utils/schema';
import { sendEmail } from './[lang]/data-hunter/utils';

/**
 * This server action sends an email using the provided form data.
 *
 * @param prevState - The previous state of the form.
 * @param formData - The form data to be sent.
 * @returns A promise that resolves to the updated form state.
 */
export const sendEmailAction = async (prevState: FormState, formData: FormData) => {
    const parse = schema.safeParse(extractFormEntries(formData));

    if (!parse.success) {
        return getFormState(FormStatusEnum.ERROR, parse.error.formErrors.fieldErrors);
    }

    try {
        const response = await sendEmail(parse.data);
        if (response instanceof Error) {
            throw new Error(response.message);
        } else if (response instanceof Response && !response.ok) {
            throw new Error(response.statusText);
        }
        revalidatePath('/');
        return getFormState(FormStatusEnum.SUCCESS, 'Mail was sent successfully');
    } catch (e) {
        // TODO: Log error to some error tracking service, not logging out to console because of security reasons
        console.error('Sending email for Data Hunter Form failed');
        return getFormState(FormStatusEnum.ERROR, 'Sending email failed');
    }
};

'use server';

import { revalidatePath } from 'next/cache';
import { schema } from './schema';
import { FormState, fromErrorToFormState, toFormState } from './utils';

export const sendEmailAction = async (formState: FormState, formData: FormData) => {
  try {
    const data = schema.parse(formData.entries());
    // eslint-disable-next-line no-console
    console.log('Data:', data);

    // await 'Do your ting with data here';
    // eslint-disable-next-line no-console
    revalidatePath('/');
    return toFormState('SUCCESS', 'Mail send');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Sending email for Contact Form failed');
    return fromErrorToFormState(e);
  }
};

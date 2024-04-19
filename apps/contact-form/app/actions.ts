/* eslint-disable no-console */
'use server';

import { revalidatePath } from 'next/cache';
import { extractFormEntries, FormState, FormStatusEnum, getFormState } from '@fdk-frontend/utils';
import { schema } from './[lang]/schema';

export const sendEmailAction = async (prevState: FormState, formData: FormData) => {
  const parse = schema.safeParse(extractFormEntries(formData));

  if (!parse.success) {
    return getFormState(FormStatusEnum.ERROR, parse.error.formErrors.fieldErrors);
  }

  try {
    // TODO: Send email with form data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const data = parse.data;

    revalidatePath('/');
    return getFormState(FormStatusEnum.SUCCESS, 'Mail was sent successfully');
  } catch (e) {
    // TODO: Log error to some error tracking service, not logging out to console because of security reasons
    // eslint-disable-next-line no-console
    console.error('Sending email for Contact Form failed');
    return getFormState(FormStatusEnum.ERROR, 'Sending email failed');
  }
};

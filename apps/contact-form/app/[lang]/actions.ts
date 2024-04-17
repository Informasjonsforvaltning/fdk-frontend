'use server';

import { revalidatePath } from 'next/cache';
import { schema } from './schema';
import { InitialState } from './contact-form';

export const sendEmailAction = async (prevState: InitialState, formData: FormData) => {
  'use server';
  
  const parse = schema.safeParse({
    parsedFormData: formData.entries(),
  });

  if (!parse.success) {
    return { ...parse.error };
  }

  // const data = parse.data;
  // eslint-disable-next-line no-console
  console.log('sendEmailAction: parse: ', parse);

  try {
    // await 'Do your ting with data here';

    revalidatePath('/');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Sending email for Contact Form failed');
  }

  return {  };
};

/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
import { z } from 'zod';

/**
 * The validation schema for the data hunter form.
 * Form more information on the schema library, see https://zod.dev/?id=table-of-contents
 */
export const schema = z.object({
  dataset: z.string({ required_error: 'required' }).min(3, { message: 'minimumLength,3'}),
  location: z.string().optional(),
  efforts: z.string().optional(),
  email: z.string({ required_error: 'required' }).email({ message: 'invalidEmail' }),
  phoneNumber: z.string().optional(),
  name: z.string({ required_error: 'required' }),
  organizationNumber: z.string({ required_error: 'required' }).length(9, { message: 'invalidOrganizationNumber' }),
});

export type SchemaType = z.infer<typeof schema>;


/* eslint-disable no-magic-numbers */
import { z } from 'zod';

/**
 * The validation schema for the contact form.
 * Form more information on the schema library, see https://zod.dev/?id=table-of-contents
 */
export const schema = z.object({
  dataset: z.string().min(3),
  location: z.string().optional(),
  efforts: z.string().optional(),
  useCase: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  name: z.string(),
  organizationNumber: z.string().length(9),
});

export type Schema = z.infer<typeof schema>;

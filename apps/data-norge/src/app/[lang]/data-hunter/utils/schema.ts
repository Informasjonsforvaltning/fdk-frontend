import { z } from 'zod';

/**
 * The validation schema for the data hunter form.
 * Form more information on the schema library, see https://zod.dev/?id=table-of-contents
 */
export const schema = z.object({
    dataset: z.string().min(1, { message: 'required' }).min(3, { message: 'minimumLength,3' }),
    location: z.string().optional(),
    efforts: z.string().optional(),
    email: z
        .string()
        .min(1, { message: 'required' })
        .refine((val) => z.email().safeParse(val).success, { message: 'invalidEmail' }),
    phoneNumber: z.string().optional(),
    name: z.string().min(1, { message: 'required' }),
    organizationNumber: z.string().min(1, { message: 'required' }).length(9, { message: 'invalidOrganizationNumber' }),
});

export type SchemaType = z.infer<typeof schema>;

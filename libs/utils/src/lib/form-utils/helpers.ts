import { Dictionary } from '@fdk-frontend/dictionaries';
import { FormState } from './types';

/**
 * This method extracts error messages from the form state and returns them as a string array.
 * @param fieldName the field name to extract error messages for
 * @param state the form state to extract error messages from
 * @param dictionary the dictionary (language) to use for error messages
 * @returns the error messages as a string array
 */
export const extractErrorMessages = (
    fieldName: string,
    state: FormState | undefined,
    dictionary: Dictionary,
): string[] | string => {
    if (!state?.fieldErrors) {
        return '';
    }
    const errors = state.fieldErrors[fieldName] || [];
    const errorMessages = errors.map((error) => {
        const [message, length] = error.split(',');
        const errorMessage = dictionary.error[message as keyof typeof dictionary.error];
        return errorMessage ? `${errorMessage}${length ? ' ' + length : ''}` : dictionary.error.default;
    });
    return errorMessages.length ? errorMessages : '';
};

/**
 * Form data entries also constains other data than the form data wich is not needed. Here we filter out the data that is not needed.
 * @param formData the form data to extract entries from
 * @returns the form entries
 */
export const extractFormEntries = (formData: FormData) => ({
    ...(Array.from(formData.entries())
        .filter(([key]) => !key.startsWith('$'))
        .reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {} as Record<string, unknown>,
        ) as Record<string, unknown>),
});

import { FieldErrors, FormState, FormStatusEnum, FormStatusType, GetFormStateOverload } from './types';

export const EMPTY_FORM_STATE: FormState = {
    status: FormStatusEnum.UNSET,
    message: '',
    fieldErrors: {},
    timestamp: 0,
};

export const getFormState: GetFormStateOverload = (
    status: FormStatusType,
    payload?: FormState['message'] | FieldErrors,
): FormState => {
    switch (status) {
        case FormStatusEnum.ERROR:
            if (typeof payload === 'string') {
                return {
                    status,
                    message: payload,
                    fieldErrors: EMPTY_FORM_STATE.fieldErrors,
                    timestamp: Date.now(),
                };
            }
            return {
                status,
                message: EMPTY_FORM_STATE.message,
                fieldErrors: payload as FormState['fieldErrors'],
                timestamp: Date.now(),
            };
        case FormStatusEnum.SUCCESS:
            return {
                status,
                message: payload as FormState['message'],
                fieldErrors: EMPTY_FORM_STATE.fieldErrors,
                timestamp: Date.now(),
            };
        default:
            return {
                ...EMPTY_FORM_STATE,
                timestamp: Date.now(),
            };
    }
};

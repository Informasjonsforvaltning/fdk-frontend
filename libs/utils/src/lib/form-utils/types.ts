export enum FormStatusEnum {
    UNSET = 'UNSET',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type FormStatusType = (typeof FormStatusEnum)[keyof typeof FormStatusEnum];

export type FieldErrors = Record<string, string[] | undefined>;

export type FormState = {
    status: FormStatusType;
    message: string;
    fieldErrors: FieldErrors;
    timestamp: number;
};

export type GetFormStateOverload = {
    (status: FormStatusEnum, message: FormState['message']): FormState;
    (status: FormStatusEnum.ERROR, fieldErrors: FieldErrors): FormState;
};

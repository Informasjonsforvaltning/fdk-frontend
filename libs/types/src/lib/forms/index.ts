import { Schema } from "zod";

export type FormState = {
  formState?: Schema<unknown>;
  fieldErrors?: { [key: string]: string[] | undefined };
};

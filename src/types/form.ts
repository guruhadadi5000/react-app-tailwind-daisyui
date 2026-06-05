export type FormData = {
  fullName?: string;
  email?: string;
  about?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
  plan?: string;
  notifications?: string;
};

export type FormField = keyof FormData;

export type FormErrors = Partial<Record<FormField | "passwordMatch", string>>;

export type FormStepProps = {
  data: FormData;
  onChange: (key: FormField, value: string) => void;
  errors: FormErrors;
};

export type AccountInfoStepProps = FormStepProps;
export type PersonalInfoStepProps = FormStepProps;
export type PreferencesInfoStepProps = FormStepProps;
export type ReviewInfoStepProps = Pick<FormStepProps, "data">;

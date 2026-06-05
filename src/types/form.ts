export type FormStepProps = {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
  errors: Record<string, string>;
};

export type AccountInfoStepProps = FormStepProps;
export type PersonalInfoStepProps = FormStepProps;
export type PreferencesInfoStepProps = FormStepProps;
export type ReviewInfoStepProps = Pick<FormStepProps, "data">;

type TValidationPatterns = {
  FIRST_NAME: RegExp;
  SECOND_NAME: RegExp;
  EMAIL: RegExp;
  PHONE: RegExp;
  LOGIN: RegExp;
  PASSWORD: RegExp;
};

export const VALIDATION_PATTERNS: TValidationPatterns = {
  FIRST_NAME: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
  SECOND_NAME: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
  EMAIL: /^(?=.*[@])[a-z0-9_-]+@[a-z]+(?:\.[a-z]+)+$/i,
  PHONE: /^\+?\d{10,15}$/,
  LOGIN: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
};

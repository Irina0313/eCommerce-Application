interface IPasswordValidationResult {
  passwordErrors: string[];
  registerPasswordParams: {
    required: boolean;
    minLength: number;
    pattern: RegExp;
  };
}

export function usePasswordValidation(watchPassword: string): IPasswordValidationResult {
  const registerPasswordParams = {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/,
  };

  const passwordErrors: string[] = [];
  if (!watchPassword) {
    passwordErrors.push('This field is required');
  } else if (watchPassword.length < 8) {
    passwordErrors.push('Password must be at least 8 characters long');
  } else if (watchPassword.trim().length < watchPassword.length) {
    passwordErrors.push('Password must not contain leading or trailing whitespace');
  } else if (!watchPassword.match(/^(?=.*[!@#$%^&*])/)) {
    passwordErrors.push('Password must contain at least one special character (e.g., !@#$%^&*)');
  } else if (!watchPassword.match(/^(?=.*[A-Z])/)) {
    passwordErrors.push('Password must contain at least one uppercase letter (A-Z)');
  } else if (!watchPassword.match(/^(?=.*[a-z])/)) {
    passwordErrors.push('Password must contain at least one lowercase letter (a-z)');
  } else if (!watchPassword.match(/^(?=.*\d)/)) {
    passwordErrors.push('Password must contain at least one digit (0-9)');
  }
  return { passwordErrors, registerPasswordParams };
}

interface IPasswordValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    minLength: number;
    pattern: RegExp;
  };
}

export function usePasswordValidation(watcher: string): IPasswordValidationResult {
  const registerParams = {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/,
  };

  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (watcher.length < 8) {
    errorsArr.push('Password must be at least 8 characters long');
  } else if (watcher.includes(' ')) {
    errorsArr.push('Password must not contain whitespace');
  } else if (!watcher.match(/^(?=.*[!@#$%^&*])/)) {
    errorsArr.push('Password must contain at least one special character (e.g., !@#$%^&*)');
  } else if (!watcher.match(/^(?=.*[A-Z])/)) {
    errorsArr.push('Password must contain at least one uppercase letter (A-Z) ');
  } else if (!watcher.match(/^(?=.*[a-z])/)) {
    errorsArr.push('Password must contain at least one lowercase letter (a-z)');
  } else if (!watcher.match(/^(?=.*\d)/)) {
    errorsArr.push('Password must contain at least one digit (0-9)');
  }
  return { errorsArr, registerParams };
}

interface INameValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    pattern: RegExp;
  };
}

export function useNameValidation(watcher: string): INameValidationResult {
  const registerParams = {
    required: true,
    pattern: /^[A-Za-z]+$/,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Only letters of the English alphabet are allowed. At least one character is required, without special characters or numbers');
  }
  return { errorsArr, registerParams };
}

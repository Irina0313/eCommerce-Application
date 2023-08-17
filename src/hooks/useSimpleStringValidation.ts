//Just letters
interface ISimpleStringValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    pattern: RegExp;
  };
}

export function useSimpleStringValidation(watcher: string): ISimpleStringValidationResult {
  const registerParams = {
    required: true,
    pattern: /^[A-Za-z]+$/,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Only letters of the English al  phabet are allowed. At least one character is required, without special characters or numbers');
  }
  return { errorsArr, registerParams };
}

// At list one character

export function useOneCharacterValidation(watcher: string): ISimpleStringValidationResult {
  const registerParams = {
    required: true,
    pattern: /^(?!\s*$).+/,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Must contain at least one character');
  }
  return { errorsArr, registerParams };
}

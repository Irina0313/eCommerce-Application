interface IEmailValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    pattern: RegExp;
  };
}

export function useEmailValidation(watcher: string): IEmailValidationResult {
  const registerParams = {
    required: true,
    pattern: /^(?!.*\s)^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (watcher.trim().length < watcher.length) {
    errorsArr.push('Email address must not contain leading or trailing whitespace ');
  } else if (!watcher.includes('@')) {
    errorsArr.push('Email address must contain an @ symbol');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Email address must be properly formatted');
  }
  return { errorsArr, registerParams };
}

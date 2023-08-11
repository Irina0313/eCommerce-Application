interface IEmailValidationResult {
  emailErrors: string[];
  registerMailParams: {
    required: boolean;
    pattern: RegExp;
  };
}

export function useEmailValidation(watchMail: string): IEmailValidationResult {
  const registerMailParams = {
    required: true,
    pattern: /^(?!.*\s)^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  const emailErrors: string[] = [];
  if (!watchMail) {
    emailErrors.push('This field is required');
  } else if (watchMail.trim().length < watchMail.length) {
    emailErrors.push('Email address must not contain leading or trailing whitespace');
  } else if (!watchMail.includes('@')) {
    emailErrors.push('Email address must contain an @ symbol');
  } else if (!watchMail.match(/^(?!.*\s)^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    emailErrors.push('Email address must be properly formatted');
  }
  return { emailErrors, registerMailParams };
}

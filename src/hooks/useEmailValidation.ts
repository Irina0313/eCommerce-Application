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
    pattern: /^\S+@\S+\.\S+$/,
  };
  const emailErrors: string[] = [];
  if (!watchMail) {
    emailErrors.push('This field is required');
  } else if (!watchMail.match(/^\S+@\S+\.\S+$/)) {
    if (watchMail.includes(' ')) {
      emailErrors.push('Email address must not contain leading or trailing whitespace');
    }
    if (!watchMail.includes('@')) {
      emailErrors.push('Email address must contain an @ symbol');
    }
    emailErrors.push('Email address must be properly formatted');
  }

  return { emailErrors, registerMailParams };
}

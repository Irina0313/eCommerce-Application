interface ICountry {
  pattern: RegExp;
  code: string;
}
export const Countries: Record<string, ICountry> = {
  Canada: {
    pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    code: 'CA',
  },
  USA: {
    pattern: /^\d{5}(?:-\d{4})?$/,
    code: 'US',
  },
};

interface IPostalCodeValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    pattern: RegExp;
  };
}

export function usePostalCodeValidation(watcher: string, currentCountry: string): IPostalCodeValidationResult {
  // console.log(watcher, currentCountry);
  const countryPattern = Countries[currentCountry].pattern;

  const registerParams = {
    required: true,
    pattern: countryPattern,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Postal code must follow the format for the country ');
  }
  // console.log(errorsArr, registerParams);
  return { errorsArr, registerParams };
}

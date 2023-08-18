interface ICountry {
  [key: string]: RegExp;
}
export const Countries: ICountry = {
  Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
  USA: /^\d{5}(?:-\d{4})?$/,
};

interface IPostalCodeValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    pattern: RegExp | undefined;
  };
}

export function usePostalCodeValidation(watcher: string, currentCountry: string): IPostalCodeValidationResult {
  const countryPattern = Countries[currentCountry];

  const registerParams = {
    required: true,
    pattern: countryPattern || undefined,
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!watcher.match(registerParams.pattern)) {
    errorsArr.push('Postal code must follow the format for the country ');
  }
  return { errorsArr, registerParams };
}

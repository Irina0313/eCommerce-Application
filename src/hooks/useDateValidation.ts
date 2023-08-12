interface IBirthDateValidationResult {
  errorsArr: string[];
  registerParams: {
    required: boolean;
    validate: (dateOfBirth: string) => boolean;
  };
}
const acceptableAge = 13;
function isAcceptableAge(dateOfBirth: string): boolean {
  const parts = dateOfBirth.split('-');
  const birthDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (birthDate.getMonth() > currentDate.getMonth() || (birthDate.getMonth() === currentDate.getMonth() && birthDate.getDate() > currentDate.getDate())) {
    return age - 1 >= acceptableAge;
  } else {
    return age >= acceptableAge;
  }
}

export function useBirthDateValidation(watcher: string): IBirthDateValidationResult {
  const isOver13 = isAcceptableAge(watcher);
  const registerParams = {
    required: true,
    validate: (dateOfBirth: string) => isAcceptableAge(dateOfBirth),
  };
  const errorsArr: string[] = [];
  if (!watcher) {
    errorsArr.push('This field is required');
  } else if (!isOver13) {
    errorsArr.push('You are too young to create an account. The acceptable age is 13 years old');
  }
  return { errorsArr, registerParams };
}

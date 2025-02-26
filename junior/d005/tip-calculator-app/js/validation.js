export const validateInput = (input) => {
  const value = Number(input.value.replace(/,/g, ''));
  return {
    isValid: value > 0,
    errorMessage: value <= 0 ? "Can't be zero" : null
  };
};

export const validateBill = (bill) => {
  return validateInput(bill);
};

export const validatePeople = (people) => {
  return validateInput(people);
};
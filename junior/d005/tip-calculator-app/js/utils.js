export const formatters = {
  currency: (input) => {
    if (typeof input === 'number') {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(input);
    }

    let value = input.value.replace(/[^\d]/g, "");
    const numericValue = value;

    if (value === "") {
      input.value = "0.00";
      return 0;
    }

    input.value = (numericValue / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return numericValue/100;
  },
  
  percentage: (input) => {
    return input.toString().replace(/[^\d]/g, '');
  }
};

export const calculations = {
  tipAmount: (bill, people, tipPercentage) => {
    return (bill * tipPercentage) / people;
  },
  
  totalPerPerson: (bill, people, tipPercentage) => {
    return (bill * (1 + tipPercentage)) / people;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

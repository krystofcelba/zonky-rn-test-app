export const percentage = interestRate => (interestRate * 100).toFixed(2);

export const uniq = array => array.filter((el, i, a) => i === a.indexOf(el));

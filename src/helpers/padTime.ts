const padTime = (number: number | string) => {
  const stringNumber = number.toString();
  if (stringNumber.length <= 1) {
    return `0${stringNumber}`;
  }
  return stringNumber;
};

export default padTime;

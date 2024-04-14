function capitalizeFirstLetter(string: string) {
  const lowerCaseString = string.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

export default capitalizeFirstLetter;

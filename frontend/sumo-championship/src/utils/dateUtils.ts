function isDateBetween(
  startDate: string | undefined,
  endDate: string | undefined,
): boolean {
  if (!startDate || !endDate) {
    return false;
  }

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const currentDate = new Date();
  return currentDate >= startDateObject && currentDate <= endDateObject;
}

export { isDateBetween };

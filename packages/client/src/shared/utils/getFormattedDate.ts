export function getFormattedDate(value: string, withTime = false): string {
  if (!value) {
    return '';
  }
  const dateIOS = new Date(value).toISOString();
  const formattedDate = dateIOS.slice(0, 10);
  if (withTime) {
    const time = dateIOS.slice(11, 16);
    return `${formattedDate}; ${time}`;
  }
  return formattedDate;
}

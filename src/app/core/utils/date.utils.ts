export const toIsoDateInput = (value?: string): string => {
  if (!value) {
    return '';
  }
  return value.slice(0, 10);
};

export const formatReadableDate = (value?: string): string => {
  if (!value) {
    return 'Not provided';
  }
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value));
};

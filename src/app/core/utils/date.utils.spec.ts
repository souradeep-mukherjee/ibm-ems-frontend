import { formatReadableDate, toIsoDateInput } from './date.utils';

describe('date utils', () => {
  it('normalizes ISO input', () => {
    expect(toIsoDateInput('2026-07-08T10:00:00Z')).toBe('2026-07-08');
  });

  it('handles missing readable date', () => {
    expect(formatReadableDate()).toBe('Not provided');
  });
});

import { formatTemporalDate } from '.';

describe('formatTemporalDate', () => {
    it('renders year-only values as the raw year (nb)', () => {
        expect(formatTemporalDate('2024', 'nb')).toBe('2024');
    });

    it('renders year+month as "<month> <year>" in nb (no synthesized day)', () => {
        expect(formatTemporalDate('2024-06', 'nb')).toBe('juni 2024');
    });

    it('preserves full-date rendering for ISO dates (nb)', () => {
        expect(formatTemporalDate('2024-06-15', 'nb')).toBe('15. juni 2024');
    });

    it('respects other supported locales (en year+month)', () => {
        expect(formatTemporalDate('2024-06', 'en')).toBe('June 2024');
    });

    it('returns empty string for empty input', () => {
        expect(formatTemporalDate('', 'nb')).toBe('');
    });

    it('returns empty string for undefined input', () => {
        expect(formatTemporalDate(undefined, 'nb')).toBe('');
    });

    it('returns empty string for null input', () => {
        expect(formatTemporalDate(null, 'nb')).toBe('');
    });

    it('passes malformed input through without throwing', () => {
        expect(() => formatTemporalDate('not-a-date', 'nb')).not.toThrow();
        expect(formatTemporalDate('not-a-date', 'nb')).toBe('not-a-date');
    });

    it('does not throw when year+month has an invalid month', () => {
        expect(() => formatTemporalDate('2024-13', 'nb')).not.toThrow();
        expect(typeof formatTemporalDate('2024-13', 'nb')).toBe('string');
    });
});

import { describe, it, expect, vi } from 'vitest';
import {
  generateUniqueKey,
  getNestedValue,
  getSelectedOption,
  getThumbnailIcon,
  toPascalCase,
} from './commonUtils';
import AadhaarCard from '@core/assets/images/AadhaarCard.svg';
import { getInitials, getDisplayName } from './commonUtils';
import type { OptionType } from '@/core/types';
// Mock the image import
vi.mock('@core/assets/Image/AadhaarCard.svg', () => ({
  default: 'mock-aadhaar-icon.svg',
}));

describe('generateUniqueKey', () => {
  it('should return a string', () => {
    const key = generateUniqueKey();
    expect(typeof key).toBe('string');
  });

  it('should contain a timestamp prefix', () => {
    const now = Date.now();
    const key = generateUniqueKey();
    const [timestamp] = key.split('-');
    expect(Number(timestamp)).toBeGreaterThanOrEqual(now - 10);
    expect(Number(timestamp)).toBeLessThanOrEqual(Date.now());
  });

  it('should contain a random alphanumeric suffix', () => {
    const key = generateUniqueKey();
    const parts = key.split('-');
    expect(parts.length).toBeGreaterThan(1);
    const suffix = parts[1];
    expect(suffix).toMatch(/^[a-z0-9]+$/i);
    expect(suffix.length).toBeGreaterThan(0);
  });

  it('should generate unique values across multiple calls', () => {
    const keys = new Set<string>();
    for (let i = 0; i < 100; i++) {
      keys.add(generateUniqueKey());
    }
    expect(keys.size).toBe(100);
  });

  it('should not repeat keys when called consecutively', () => {
    const key1 = generateUniqueKey();
    const key2 = generateUniqueKey();
    expect(key1).not.toBe(key2);
  });
});

describe('getThumbnailIcon', () => {
  it('should return Aadhaar icon when name is "aadhaar"', () => {
    const icon = getThumbnailIcon('aadhaar');
    expect(icon).toBe(AadhaarCard);
  });

  it('should return Aadhaar icon when name is "Aadhaar" (case-insensitive)', () => {
    const icon = getThumbnailIcon('Aadhaar');
    expect(icon).toBe(AadhaarCard);
  });

  it('should return an empty string for undefined input', () => {
    const icon = getThumbnailIcon(undefined);
    expect(icon).toBe('');
  });
});

// Tests for getInitials
describe('getInitials', () => {
  it('returns NA for undefined or empty string', () => {
    expect(getInitials()).toBe('NA');
    expect(getInitials('')).toBe('NA');
    expect(getInitials('   ')).toBe('NA');
  });

  it('returns single initial for single-word names', () => {
    expect(getInitials('Dhanu')).toBe('D');
    expect(getInitials('arpan')).toBe('A');
  });

  it('returns first two initials for multi-word names', () => {
    expect(getInitials('Dhanu Varsha R')).toBe('DV');
    expect(getInitials('Arpan Chatterjee')).toBe('AC');
  });
});

// getDisplayName
describe('getDisplayName', () => {
  it('returns NA for undefined or empty string', () => {
    expect(getDisplayName()).toBe('NA');
    expect(getDisplayName('')).toBe('NA');
    expect(getDisplayName('   ')).toBe('NA');
  });

  it('returns full name for single-word names', () => {
    expect(getDisplayName('Dhanu')).toBe('Dhanu');
  });

  it('returns first two words for multi-word names', () => {
    expect(getDisplayName('Dhanu Varsha R')).toBe('Dhanu Varsha');
    expect(getDisplayName('Arpan Chatterjee Singh')).toBe('Arpan Chatterjee');
  });
});

describe('toPascalCase', () => {
  it('should convert snake_case to Pascal Case', () => {
    expect(toPascalCase('first_name')).toBe('First Name');
    expect(toPascalCase('user_id')).toBe('User Id');
  });

  it('should convert kebab-case to Pascal Case', () => {
    expect(toPascalCase('user-name')).toBe('User Name');
    expect(toPascalCase('multi-word-example')).toBe('Multi Word Example');
  });

  it('should convert camelCase to Pascal Case', () => {
    expect(toPascalCase('firstName')).toBe('First Name');
    expect(toPascalCase('userId')).toBe('User Id');
  });

  it('should handle PascalCase correctly (no double caps)', () => {
    expect(toPascalCase('FirstName')).toBe('First Name');
    expect(toPascalCase('UserId')).toBe('User Id');
  });

  it('should handle all lowercase and all uppercase words', () => {
    expect(toPascalCase('username')).toBe('Username');
    expect(toPascalCase('USERNAME')).toBe('Username');
  });

  it('should handle mixed separators (spaces, underscores, camelCase)', () => {
    expect(toPascalCase('first_name value')).toBe('First Name Value');
    expect(toPascalCase('userID_value')).toBe('User Id Value');
  });

  it('should handle empty string gracefully', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('should handle single character inputs', () => {
    expect(toPascalCase('a')).toBe('A');
    expect(toPascalCase('Z')).toBe('Z');
  });
});

describe('getNestedValue', () => {
  const sampleObj = {
    user: {
      profile: {
        name: 'Anupama',
        details: {
          age: 29,
          contact: { email: 'anupama@example.com' },
        },
      },
    },
    settings: {
      theme: 'dark',
      notifications: true,
    },
  };

  it('should retrieve a top-level property', () => {
    expect(getNestedValue(sampleObj, 'settings')).toEqual({
      theme: 'dark',
      notifications: true,
    });
  });

  it('should retrieve a deeply nested property', () => {
    expect(getNestedValue(sampleObj, 'user.profile.details.contact.email')).toBe(
      'anupama@example.com'
    );
  });

  it('should return undefined for invalid path', () => {
    expect(getNestedValue(sampleObj, 'user.profile.invalidKey')).toBeUndefined();
  });

  it('should return undefined for partial invalid path', () => {
    expect(getNestedValue(sampleObj, 'user.invalid.details')).toBeUndefined();
  });

  it('should return undefined for non-object input', () => {
    expect(getNestedValue(null, 'a.b')).toBeUndefined();
    expect(getNestedValue('string' as unknown, 'a.b')).toBeUndefined();
    expect(getNestedValue(123 as unknown, 'a.b')).toBeUndefined();
  });

  it('should handle path with single key', () => {
    expect(getNestedValue(sampleObj, 'user')).toEqual(sampleObj.user);
  });

  it('should handle object containing falsy values', () => {
    const obj = { config: { retry: 0, enabled: false } };
    expect(getNestedValue(obj, 'config.retry')).toBe(0);
    expect(getNestedValue(obj, 'config.enabled')).toBe(false);
  });
});

describe('getSelectedOption', () => {
  const options: OptionType[] = [
    { id: 1, label: 'One' },
    { id: '2', label: 'Two' },
    { id: 3, label: 'Three' },
  ];

  it('should return the matching option when value is a number', () => {
    const result = getSelectedOption(1, options);
    expect(result).toEqual({ id: 1, label: 'One' });
  });

  it('should return the matching option when value is a string', () => {
    const result = getSelectedOption('2', options);
    expect(result).toEqual({ id: '2', label: 'Two' });
  });

  it('should perform string-based comparison (handles type mismatch)', () => {
    const result = getSelectedOption('3', options);
    expect(result).toEqual({ id: 3, label: 'Three' });
  });

  it('should return null when no matching id is found', () => {
    const result = getSelectedOption('999', options);
    expect(result).toBeNull();
  });

  it('should return null when value is null or undefined', () => {
    expect(getSelectedOption(null as unknown as string, options)).toBeNull();
    expect(getSelectedOption(undefined as unknown as string, options)).toBeNull();
  });

  it('should return null when options array is empty', () => {
    const result = getSelectedOption(1, []);
    expect(result).toBeNull();
  });

  it('should handle mixed type ids gracefully', () => {
    const mixedOptions = [
      { id: '001', label: 'String ID' },
      { id: 2, label: 'Number ID' },
    ];

    expect(getSelectedOption(2, mixedOptions)).toEqual({ id: 2, label: 'Number ID' });
    expect(getSelectedOption('001', mixedOptions)).toEqual({ id: '001', label: 'String ID' });
  });
});

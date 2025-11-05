import type { OptionType } from '@/core/types';
import AadhaarCard from '@core/assets/images/AadhaarCard.svg';
import DefaultPreview from '@core/assets/images/DefaultPreview.svg';

// Generate a random unique key
export const generateUniqueKey = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get the corresponding Thumbnail Icon for the name given
export const getThumbnailIcon = (name?: string) => {
  if (!name) return '';

  const key = name.toLowerCase();

  if (key === 'aadhaar') {
    return AadhaarCard; // TODO: Add all the Available Document Names with the corresponding thumbnail icon
  }

  return DefaultPreview;
};

//Avatar initals
export const getInitials = (fullName?: string) => {
  if (!fullName || fullName.trim() === '') return 'NA';

  const parts = fullName.trim().split(/\s+/);

  const initials =
    parts.length === 1
      ? parts[0].charAt(0).toUpperCase()
      : parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();

  return initials;
};

//userName Display
export const getDisplayName = (fullName?: string) => {
  if (!fullName || fullName.trim() === '') return 'NA';
  const parts = fullName.trim().split(/\s+/);

  return parts.slice(0, 2).join(' ');
};

/**
 * Converts a given string to Pascal Case format.
 *
 * The function splits the input string by spaces and underscores, capitalizes the first letter of each word,
 * and joins them with a space. It also handles camelCase by inserting spaces between lowercase and uppercase letters.
 *
 * @param text - The input string to convert.
 * @returns The Pascal Case formatted string.
 */
export const toPascalCase = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
    .replace(/[-_]+/g, ' ') // replace underscores and dashes with spaces
    .split(/\s+/) // split on one or more spaces
    .filter(Boolean) // remove empty strings
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Safely retrieves a nested value from an object using dot-notation keys.
 * Example: getNestedValue(obj, 'a.b.c') → obj.a.b.c
 */
export const getNestedValue = (obj: unknown, path: string): unknown => {
  if (typeof obj !== 'object' || obj === null) return undefined;

  return path.split('.').reduce<unknown>((acc, key) => {
    if (typeof acc === 'object' && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

// To filter selected option object from options array for autocomplete fields
export const getSelectedOption = (value: string | number, options: OptionType[]) => {
  if (value != null && options.length > 0) {
    const match = options.find((opt) => String(opt.id) === String(value));
    return match ?? null;
  }

  return null;
};

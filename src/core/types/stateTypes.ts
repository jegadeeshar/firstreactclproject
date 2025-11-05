import type { DomainType } from '@/core/types';

export interface LoginUserState {
  isLoggedIn: boolean;
  domain: DomainType;
  username: string | null;
  branch: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}
export interface CdfSearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  width?: number | string;
  fullWidth?: boolean;
  onSearch?: (value: string) => void;
}

export interface StyledSearchBoxProps {
  width?: string | number;
  disabled?: boolean;
}

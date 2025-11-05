import type { LoginUserState } from '@/core/types';
import { create } from 'zustand';

/**
 * Zustand store for managing the login state of a user.
 *
 * @remarks
 * This store provides state and actions related to user authentication,
 * including login and logout functionality. It tracks whether a user is
 * logged in, their username, and their authentication token.
 *
 * @example
 * ```tsx
 * const { isLoggedIn, username, login, logout } = useLoginUserStore();
 * ```
 *
 * @returns
 * An object containing:
 * - `isLoggedIn`: boolean indicating if the user is logged in.
 * - `username`: the logged-in user's username or null.
 * - `token`: the authentication token or null.
 * - `login`: function to log in a user.
 * - `logout`: function to log out the user.
 */
const useLoginUserStore = create<LoginUserState>((set) => ({
  isLoggedIn: true, // TODO: change to false after testing
  username: 'Punith Kumar', // TODO: remove default username after testing
  branch: 'Chennai', // TODO: remove default branch after testing
  domain: 'default', // Example domain, can be set during login
  // TODO: remove token after testing
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXNpZ25hdGlvbiI6IkNDUF9BUElNIiwidXNlcklkIjoidmYtZGVkdXBlLXVzZXIiLCJlbXBsb3llZU5hbWUiOiJ2Zi1kZWR1cGUtdXNlciIsImVtYWlsSWQiOiJ2Zi1kZWR1cGUtdXNlci1uby1yZXBseUBjaG9sYS5tdXJ1Z2FwcGEuY29tIiwiYnJhbmNoSWQiOiIxMDciLCJhcmVhSWQiOiIzMSIsInJlZ2lvbklkIjoiNiIsInpvbmVJZCI6IjEiLCJ0ZXJyaXRvcnlUeXBlIjoiQlJBTkNIIiwidmVydGljYWwiOiJ2ZiIsInBlcm1pc3Npb25zIjpbInZpZXdCdXNpbmVzc0NvbmZpZyIsImNhbkRvRGVkdXBlIiwidmlld0RlZHVwZSIsInZpZXdBZ3JlZW1lbnQiXSwidXNlclR5cGUiOiJzeXN0ZW0iLCJzdGF0dXMiOiJBIiwicHJvZHVjdCI6IkNWIiwiYnJhbmNoTmFtZSI6IkNPSU1CQVRPUkUgVkYiLCJzZXNzaW9uTmFtZSI6InZmLWRlZHVwZS11c2VyXzI1MDgwNTA5MDI0NTcyMCIsInNlc3Npb25JZCI6InZmLWRlZHVwZS11c2VyXzI1MDgwNTA5MDI0NTcyMF9TUmVINjRfcyIsInRva2VuVHlwZSI6ImFjY2VzcyIsImV4cGlyeUF0IjoiMjAyNi0wOC0wNVQwOTowMjo0NS43MjBaIiwiaWF0IjoxNzU0Mzg0NTY1LCJleHAiOjE3ODU5MjA1NjV9.-rHb3qpGATKqQoBr1XP02YWOdy6u1nC7GIUvQoqDnwc',
  login: (username, token) => set({ isLoggedIn: true, username, token }),
  logout: () => set({ isLoggedIn: false, username: null, token: null }),
}));

export default useLoginUserStore;

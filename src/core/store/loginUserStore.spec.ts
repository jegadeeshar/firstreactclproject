import { describe, it, expect, beforeEach } from 'vitest';
import useLoginUserStore from './loginUserStore';

// Helper to reset the store before each test
const resetStore = () => {
  const { logout } = useLoginUserStore.getState();
  logout();
};

describe('useLoginUserStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('should have initial state', () => {
    const state = useLoginUserStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.username).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should login a user', () => {
    const { login } = useLoginUserStore.getState();
    login('anupama', 'fake-token');

    const state = useLoginUserStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.username).toBe('anupama');
    expect(state.token).toBe('fake-token');
  });

  it('should logout a user', () => {
    const { login, logout } = useLoginUserStore.getState();

    login('anupama', 'fake-token');
    logout();

    const state = useLoginUserStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.username).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should override login state when logging in again', () => {
    const { login } = useLoginUserStore.getState();

    login('firstUser', 'first-token');
    login('secondUser', 'second-token');

    const state = useLoginUserStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.username).toBe('secondUser');
    expect(state.token).toBe('second-token');
  });
});

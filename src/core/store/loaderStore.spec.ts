import { describe, it, expect, beforeEach } from 'vitest';
import useLoaderStore from './loaderStore';

// Zustand maintains state globally, so reset it between tests
beforeEach(() => {
  const { hideLoader } = useLoaderStore.getState();
  hideLoader();
});

describe('useLoaderStore', () => {
  it('should have isLoading as false by default', () => {
    const state = useLoaderStore.getState();
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading to true when showLoader is called', () => {
    const { showLoader } = useLoaderStore.getState();
    showLoader();

    const state = useLoaderStore.getState();
    expect(state.isLoading).toBe(true);
  });

  it('should set isLoading to false when hideLoader is called', () => {
    const { showLoader, hideLoader } = useLoaderStore.getState();

    showLoader(); // turn it on first
    expect(useLoaderStore.getState().isLoading).toBe(true);

    hideLoader(); // then hide it
    expect(useLoaderStore.getState().isLoading).toBe(false);
  });

  it('should toggle state correctly across multiple calls', () => {
    const { showLoader, hideLoader } = useLoaderStore.getState();

    expect(useLoaderStore.getState().isLoading).toBe(false);

    showLoader();
    expect(useLoaderStore.getState().isLoading).toBe(true);

    hideLoader();
    expect(useLoaderStore.getState().isLoading).toBe(false);

    showLoader();
    expect(useLoaderStore.getState().isLoading).toBe(true);
  });
});

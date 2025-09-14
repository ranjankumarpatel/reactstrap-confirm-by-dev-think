import { useCallback } from 'react';
import { confirm, ConfirmOptions } from '../index';

export function useConfirm(defaultOptions: ConfirmOptions = {}) {
  return useCallback((options: ConfirmOptions = {}) => {
    return confirm({ ...defaultOptions, ...options });
  }, [defaultOptions]);
}

export default useConfirm;

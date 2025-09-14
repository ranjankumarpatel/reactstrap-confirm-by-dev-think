import { useCallback } from 'react';
import { confirm, type ConfirmOptions } from '../confirm';

export function useConfirm(defaultOptions: ConfirmOptions = {}) {
	return useCallback((options: ConfirmOptions = {}) => {
		return confirm({ ...defaultOptions, ...options });
	}, [defaultOptions]);
}

export default useConfirm;
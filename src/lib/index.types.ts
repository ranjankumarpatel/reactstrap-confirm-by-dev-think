import type { ConfirmModalProps } from './components/ConfirmModal';
export type { ConfirmModalProps } from './components/ConfirmModal';
export { useConfirm } from './hooks/useConfirm';
import type { ConfirmOptions } from './confirm';
export type { ConfirmOptions } from './confirm';
export declare function confirm(options?: ConfirmOptions): Promise<boolean>;
export { default as ConfirmModal } from './components/ConfirmModal';
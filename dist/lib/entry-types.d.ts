export type { ConfirmModalProps } from './components/ConfirmModal';
export type { ConfirmOptions } from './confirm';
export { useConfirm } from './hooks/useConfirm';
export declare function confirm(options?: import('./confirm').ConfirmOptions): Promise<boolean>;

import { ConfirmModalProps } from './components/ConfirmModal';
export interface ConfirmOptions extends Partial<ConfirmModalProps> {
}
export declare function confirm(options?: ConfirmOptions): Promise<boolean>;
export default confirm;

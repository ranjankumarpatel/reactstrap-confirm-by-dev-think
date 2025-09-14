import React, { CSSProperties, ReactNode } from 'react';
export interface ConfirmModalProps {
    onClose: (result: boolean) => void;
    message?: ReactNode;
    title?: ReactNode;
    confirmText?: ReactNode;
    cancelText?: ReactNode;
    confirmColor?: string;
    cancelColor?: string;
    className?: string;
    buttonsComponent?: React.ComponentType<{
        onClose: (result: boolean) => void;
    }> | null;
    size?: string | null;
    closedforContent?: boolean;
    zIndexModal?: number;
    styleHeader?: CSSProperties;
    styleFooter?: CSSProperties;
}
declare const ConfirmModal: React.FC<ConfirmModalProps>;
export default ConfirmModal;

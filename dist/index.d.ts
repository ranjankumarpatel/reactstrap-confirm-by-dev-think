import React, { ReactNode, CSSProperties } from 'react';

interface ConfirmModalProps {
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

interface ConfirmOptions extends Partial<ConfirmModalProps> {
}

declare function useConfirm(defaultOptions?: ConfirmOptions): (options?: ConfirmOptions) => Promise<boolean>;

declare function confirm(options?: ConfirmOptions): Promise<boolean>;

export { confirm, useConfirm };
export type { ConfirmModalProps, ConfirmOptions };

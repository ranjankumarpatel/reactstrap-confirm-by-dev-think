import React from 'react';
import { createRoot } from 'react-dom/client';
import ConfirmModal from './components/ConfirmModal';

export interface ConfirmOptions {
  message?: React.ReactNode;
  title?: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmColor?: string;
  cancelColor?: string;
  className?: string;
  buttonsComponent?: React.ComponentType<{ onClose: (result: boolean) => void }> | null;
  size?: string | null;
  closedforContent?: boolean;
  zIndexModal?: number;
  styleHeader?: React.CSSProperties;
  styleFooter?: React.CSSProperties;
}

export function confirm(options: ConfirmOptions = {}): Promise<boolean> {
  return new Promise((resolve) => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = createRoot(el);

    const handleResolve = (result: boolean) => {
      root.unmount();
      if (el.parentNode) el.parentNode.removeChild(el);
      resolve(result);
    };

    const props: any = { ...options, onClose: handleResolve };
    root.render(React.createElement(ConfirmModal as any, props));
  });
}

export { ConfirmModal };
export default confirm;

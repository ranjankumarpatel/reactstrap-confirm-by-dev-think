import React from 'react';
import { createRoot } from 'react-dom/client';
import ConfirmModal, { ConfirmModalProps } from './components/ConfirmModal';

export interface ConfirmOptions extends Partial<ConfirmModalProps> {}

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

export default confirm;
import React, { CSSProperties, ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export interface ConfirmModalProps {
  onClose: (result: boolean) => void;
  message?: ReactNode;
  title?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  confirmColor?: string;
  cancelColor?: string;
  className?: string;
  buttonsComponent?: React.ComponentType<{ onClose: (result: boolean) => void }> | null;
  size?: string | null;
  closedforContent?: boolean;
  zIndexModal?: number;
  styleHeader?: CSSProperties;
  styleFooter?: CSSProperties;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  message = 'Are you sure?',
  title = 'Warning!',
  confirmText = 'Ok',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  cancelColor = '',
  className = '',
  buttonsComponent = null,
  size = null,
  closedforContent = true,
  zIndexModal = 999,
  styleHeader = {},
  styleFooter = {},
}) => {
  let buttonsContent: React.ReactNode = (
    <>
      {cancelText && (
        <Button color={cancelColor} onClick={() => onClose(false)}>
          {cancelText}
        </Button>
      )}{' '}
      <Button color={confirmColor} onClick={() => onClose(true)}>
        {confirmText}
      </Button>
    </>
  );

  if (buttonsComponent) {
    const CustomComponent = buttonsComponent;
    buttonsContent = <CustomComponent onClose={onClose} />;
  }

  return (
    <Modal
      size={size as any}
      isOpen={true}
      zIndex={zIndexModal}
      toggle={() => {
        if (closedforContent) {
          return onClose(false);
        }
      }}
      className={`reactstrap-confirm ${className}`}
    >
      {title && (
        <ModalHeader toggle={() => onClose(false)} style={styleHeader}>
          {title || null}
        </ModalHeader>
      )}
      <ModalBody>{message}</ModalBody>
      <ModalFooter style={styleFooter}>{buttonsContent}</ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;

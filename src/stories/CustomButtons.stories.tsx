import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConfirmModal, type ConfirmModalProps } from '../lib';
import { Button } from 'reactstrap';

const FancyButtons: React.FC<{ onClose: (r: boolean) => void }> = ({ onClose }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="secondary" outline onClick={() => onClose(false)}>No Thanks</Button>
    <Button color="warning" onClick={() => onClose(true)}>Do It!</Button>
  </div>
);

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal/CustomButtons',
  component: ConfirmModal,
  args: {
    title: 'Custom Buttons',
    message: 'Buttons injected via buttonsComponent prop',
    buttonsComponent: FancyButtons
  },
  parameters: {
    docs: {
      description: {
        component: 'Demonstrates passing a custom component via buttonsComponent to fully control footer buttons.'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Example: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { ConfirmModal } from '../lib';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  args: {
    message: 'Are you sure you want to proceed?',
    title: 'Confirm Action',
    confirmText: 'Yes',
    cancelText: 'No'
  },
  parameters: {
    docs: {
      description: {
        component: 'The base modal component used by the confirm() API and useConfirm hook.'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Basic: Story = {
  args: {},
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  args: {
    confirmColor: 'success',
    cancelColor: 'danger',
    confirmText: 'Accept',
    cancelText: 'Reject'
  }
};

export const WithoutCancel: Story = {
  name: 'Without Cancel Button',
  args: {
    cancelText: undefined
  }
};

export const CustomSize: Story = {
  name: 'Custom Size (lg)',
  args: {
    size: 'lg'
  }
};

export const CustomStyles: Story = {
  name: 'Custom Inline Styles',
  args: {
    styleHeader: { background: '#0d6efd', color: 'white' },
    styleFooter: { justifyContent: 'center' }
  }
};

export const InteractionConfirm: Story = {
  name: 'Interaction Test: Confirm flow',
  args: {
    title: 'Clicking confirm resolves',
    message: 'This story uses a play function to simulate a user click.'
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    // last button should be confirm
    const confirmBtn = buttons[buttons.length - 1];
    await userEvent.click(confirmBtn);
    // After click, component should unmount. We just assert the DOM changed.
    await expect(confirmBtn).not.toBeInTheDocument();
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { ConfirmModal } from '../lib';

const BASIC_CODE = `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';

export default function Example() {
  return (
    <ConfirmModal
      onClose={(result) => console.log(result)}
      title="Confirm Action"
      message="Are you sure you want to proceed?"
      confirmText="Yes"
      cancelText="No"
    />
  );
}`;

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
      },
      source: { code: BASIC_CODE }
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
  },
  parameters: {
    docs: {
      source: {
        code: `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';

<ConfirmModal
  onClose={(r) => console.log(r)}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  confirmColor="success"
  cancelColor="danger"
  confirmText="Accept"
  cancelText="Reject"
/>`
      }
    }
  }
};

export const WithoutCancel: Story = {
  name: 'Without Cancel Button',
  args: {
    cancelText: undefined
  },
  parameters: {
    docs: {
      source: { code: `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';

<ConfirmModal
  onClose={(r) => console.log(r)}
  title="Confirm Action"
  message="Proceed without cancel?"
  confirmText="Yes"
  cancelText={undefined}
/>` }
    }
  }
};

export const CustomSize: Story = {
  name: 'Custom Size (lg)',
  args: {
    size: 'lg'
  },
  parameters: {
    docs: {
      source: { code: `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';

<ConfirmModal
  onClose={(r) => console.log(r)}
  title="Large Modal"
  message="This confirm modal is large."
  size="lg"
/>` }
    }
  }
};

export const CustomStyles: Story = {
  name: 'Custom Inline Styles',
  args: {
    styleHeader: { background: '#0d6efd', color: 'white' },
    styleFooter: { justifyContent: 'center' }
  },
  parameters: {
    docs: {
      source: { code: `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';

<ConfirmModal
  onClose={(r) => console.log(r)}
  title="Styled Header"
  message="Custom inline styles for header and footer."
  styleHeader={{ background: '#0d6efd', color: 'white' }}
  styleFooter={{ justifyContent: 'center' }}
/>` }
    }
  }
};

export const InteractionConfirm: Story = {
  name: 'Interaction Test: Confirm flow',
  args: {
    title: 'Clicking confirm resolves',
    message: 'This story uses a play function to simulate a user click.'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    // last button should be confirm
    const confirmBtn = buttons[buttons.length - 1];
    await userEvent.click(confirmBtn);
    // After click, component should unmount. We just assert the DOM changed.
    await expect(confirmBtn).not.toBeInTheDocument();
  }
};

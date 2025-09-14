import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { within, userEvent, expect, screen, waitFor } from '@storybook/test';
import { ConfirmModal } from '../lib';
import { Button } from 'reactstrap';
import { ShowCode } from './ShowCode';

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
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

const ModalTrigger: React.FC<{ args: any }> = ({ args }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="secondary" onClick={() => setOpen(true)}>Open Confirm Modal</Button>
      {open && (
        <ConfirmModal
          {...args}
          onClose={(r) => {
            // eslint-disable-next-line no-console
            console.log('Result:', r);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export const Basic: Story = {
  args: {},
  render: (args: any) => (
    <>
      <ModalTrigger args={args} />
      <ShowCode code={BASIC_CODE} />
    </>
  )
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  args: {
    confirmColor: 'success',
    cancelColor: 'danger',
    confirmText: 'Accept',
    cancelText: 'Reject'
  },
  render: (args: any) => (
    <>
      <ModalTrigger args={args} />
      <ShowCode code={`import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';\n\n<ConfirmModal\n  onClose={(r) => console.log(r)}\n  title=\"Confirm Action\"\n  message=\"Are you sure you want to proceed?\"\n  confirmColor=\"success\"\n  cancelColor=\"danger\"\n  confirmText=\"Accept\"\n  cancelText=\"Reject\"\n/>`} />
    </>
  )
};

export const WithoutCancel: Story = {
  name: 'Without Cancel Button',
  args: { cancelText: undefined },
  render: (args: any) => (
    <>
      <ModalTrigger args={args} />
      <ShowCode code={`import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';\n\n<ConfirmModal\n  onClose={(r) => console.log(r)}\n  title=\"Confirm Action\"\n  message=\"Proceed without cancel?\"\n  confirmText=\"Yes\"\n  cancelText={undefined}\n/>`} />
    </>
  )
};

export const CustomSize: Story = {
  name: 'Custom Size (lg)',
  args: { size: 'lg' },
  render: (args: any) => (
    <>
      <ModalTrigger args={args} />
      <ShowCode code={`import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';\n\n<ConfirmModal\n  onClose={(r) => console.log(r)}\n  title=\"Large Modal\"\n  message=\"This confirm modal is large.\"\n  size=\"lg\"\n/>`} />
    </>
  )
};

export const CustomStyles: Story = {
  name: 'Custom Inline Styles',
  args: { styleHeader: { background: '#0d6efd', color: 'white' }, styleFooter: { justifyContent: 'center' } },
  render: (args: any) => (
    <>
      <ModalTrigger args={args} />
      <ShowCode code={`import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';\n\n<ConfirmModal\n  onClose={(r) => console.log(r)}\n  title=\"Styled Header\"\n  message=\"Custom inline styles for header and footer.\"\n  styleHeader={{ background: '#0d6efd', color: 'white' }}\n  styleFooter={{ justifyContent: 'center' }}\n/>`} />
    </>
  )
};

export const InteractionConfirm: Story = {
  name: 'Interaction Test: Confirm flow',
  args: { title: 'Clicking confirm resolves', message: 'This story uses a play function to simulate a user click.', confirmText: 'Ok', cancelText: 'Cancel' },
  // We render the modal opened by default so the play function can immediately interact with it.
  render: (args: any) => {
  const OpenModal: React.FC<{ args: any }> = ({ args }: { args: any }) => {
      const [open, setOpen] = React.useState(true);
      return open ? (
        <ConfirmModal
          {...args}
          onClose={() => {
            // eslint-disable-next-line no-console
            console.log('Result: confirmed');
            setOpen(false);
          }}
        />
      ) : null;
    };
    return <OpenModal args={args} />;
  },
  play: async ({ args }: { args: any }) => {
    // The modal content is rendered in a portal (outside the canvas element),
    // so we must query the global screen instead of within(canvasElement).
    const confirmLabel = args.confirmText || 'Ok';
    const confirmBtn = await screen.findByRole('button', { name: new RegExp(`^${confirmLabel}$`, 'i') });
    await userEvent.click(confirmBtn);
    await waitFor(() => expect(confirmBtn).not.toBeInTheDocument());
  },
  parameters: { docs: { source: { code: `// Interaction test story for ConfirmModal using play function` } } }
};

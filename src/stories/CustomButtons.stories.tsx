import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConfirmModal, type ConfirmModalProps } from '../lib';
import { ShowCode } from './ShowCode';
import { Button } from 'reactstrap';

const FancyButtons: React.FC<{ onClose: (r: boolean) => void }> = ({ onClose }: { onClose: (r: boolean) => void }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="secondary" outline onClick={() => onClose(false)}>No Thanks</Button>
    <Button color="warning" onClick={() => onClose(true)}>Do It!</Button>
  </div>
);

const CODE = `import { ConfirmModal } from 'reactstrap-confirm-by-dev-think';
import { Button } from 'reactstrap';

const FancyButtons = ({ onClose }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="secondary" outline onClick={() => onClose(false)}>No Thanks</Button>
    <Button color="warning" onClick={() => onClose(true)}>Do It!</Button>
  </div>
);

export default function Example() {
  return (
    <ConfirmModal
      onClose={(r) => console.log(r)}
      title="Custom Buttons"
      message="Buttons injected via buttonsComponent prop"
      buttonsComponent={FancyButtons}
    />
  );
}`;

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

export const Example: Story = {
  render: (args: any) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button color="secondary" onClick={() => setOpen(true)}>Open Custom Buttons Modal</Button>
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
        <ShowCode code={CODE} />
      </>
    );
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from 'reactstrap';
import confirm from '../lib';

// A tiny component so we can show a runnable example of the promise API.
const DemoConfirmAPI: React.FC = () => {
  const handleBasic = async () => {
    const ok = await confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
    });
    // eslint-disable-next-line no-alert
    alert('Result: ' + ok);
  };

  const handleDanger = async () => {
    const ok = await confirm({
      title: 'Delete Project',
      message: 'This will permanently remove the project. Continue?',
      confirmColor: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
    // eslint-disable-next-line no-alert
    alert('Result: ' + ok);
  };

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button color="secondary" onClick={handleBasic}>Basic Confirm</Button>
      <Button color="danger" onClick={handleDanger}>Danger Confirm</Button>
    </div>
  );
};

const BASIC_CODE = `import confirm from 'reactstrap-confirm-by-dev-think';

async function signOut() {
  const ok = await confirm({
    title: 'Sign Out',
    message: 'Are you sure you want to sign out?',
  });
  if (ok) {
    // perform sign out
  }
}`;

const DANGER_CODE = `import confirm from 'reactstrap-confirm-by-dev-think';

async function deleteProject() {
  const ok = await confirm({
    title: 'Delete Project',
    message: 'This will permanently remove the project. Continue?',
    confirmColor: 'danger',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  });
  if (ok) {
    // destructive action
  }
}`;

const meta: Meta<typeof DemoConfirmAPI> = {
  title: 'API/confirm()',
  component: DemoConfirmAPI,
  parameters: {
    docs: {
      description: {
        component: 'Promise-based API. Call `confirm(options)` and await a boolean resolve value.'
      },
      source: { code: BASIC_CODE, state: 'open' }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DemoConfirmAPI>;

export const Basic: Story = { parameters: { docs: { source: { code: BASIC_CODE, state: 'open' } } } };
export const DangerVariant: Story = {
  name: 'Danger Variant',
  parameters: { docs: { source: { code: DANGER_CODE, state: 'open' } } }
};

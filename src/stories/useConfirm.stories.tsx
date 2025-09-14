import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useConfirm } from '../lib';
import { Button } from 'reactstrap';

const Demo: React.FC = () => {
  const confirm = useConfirm();
  const [result, setResult] = useState<null | boolean>(null);

  const handleClick = async () => {
    const ok = await confirm({
      title: 'Delete File',
      message: 'This action cannot be undone. Continue?',
      confirmColor: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
    setResult(ok);
  };

  return (
    <div style={{ minWidth: 320 }}>
      <Button color="danger" onClick={handleClick}>Trigger Confirm</Button>
      <div style={{ marginTop: 12 }}>
        Result: {result === null ? 'No action yet' : result ? 'Confirmed ✅' : 'Cancelled ❌'}
      </div>
    </div>
  );
};

const meta: Meta<typeof Demo> = {
  title: 'Hooks/useConfirm',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component: 'Demonstrates the useConfirm hook which wraps the promise-based confirm API.'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};

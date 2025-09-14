import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';

// Minimal smoke test to ensure component renders with required props.
describe('ConfirmModal', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <ConfirmModal
        onClose={() => undefined}
        title="Confirm"
        message="Are you sure?"
        confirmText="OK"
        cancelText="Cancel"
      />
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Are you sure?')).toBeTruthy();
  });
});

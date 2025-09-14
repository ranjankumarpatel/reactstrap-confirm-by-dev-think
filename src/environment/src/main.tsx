import 'bootstrap/dist/css/bootstrap.min.css';
import './demo.css';
import React, { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import confirm, { useConfirm, ConfirmModal } from '../../lib';

// Custom buttons component to demonstrate buttonsComponent prop
const CustomButtons: React.FC<{ onClose: (result: boolean) => void }> = ({ onClose }) => (
  <div className="d-flex gap-2 w-100 justify-content-end">
    <button className="btn btn-outline-secondary btn-sm" onClick={() => onClose(false)}>
      No Way
    </button>
    <button className="btn btn-success" onClick={() => onClose(true)}>
      Absolutely!
    </button>
  </div>
);

const App: React.FC = () => {
	const confirmHook = useConfirm({ title: 'Global Confirm' });

	const basicConfirm = useCallback(async () => {
		const ok = await confirm({ message: 'Proceed with action?' });
		alert(`Basic confirm result: ${ok}`);
	}, []);

	const overrideHookConfirm = useCallback(async () => {
		const ok = await confirmHook({ message: 'Hook confirm override?' });
		alert(`Hook confirm result: ${ok}`);
	}, [confirmHook]);

	const allPropsConfirm = useCallback(async () => {
		const ok = await confirm({
			message: (
				<div>
					<strong>Delete selected records?</strong>
					<p className="mb-0 small text-muted">This cannot be undone.</p>
				</div>
			),
			title: <span className="text-danger">Confirm Destructive Action</span>,
			confirmText: 'Delete',
			cancelText: 'Keep',
			confirmColor: 'danger',
			cancelColor: 'secondary',
			className: 'my-confirm-modal',
			size: 'md',
			zIndexModal: 1055,
			styleHeader: { background: '#fee', borderBottom: '1px solid #fcc' },
			styleFooter: { background: '#f8f9fa' },
		});
		alert(`All props confirm: ${ok}`);
	}, []);

	const customButtonsConfirm = useCallback(async () => {
		const ok = await confirm({
			message: 'Use a completely custom buttons component?',
			title: 'Custom Buttons',
			buttonsComponent: CustomButtons,
		});
		alert(`Custom buttons confirm: ${ok}`);
	}, []);

	const contentDismissDisabled = useCallback(async () => {
		const ok = await confirm({
			message: 'Clicking outside will NOT close this modal.',
			title: 'No Outside Close',
			closedforContent: false,
		});
		alert(`Content dismiss disabled: ${ok}`);
	}, []);

	const largeModalConfirm = useCallback(async () => {
		const ok = await confirm({
			message: 'Large modal size (lg).',
			title: 'Large Size',
			size: 'lg',
		});
		alert(`Large modal result: ${ok}`);
	}, []);

	const noCancelButton = useCallback(async () => {
		const ok = await confirm({
			message: 'Only one affirmative button shown.',
			title: 'Single Button',
			cancelText: undefined,
		});
		alert(`Single button confirm: ${ok}`);
	}, []);

	return (
		<div className="demo-container">
			<h1>reactstrap-confirm full props demo</h1>
			<p className="text-muted mb-4">Examples covering each prop and behavior.</p>
			<div className="demo-grid">
				<button className="btn btn-primary" onClick={basicConfirm}>Basic</button>
				<button className="btn btn-outline-primary" onClick={overrideHookConfirm}>Hook (override)</button>
				<button className="btn btn-danger" onClick={allPropsConfirm}>All props</button>
				<button className="btn btn-success" onClick={customButtonsConfirm}>Custom buttons</button>
				<button className="btn btn-warning" onClick={contentDismissDisabled}>No outside close</button>
				<button className="btn btn-info" onClick={largeModalConfirm}>Large size</button>
				<button className="btn btn-secondary" onClick={noCancelButton}>Single button</button>
			</div>
			<div className="section">
				<h2 className="h5">Inline Component Usage</h2>
				<p className="note">You can also mount the modal directly if you manage visibility yourself:</p>
				<code className="d-block mb-2">{'<ConfirmModal onClose={() => {}} />'}</code>
				<small className="text-muted">(See source for imported ConfirmModal)</small>
			</div>
		</div>
	);
};

const el = document.getElementById('root');
if (el) {
	const root = createRoot(el);
	root.render(<App />);
}
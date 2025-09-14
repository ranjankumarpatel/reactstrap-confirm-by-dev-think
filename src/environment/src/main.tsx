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

	// Code snippets (kept in JS template literals for easy copy)
	const codeBasic = `import confirm from 'reactstrap-confirm-by-dev-think';\n\nconst ok = await confirm({ message: 'Proceed with action?' });`;
	const codeHookOverride = `import { useConfirm } from 'reactstrap-confirm-by-dev-think';\n\nconst confirm = useConfirm({ title: 'Global Confirm' });\nconst ok = await confirm({ message: 'Hook confirm override?' });`;
	const codeAllProps = `await confirm({\n  message: (<div><strong>Delete selected records?</strong><p className='mb-0 small text-muted'>This cannot be undone.</p></div>),\n  title: <span className='text-danger'>Confirm Destructive Action</span>,\n  confirmText: 'Delete',\n  cancelText: 'Keep',\n  confirmColor: 'danger',\n  cancelColor: 'secondary',\n  className: 'my-confirm-modal',\n  size: 'md',\n  zIndexModal: 1055,\n  styleHeader: { background: '#fee', borderBottom: '1px solid #fcc' },\n  styleFooter: { background: '#f8f9fa' },\n});`;
	const codeCustomButtons = `const CustomButtons = ({ onClose }) => (\n  <div className='d-flex gap-2 w-100 justify-content-end'>\n    <button className='btn btn-outline-secondary btn-sm' onClick={() => onClose(false)}>No Way</button>\n    <button className='btn btn-success' onClick={() => onClose(true)}>Absolutely!</button>\n  </div>\n);\n\nawait confirm({ title: 'Custom Buttons', message: 'Use a completely custom buttons component?', buttonsComponent: CustomButtons });`;
	const codeNoOutsideClose = `await confirm({ title: 'No Outside Close', message: 'Clicking outside will NOT close this modal.', closedforContent: false });`;
	const codeLarge = `await confirm({ title: 'Large Size', message: 'Large modal size (lg).', size: 'lg' });`;
	const codeSingleButton = `await confirm({ title: 'Single Button', message: 'Only one affirmative button shown.', cancelText: undefined });`;

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
			<h1>reactstrap-confirm examples</h1>
			<p className="text-muted mb-4">Click a button to try it. Copy code below each example.</p>
			<div className="demo-grid">
				<div className="example-col">
					<button className="btn btn-primary mb-2" onClick={basicConfirm}>Basic</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeBasic}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-outline-primary mb-2" onClick={overrideHookConfirm}>Hook (override)</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeHookOverride}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-danger mb-2" onClick={allPropsConfirm}>All props</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeAllProps}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-success mb-2" onClick={customButtonsConfirm}>Custom buttons</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeCustomButtons}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-warning mb-2" onClick={contentDismissDisabled}>No outside close</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeNoOutsideClose}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-info mb-2" onClick={largeModalConfirm}>Large size</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeLarge}</pre>
				</div>
				<div className="example-col">
					<button className="btn btn-secondary mb-2" onClick={noCancelButton}>Single button</button>
					<pre className="code-pre small bg-light p-2 rounded">{codeSingleButton}</pre>
				</div>
			</div>
			<div className="section">
				<h2 className="h5">Inline Component Usage</h2>
				<p className="note">You can also mount the modal directly if you manage visibility yourself:</p>
				<pre className="small bg-light p-2 rounded">{`<ConfirmModal\n  onClose={(r) => console.log(r)}\n  title='Title'\n  message='Message'\n/>`}</pre>
				<small className="text-muted">(Above shows raw component usage)</small>
			</div>
		</div>
	);
};

const el = document.getElementById('root');
if (el) {
	const root = createRoot(el);
	root.render(<App />);
}
import React from 'react';
import { createRoot } from 'react-dom/client';
import confirm, { useConfirm } from '../../lib';

const App: React.FC = () => {
	const confirmHook = useConfirm({ title: 'Global Confirm' });

	const handleClick = async () => {
		const ok = await confirm({ message: 'Proceed with action?' });
		// eslint-disable-next-line no-alert
		alert(`Direct confirm result: ${ok}`);
	};

	const handleHookClick = async () => {
		const ok = await confirmHook({ message: 'Hook confirm override?' });
		// eslint-disable-next-line no-alert
		alert(`Hook confirm result: ${ok}`);
	};

	return (
		<div style={{ fontFamily: 'sans-serif', padding: 24 }}>
			<h1>reactstrap-confirm demo</h1>
			<button onClick={handleClick}>Open confirm (direct)</button>
			<button onClick={handleHookClick} style={{ marginLeft: 12 }}>
				Open confirm (hook)
			</button>
		</div>
	);
};

const el = document.getElementById('root');
if (el) {
	const root = createRoot(el);
	root.render(<App />);
}
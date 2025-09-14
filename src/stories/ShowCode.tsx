import React from 'react';
import './show-code.css';

export interface ShowCodeProps {
  code: string;
  language?: string;
  copyLabel?: string;
  showLabel?: string;
  hideLabel?: string;
  initiallyOpen?: boolean;
}

export const ShowCode: React.FC<ShowCodeProps> = (props: ShowCodeProps) => {
  const {
    code,
    language = 'tsx',
    copyLabel = 'Copy',
    showLabel = 'Show Code',
    hideLabel = 'Hide Code',
    initiallyOpen = false
  } = props;
  const [open, setOpen] = React.useState(initiallyOpen);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="sc-container">
  <button type="button" className="sc-toggle-btn" onClick={() => setOpen((o: boolean) => !o)}>
        {open ? hideLabel : showLabel}
      </button>
      {open && (
        <div className="sc-wrapper">
          <pre className="sc-pre">
            <code className={`language-${language}`}>{code}</code>
          </pre>
          <button type="button" onClick={handleCopy} className="sc-copy-btn">
            {copyLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowCode;

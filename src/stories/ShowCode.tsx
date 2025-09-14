import React from 'react';
import './show-code.css';

export interface ShowCodeProps {
  code: string;
  language?: string;
  copyLabel?: string;
}

export const ShowCode: React.FC<ShowCodeProps> = (props: ShowCodeProps) => {
  const { code, language = 'tsx', copyLabel = 'Copy' } = props;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="sc-wrapper">
      <pre className="sc-pre">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button type="button" onClick={handleCopy} className="sc-copy-btn">
        {copyLabel}
      </button>
    </div>
  );
};

export default ShowCode;

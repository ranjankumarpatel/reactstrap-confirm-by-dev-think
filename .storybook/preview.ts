import type { Preview } from '@storybook/react-vite'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      source: {
        // Always show source code in Docs for easier copy/paste
        state: 'open'
      }
    }
  },
};

export default preview;
<div align="center">
    <h1>Reactstrap Confirm</h1>
    <p>Promise-based confirmation modal & hook for React + Reactstrap</p>
    <p>
        <a href="https://github.com/ranjankumarpatel/reactstrap-confirm-by-dev-think/actions/workflows/ci-storybook.yml"><img alt="CI" src="https://github.com/ranjankumarpatel/reactstrap-confirm-by-dev-think/actions/workflows/ci-storybook.yml/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/reactstrap-confirm-by-dev-think"><img alt="npm" src="https://img.shields.io/npm/v/reactstrap-confirm-by-dev-think.svg" /></a>
        <a href="https://ranjankumarpatel.github.io/reactstrap-confirm-by-dev-think/"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-Live-%23FF4785" /></a>
        <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg" /></a>
    </p>
</div>

An easy to use, minimal, promise-based confirm dialog for Reactstrap with full TypeScript types and an optional hook API. This fork / enhancement adds extra safety features such as preventing accidental dismissals (via the `closedforContent` prop) and customization points for rendering your own buttons.

> Note: The npm package and repository now both use the name `reactstrap-confirm-by-dev-think`.

## ✨ Features

- Promise-based API: `await confirm()`
- Fully type-safe (TypeScript)
- Drop-in Reactstrap `Modal` under the hood
- Customizable colors, size, title, message, buttons, z-index, inline styles
- Provide a custom buttons component for advanced layouts
- Hook API: `const confirm = useConfirm()` with default options
- Works with React 18 & 19 peer ranges
- Storybook examples & interaction tests


## 📦 Installation

Using pnpm (recommended):

```bash
pnpm add reactstrap-confirm-by-dev-think react react-dom reactstrap bootstrap
```

Using npm:

```bash
npm i reactstrap-confirm-by-dev-think react react-dom reactstrap bootstrap
```

Using yarn:

```bash
yarn add reactstrap-confirm-by-dev-think react react-dom reactstrap bootstrap
```

## Dependencies

You must manually install react, react-dom and reactstrap in your project in order for this module to work correctly.

## 🚀 Quick Usage

Simply, import the module and call it as a function anywhere in your code.

```javascript
import confirm from "reactstrap-confirm-by-dev-think";

// ...code

let result = await confirm(); //will display a confirmation dialog with default settings

console.log(result); //if the user confirmed, the result value will be true, false otherwhise
```

You can also pass options to the confirm function:

```javascript
confirm({
    title: (
        <>
            Content can have <strong>JSX</strong>!
        </>
    ),
    message: "This is a custom message",
    confirmText: "Custom confirm message",
    confirmColor: "primary",
    cancelColor: "link text-danger"
});
```

The above example will render a customized dialog.

## 🧪 Hook Usage (`useConfirm`)

If you prefer a hook that can merge default options:

```tsx
import { useConfirm } from 'reactstrap-confirm-by-dev-think';

const MyComponent = () => {
    const confirm = useConfirm({ confirmColor: 'danger', confirmText: 'Proceed' });

    const handleDangerous = async () => {
        if (await confirm({ message: 'Delete all items?' })) {
            // destructive action
        }
    };

    return <button onClick={handleDangerous}>Delete All</button>;
};
```

## 🧩 Custom Buttons

Provide your own button layout via `buttonsComponent`:

```tsx
const MyButtons = ({ onClose }: { onClose: (r: boolean) => void }) => (
    <div style={{ width: '100%', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn btn-outline-secondary" onClick={() => onClose(false)}>No</button>
        <button className="btn btn-danger" onClick={() => onClose(true)}>Yes, Delete</button>
    </div>
);

await confirm({ title: 'Confirm', message: 'Sure?', buttonsComponent: MyButtons });
```

## ⚙️ Options

| Option           | Type / Usage                                                                                                   | Default          |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ---------------- |
| `message`        | `ReactNode` body content                                                                                        | `Are you sure?`  |
| `title`          | `ReactNode` modal header                                                                                        | `Warning!`       |
| `confirmText`    | Text / node for confirm button                                                                                  | `Ok`             |
| `cancelText`     | Text / node for cancel button (omit to hide)                                                                    | `Cancel`         |
| `confirmColor`   | Reactstrap color (e.g. `primary`, `danger`, etc.)                                                               | `primary`        |
| `cancelColor`    | Reactstrap color or classes for cancel button                                                                  | `` (empty)       |
| `className`      | Extra class names appended to root modal                                                                        | ``               |
| `buttonsComponent` | Custom component to fully replace default buttons (receives `{ onClose }`)                                   | `null`           |
| `size`           | Reactstrap modal size (`sm` | `lg` | `xl` etc.) or `null`                                                      | `null`           |
| `closedforContent` | When true, clicking backdrop triggers `onClose(false)` (safeguard). Set `false` to allow outside close.      | `true`           |
| `zIndexModal`    | z-index for modal (useful when stacking)                                                                       | `999`            |
| `styleHeader`    | Inline `CSSProperties` for header                                                                              | `{}`             |
| `styleFooter`    | Inline `CSSProperties` for footer                                                                              | `{}`             |

Return value: `Promise<boolean>` — `true` if confirmed, `false` if canceled/dismissed.

## 🧵 TypeScript

All props are exported via `ConfirmModalProps` and the `confirm` function accepts `Partial<ConfirmModalProps>`.

```ts
import type { ConfirmModalProps } from 'reactstrap-confirm-by-dev-think';
```

## ♿ Accessibility Notes

- Uses Reactstrap `Modal` (which applies ARIA attributes)
- Provide meaningful `title` content for screen readers
- Provide accessible button labels (avoid only icons unless wrapped with text)

## Storybook (Examples & Playground)

This repository includes a Storybook setup with interactive examples of `ConfirmModal`, the `useConfirm` hook, and customization patterns (custom colors, sizes, buttons, inline styles, etc.).

Live Storybook: https://ranjankumarpatel.github.io/reactstrap-confirm-by-dev-think/

CI & Deploy Status:

![CI & Storybook](https://github.com/ranjankumarpatel/reactstrap-confirm-by-dev-think/actions/workflows/ci-storybook.yml/badge.svg)

### Run Storybook locally

```bash
pnpm install
pnpm storybook
```

Open: http://localhost:6006

### Build static Storybook

```bash
pnpm build-storybook
```

Static output is generated in `storybook-static/`.

### Deployment

The Storybook is deployed to GitHub Pages automatically:

- Workflow: `.github/workflows/deploy-storybook.yml`
- Trigger: push to `master` (and any `v*` tag) or manual dispatch
- Output branch: `gh-pages` (force orphan, fully replaced each run)
- Public URL: `https://<username>.github.io/<repo>/` → currently https://ranjankumarpatel.github.io/reactstrap-confirm-by-dev-think/

If you fork the repo:

1. Enable GitHub Pages: Settings → Pages → Build & deployment → Select `gh-pages` branch (root) (only needed once after first workflow run creates the branch).
2. (Optional) Adjust `node-version` in the workflow if you need a different runtime.
3. Verify the workflow run logs for `Deploy to GitHub Pages` step success.
4. (Optional) Add a Storybook badge pointing to your fork's Pages URL.

Quick checklist (first time only):

- [ ] Push to `master` to trigger workflow
- [ ] Wait for `deploy-storybook.yml` success
- [ ] Pages: select `gh-pages` → save
- [ ] Visit the published URL

Manual local preview of the built static Storybook:

```bash
pnpm build-storybook && npx serve storybook-static
```

The `deploy:storybook` script is a placeholder; actual deployment is handled by the GitHub Action.

### Where are the stories?

Stories live under `src/stories/`.

### Troubleshooting

- Deployed site stale: verify the workflow run succeeded for your commit.
- 404 on assets: asset paths are relative; ensure you are using GitHub Pages root (`gh-pages` branch).
- Modal behind other overlays: adjust `zIndexModal`.
- Need custom layout: use `buttonsComponent`.

## 🔧 Development

```bash
pnpm install
pnpm dev          # Run vite dev (library playground if configured)
pnpm storybook    # Run Storybook
pnpm build        # Build library (Rollup)
pnpm build-storybook
pnpm test         # Vitest unit tests
pnpm test:storybook  # Interaction tests (Storybook test runner)
```

## 🗂 Project Structure (key parts)

```
src/
    lib/
        confirm.ts            # Promise API entry
        components/ConfirmModal.tsx
        hooks/useConfirm.ts   # Hook wrapper
    stories/                # Storybook stories
storybook-static/         # Built Storybook (ignored in publishing)
```

## 🤝 Contributing

Issues & PRs welcome! Please:

1. Fork & create a feature branch
2. Add/update stories for UI changes
3. Run tests & Storybook interaction tests
4. Open PR with clear description

## 📄 License

MIT. See `LICENSE` file.

---

If this library helps you, a ⭐ on the repo is appreciated!


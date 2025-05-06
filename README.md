# svg-sprite-gen

> A CLI tool to generate an optimized SVG sprite and React hook from a folder of SVG icons.

## 🚀 Features

- **SVG Optimization**: Uses SVGO to compress and clean up individual SVG files.
- **Sprite Generation**: Bundles all optimized SVGs into a single `<svg>` sprite sheet with `<symbol>` entries.
- **React Integration**: Produces a ready-to-use React hook (e.g., `useSvgSprite`) to inject the sprite into the DOM.
- **Configurable**: Customize input directory, output filenames, and hook name via flags.
- **Zero Runtime Dependencies**: Pure Node.js implementation, no browser-side library dependencies.

## 💿 Installation

```bash
npm install -g svg-sprite-gen
```

> Requires Node.js v16+.

## ⚙️ CLI Usage

```bash
svg-sprite-gen -i <input-dir> [options]
```

### Options

| Flag            | Description                                        | Default        |
| --------------- | -------------------------------------------------- | -------------- |
| `-i, --input`   | Path to source directory containing `.svg` files   | **(required)** |
| `-o, --output`  | Output sprite filename (relative or absolute path) | `sprite.svg`   |
| `--hook <name>` | Name of generated React hook                       | `useSvgSprite` |
| `-V, --version` | Show CLI version                                   | —              |
| `-h, --help`    | Display help information                           | —              |

### Examples

Generate a sprite from your `icons/` folder:

```bash
svg-sprite-gen -i ./icons
```

Creates `sprite.svg` and `sprite.hook.ts` in the current directory.

Specify a custom output path and hook name:

```bash
svg-sprite-gen -i ./assets/svg -o public/icons.svg --hook useIconSprite
```

## 🛠️ How It Works

1. **Collect SVGs**: Uses `fast-glob` to find all `.svg` files in the input directory.
2. **Optimize**: Runs each SVG through SVGO for minification.
3. **Wrap**: Strips outer `<svg>` tags and wraps content in `<symbol id="<filename>">`.
4. **Combine**: Concatenates all `<symbol>`s into one `<svg>` sprite with `display: none`.
5. **Hook**: Generates a React hook that injects the sprite into `<body>` on mount.

## 🌀 Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/svg-sprite-gen.git
cd svg-sprite-gen
npm install
```

Build and link locally:

```bash
npm run build
npm link
```

Run the CLI:

```bash
svg-sprite-gen --help
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "feat: describe your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

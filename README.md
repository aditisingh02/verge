# Verge - Color Palette Generator

A color palette generator built with Next.js 15, TypeScript, and ShadCN UI. Generate accessible color palettes for design projects with real-time preview and multiple export formats.

## Features

### Color Generation

- **Palette Generation**: Create color schemes using color theory principles
- **Multiple Harmony Types**: Analogous, complementary, triadic, and split-complementary color schemes
- **Base Color Input**: Support for HEX, RGB, HSL, and color names
- **Real-time Preview**: Colors applied to UI components

### Accessibility

- **WCAG Compliance**: Real-time contrast ratio validation
- **AA/AAA Standards**: Visual indicators for accessibility compliance levels
- **Accessibility Suggestions**: Recommendations for improving color accessibility

### Theme Presets

- **Collections**: Material Design, Tailwind CSS, iOS, and Neumorphism presets
- **Quick Application**: One-click theme selection
- **Custom Themes**: Save and manage color schemes

### Export Options

- **Multiple Formats**: JSON, CSS variables, Tailwind config, and Figma tokens
- **Copy & Download**: Clipboard and file download options
- **Production Ready**: Formatted code ready for use

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Themes**: Toggle between light and dark preview modes
- **Local Storage**: Save palettes locally
- **Performance**: Optimized for speed with static generation

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aditisingh02/verge.git
cd verge
```

```bash
git clone git@github.com:aditisingh02/verge.git
cd verge
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN UI](https://ui.shadcn.com/)** - Accessible components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Chroma.js](https://gka.github.io/chroma.js/)** - Color manipulation library
- **[Lucide React](https://lucide.dev/)** - Icons

## Project Structure

```
verge/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/
│   ├── palette/           # Color palette components
│   ├── preview/           # Live preview components
│   ├── accessibility/     # Accessibility check
│   ├── presets/          # Theme presets
│   └── export/           # Exports for different formats
├── lib/
│   ├── color/            # Color processing
│   ├── export/           # generate export format
│   ├── presets/          # Theme presets
│   └── utils/            # Utility functions
├── types/                # TypeScript type definitions
└── hooks/
```

## Usage

1. **Generate a Palette**: Enter a base color and select a harmony type
2. **Preview**: See colors applied to UI components
3. **Check Accessibility**: Review WCAG compliance for color combinations
4. **Export**: Download or copy palette in preferred format
5. **Save**: Store palettes for future use

## Contributing

Contributions are accepted. Submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/FeatureName`)
3. Commit your changes (`git commit -m 'Add FeatureName'`)
4. Push to the branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Color theory principles from design resources
- Accessibility guidelines from WCAG 2.1
- Design inspiration from design systems
- Open source community tools and libraries

import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: 'var(--font-montserrat)',
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: '#1D3D85', // Base primary color
                    light: '#3A5DB0', // Light blue tint
                    lighter: '#A3B5E8', // Very light blue
                    dark: '#162E66', // Darker shade
                    darker: '#101F48', // Deepest navy
                },
                secondary: {
                    DEFAULT: '#549AF8', // Base secondary color
                    light: '#78B1FA',
                    lighter: '#A3CBFB',
                    dark: '#3B7ADB',
                    darker: '#2859B8',
                },
                accent: {
                    gold: '#F4A100',
                    orange: '#D95F00',
                    coral: '#F89A78',
                    peach: '#F8C7A3',
                },
                neutral: {
                    white: '#FFFFFF',
                    gray: '#E1E7F2',
                    dark: '#1A1A1A',
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}

export default config

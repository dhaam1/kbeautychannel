import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	screens: {
    		md: '768px',
    		lg: '1024px',
    		'xl-custom': '1350px',
    		'cta-breakpoint': '1000px',
    		'header-md': '969px',
    		'video-md': '480px'
    	},
    	extend: {
    		maxWidth: {
    			content: '1472px',
    		},
    		colors: {
    			primary: '#61D5CA',
    			mint: '#81cac4',
    			'mint-dark': '#047e74',
    			'table-head-bg': '#e8f7f5',
    			'table-head-text': '#0f3b39',
    			'table-border': '#cfe9e6',
    			'table-stripe': 'rgba(129,202,196, 0.06)',
    		},
    		animation: {
    			aurora: 'aurora 60s linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			aurora: {
    				from: {
    					backgroundPosition: '50% 50%, 50% 50%'
    				},
    				to: {
    					backgroundPosition: '350% 50%, 350% 50%'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		fontFamily: {
    			sans: [
    				'"Pretendard Variable"',
    				'Pretendard',
    				'system-ui',
    				'sans-serif'
    			],
    			'sans-jp': [
    				'"Pretendard JP Variable"',
    				'"Pretendard JP"',
    				'Pretendard',
    				'system-ui',
    				'sans-serif'
    			],
    			serif: [
    				'var(--font-prata)',
    				'serif'
    			],
    			display: [
    				'var(--font-bodoni-moda)',
    				'serif'
    			],
    			korean: [
    				'var(--font-song-myung)',
    				'serif'
    			],
    			japanese: [
    				'var(--font-zen-antique)',
    				'serif'
    			]
    		}
    	}
    },
    plugins: [],
};
export default config;

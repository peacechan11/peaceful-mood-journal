
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				peace: {
					50: '#F5F3FF',
					100: '#EDE9FE',
					200: '#DDD6FE',
					300: '#C4B5FD',
					400: '#A78BFA',
					500: '#8B5CF6',
					600: '#7C3AED',
					700: '#6D28D9',
					800: '#5B21B6',
					900: '#4C1D95',
				},
				serenity: {
					50: '#F0FDFA',
					100: '#CCFBF1',
					200: '#99F6E4',
					300: '#5EEAD4',
					400: '#2DD4BF',
					500: '#14B8A6',
					600: '#0D9488',
					700: '#0F766E',
					800: '#115E59',
					900: '#134E4A',
				},
				calm: {
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					800: '#1E40AF',
					900: '#1E3A8A',
				},
				lavender: {
					50: '#F8F7FF',
					100: '#F1EEFE',
					200: '#E4DDFD',
					300: '#D1C4FA',
					400: '#B197F3',
					500: '#9871EB',
					600: '#8250E4',
					700: '#6D3BCF',
					800: '#5C30B0',
					900: '#4C2890',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'gentle-wave': {
					'0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
					'50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
					'100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'breathe': 'breathe 8s infinite ease-in-out',
				'gentle-wave-1': 'gentle-wave 8s infinite linear',
				'gentle-wave-2': 'gentle-wave 10s infinite linear',
				'gentle-wave-3': 'gentle-wave 12s infinite linear'
			},
			boxShadow: {
				'peace': '0 4px 14px 0 rgba(139, 92, 246, 0.2)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.07)',
				'subtle': '0 2px 8px rgba(0, 0, 0, 0.04)',
				'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
				'inner-glow': 'inset 0 0 15px rgba(139, 92, 246, 0.2)'
			},
			backdropBlur: {
				'xs': '2px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-peaceful': 'linear-gradient(to right, #8B5CF6, #14B8A6)',
				'gradient-tranquil': 'linear-gradient(135deg, #E4DDFD 0%, #CCFBF1 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-blue': '#0b0952',
				'secondary-blue': '#070640',
				'tertiary-blue': '#062b60',
				'accent-pink': '#fe3e57'
			}

		},
	},
	plugins: [],
}

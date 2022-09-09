const path = require('path')

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(' --file ')}`;

const prettier = 'prettier --write --ignore-unknown'

module.exports = {
	'src/**/*.{js,jsx,ts,tsx}': [prettier],
	// 'src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand, prettier]
}
const path = require("path");

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;
const buildPrettierCommand = (filenames) =>
	`yarn prettier --config ./.prettierrc --write  ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;
module.exports = {
	"*.{ts,tsx}": [buildEslintCommand, buildPrettierCommand],
};

const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const nextConfig = {
	output: "standalone",
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding", "fs", "net", "tls", "bufferutil", "utf-8-validate");
		config.plugins.push(new WindiCSSWebpackPlugin());
		return config;
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ["en", "jp"],
		defaultLocale: "en",
	},
	images: {
		domains: [
			"miro.medium.com",
			"images.u2sto.xyz",
			"tpc.googlesyndication.com",
			"uniultra.xyz",
			"unicornultra.medium.com",
		],
	},
	
};

module.exports = nextConfig;

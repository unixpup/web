import { NextConfig } from 'next';

const withMDX = require('@next/mdx')()

const config: NextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	experimental: {
		cssChunking: true,
		dynamicIO: true,
		mdxRs: true,
	},
} satisfies NextConfig

export default config;

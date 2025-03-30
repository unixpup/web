import { NextConfig } from 'next';

const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const config: NextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	experimental: {
		cssChunking: true,
		dynamicIO: true,
		mdxRs: true,
		ppr: 'incremental',
	},
};

export default config;

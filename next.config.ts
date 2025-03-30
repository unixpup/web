import { NextConfig } from 'next';

const isGithubActions: boolean = process.env.GITHUB_ACTIONS === 'true' || false;

let assetPrefix: string = '';
let basePath: string = '/';

if (isGithubActions) {
  // trim off `<owner>/`
  const repo: string = process.env.GITHUB_REPOSITORY 
    ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
    : '';

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const config: NextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: 'export',
};

export default config;

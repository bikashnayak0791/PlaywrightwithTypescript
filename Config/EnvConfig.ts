import * as fs from 'fs';
export interface EnvConfig {
  baseURL: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  username: string;
  password: string;
  headless?: boolean;
}
export function getEnvConfig(env: string): EnvConfig {
  const raw = fs.readFileSync(`./Config/${env}.json`, 'utf-8');
  return JSON.parse(raw);
}

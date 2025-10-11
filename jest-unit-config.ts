import type { Config } from 'jest'
import baseConfig from './jest.config'

const config: Config = {
  ...baseConfig,
  testMatch: ['**/*.spec.ts']
}

export default config

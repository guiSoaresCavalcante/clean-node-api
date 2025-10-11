import type { Config } from 'jest'
import baseConfig from './jest.config'

const config: Config = {
  ...baseConfig,
  testMatch: ['**/*.test.ts']
}

export default config

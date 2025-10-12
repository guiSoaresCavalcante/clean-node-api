const config = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.9',
      skipMD5: true
    },
    instance: {
      dbName: 'jest'
    },
    autoStart: false
  }
}

export default config

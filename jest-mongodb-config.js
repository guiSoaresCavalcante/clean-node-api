module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.9', // verificar a versão do mongo e deixar igual ao de produção
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
}

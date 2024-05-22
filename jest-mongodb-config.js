module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3', // verificar a versão do mongo e deixar igual ao de produção
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
}

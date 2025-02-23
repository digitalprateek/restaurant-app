module.exports = {
    apps: [
      {
        name: 'restaurant-app',
        script: './src/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          jwtSecretKey: process.env.jwtSecretKey,
          dbUrl: process.env.dbUrl
        },
      },
    ],
  };

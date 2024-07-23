const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT
  },

  auth: {
    access: process.env.ACCESS_TOKEN_KEY,
    refresh: process.env.REFRESH_TOKEN_KEY,
    age: process.env.ACCESS_TOKEN_AGE
  },

  database: {
    name: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  },

  rabbitMq: {
    server: process.env.RABBITMQ_SERVER
  },

  redis: {
    host: process.env.REDIS_SERVER
  }
}

export default config

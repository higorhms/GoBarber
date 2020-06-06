import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST, // Redis host
      port: process.env.REDIS_PORT, // Redis port
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

import * as redis from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";

const redisConfig = {
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
};

console.log("redisConfig=>>>>>", redisConfig);

const client = redis.createClient(redisConfig);

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error : any) {
    console.error(`Error connecting to Redis: ${error.message}`);
  }
})();

client.on("error", (error: any) => console.error(`Redis Error: ${error.message}`));

// Function to set data in Redis with expiration time
const setRedisData = async (key: string, data: any, expirationTime: number) => {
  try {
    await client.setEx(key, expirationTime, JSON.stringify(data));
  } catch (error:any) {
    console.error(`Error setting Redis data: ${error.message}`);
  }
};

// Function to get data from Redis cache
const getRedisData = async (key: string): Promise<any | null> => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error:any) {
    console.error(`Error getting Redis data: ${error.message}`);
    return null;
  }
};

// Function to invalidate cache
const invalidateCache = async (cacheKey: string) => {
  try {
    await client.del(cacheKey);
  } catch (error:any) {
    console.error(`Error invalidating cache: ${error.message}`);
  }
};

// Export the necessary functions and the Redis client
export { setRedisData, getRedisData, invalidateCache, client };

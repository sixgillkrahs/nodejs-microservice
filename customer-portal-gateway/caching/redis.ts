import Redis from "ioredis";
import { SVC_ENV } from "../svc-env";

class RedisCaching {
	private redisClient;

	public async connect() {
		try {
			this.redisClient = new Redis(
				parseInt(SVC_ENV.get().REDIS_PORT, 10),
				SVC_ENV.get().REDIS_HOST,
				{
					db: parseInt(SVC_ENV.get().REDIS_DB, 10),
				},
			);
			await this.set("testconnection", "0", 1);
		} catch (error) {
			console.log("SYSTEM ERROR: CONNECT REDIS ERROR", error?.message);
			throw error;
		}
	}

	/** BASIC */
	public del(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.del(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public get(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.get(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public set(key: string, value: any, ttl?: number): Promise<any> {
		return new Promise<any>((res, rej) => {
			if (ttl) {
				this.redisClient
					.set(key, value, "EX", ttl)
					.then((result) => res(result))
					.catch((err) => rej(err));
			} else {
				this.redisClient
					.set(key, value)
					.then((result) => res(result))
					.catch((err) => rej(err));
			}
		});
	}

	public ttl(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.ttl(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public incr(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.incr(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public clear(): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.flushdb()
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	/** TYPE SETS */
	public sAdd(key: string, item: any): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.sadd(key, JSON.stringify(item))
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public sCard(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.scard(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public sMembers(key: string): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.smembers(key)
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public sRem(key: string, item: any): Promise<any> {
		return new Promise<any>((res, rej) => {
			this.redisClient
				.srem(key, JSON.stringify(item))
				.then((result) => res(result))
				.catch((err) => rej(err));
		});
	}

	public sSave(key: string, item: any): Promise<any> {
		return this.sRem(key, item).then(() => this.sAdd(key, item));
	}
}

export const redis = new RedisCaching();

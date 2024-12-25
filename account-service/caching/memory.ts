import NodeCache from "node-cache";

class MemoryCaching {
	private cached = new NodeCache();

	public del(key: string): number {
		return this.cached.del([key]);
	}

	public get(key: string): any {
		return this.cached.get(key);
	}

	public set(key: string, value: any): boolean {
		return this.cached.set(key, value);
	}
}

export = MemoryCaching;

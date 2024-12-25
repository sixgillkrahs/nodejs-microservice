import fs from "fs";
import path from "path";

export class BaseTracking {
	public getIgnoreField(): {ignoreFields: string[]} {
		return JSON.parse(fs.readFileSync(path.join(__dirname, "../defined/log-ignore-fields.json")).toString());
	}
}

interface ISecurity {
	validRequest(req: any, res?: any);
	validAccessRules(req: any, res?: any);
}
export = ISecurity;

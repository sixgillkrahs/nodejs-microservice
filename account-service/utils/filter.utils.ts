import { isObject, isEmpty } from "lodash";

export const mappingFilter = (params: any = {}, mappingKeys: any = {}) => {
	if (
		isEmpty(params)
		|| !isObject(params)
		|| isEmpty(mappingKeys)
		|| !isObject(mappingKeys)
	) {
		return {};
	}
	const filter = {};
	Object.keys(params).forEach((item: any) => {
		if (mappingKeys[item]) {
			filter[mappingKeys[item]] = params[item];
		}
	});
	return filter;
};

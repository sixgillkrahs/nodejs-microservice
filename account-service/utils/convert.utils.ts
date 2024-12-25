export const convertArrayToObject = ({ arr, key }: { arr: any; key: string }): { [key: string]: any } => {
	const result = {};
	arr.map(item => {
		result[item[key]] = item;
	});
	return result;
};

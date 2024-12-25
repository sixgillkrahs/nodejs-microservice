export interface IResponseService {
	code: number;
	state: number;
	data: any;
	message: string;
}

export interface IResponseBase<T> {
	code: number;
	state: number;
	data: T;
	message: string;
}

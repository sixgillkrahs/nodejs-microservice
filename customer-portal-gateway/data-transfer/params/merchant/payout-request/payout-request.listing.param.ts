export class PayoutRequestListingParam {
	public merchantAccount: string;
	public status: string;
	public dateFr: Date;
	public dateTo: Date;
	public pageIndex: number;
	public pageSize: number;
	public sortBy: string;
	public sortType: number;
	/** Ext param */
	public merchantId: string;
}

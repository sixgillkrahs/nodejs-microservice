export class PayoutRequestListingResponse {
	public _id: string;
	public createdAt: Date;
	public reqCode: string;
	public merchantId: string;
	public merchantAccount: string;
	public merchantName: string;
	public bankName: string;
	public bankBranch: string;
	public bankAccountNo: string;
	public bankAccountName: string;
	public bankCode: string;
	public value: number;
	public status: string;
	public payoutStatus: string;
}

export class PayoutRequestDetailResponse {
	public _id: string;
	public createdAt: Date;
	public reqCode: string;
	public merchantId: string;
	public merchantAccount: string;
	public merchantName: string;
	public merchantLinkedWallet: string;
	public bankName: string;
	public bankBranch: string;
	public bankAccountNo: string;
	public bankAccountName: string;
	public bankCode: string;
	public value: number;
	public status: string;
	public payoutStatus: string;
	public note: string;
	public paymentMethod: string;
	public lastUpdatedBy: string;
	public lastUpdatedAt: string;
	public approvalMethod: string;
	public fee: number;
	public payoutType: string;
	public violation: {
		violationType: string[];
		actionType: string;
	};
}

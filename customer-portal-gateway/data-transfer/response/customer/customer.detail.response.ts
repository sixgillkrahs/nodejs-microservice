export class BankLinkResponse {
	public bankCode: string;
	public bankName: string;
	public linkNumber: string;
	public linkHolderName: string;
	public bankConnector: string;
	public linkedId: string;
}

export class CustomerDetailResponse {
	public customerId: string;
	public groupIds: string[];
	public fullName: string;
	public profileName: string;
	public email: string;
	public phone: string;
	public idType: string;
	public idNo: string;
	public createdAt: Date;
	public lastUpdatedAt: Date;
	public lastUpdatedBy: string;
	public isActive: boolean;
	public reasonNoted: string;
	public deviceId: string;
	public deviceName: string;
	public deviceModel: string;
	public deviceOS: string;
	public deviceOSVersion: string;
	public appVersion: string;
	public bankLinks: BankLinkResponse[];
	public addressObj: object;
	public avatar: string;
	public statusProfile: string;
	public phoneNumber: string;
	public address: string;
	public DOB?: string;
	public gender?: string;
	public issuedDateAt?: string;
	public issuedBy?: string;
	public portrait?: string;
	public photos?: string[];
	public riskType?: string;
	public violationType?: string[];
}

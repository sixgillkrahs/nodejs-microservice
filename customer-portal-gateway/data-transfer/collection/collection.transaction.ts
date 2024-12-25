interface IGetAllTransactions {
	pageIndex?: number;
	pageSize?: number;
	sortBy?: string;
	sortType?: string;
	merchantName?: string;
	accountName?: string;
	bankAccountNumber?: string;
	transactionId?: string;
	dateFr?: string;
	dateTo?: string;
	status?: string;
}

interface ITransaction {
	id: string;
	merchantId: string;
	transactionId: string;
	transactionDate: string;
	merchantVirtualAccountId: string;
	bankAccountNumber: string;
	accountName: string;
	bankCode: string;
	amount: number;
	fee: any;
	transHisId: any;
	status: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
}

interface IMerchant {
	merchantEmail: string;
	merchantName: string;
	merchantCode: string;
	merchantId: string;
}

interface IMerchantListResponse {
	code: number;
	state: number;
	data: IMerchant[];
}

interface IExportTransaction {
	dateFr: Date;
	dateTo: Date;
}

export {
	IGetAllTransactions,
	ITransaction,
	IMerchantListResponse,
	IExportTransaction
};

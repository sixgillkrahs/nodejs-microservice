const COMMON_CODES = {
  SUCCESS: {
    CODE: 1,
    MESSAGE: {
      VI: "Thành công",
      EN: "Successful"
    }
  },
  FAILED: {
    CODE: 2,
    MESSAGE: {
      VI: "Thất bại",
      EN: "Process failed"
    }
  },
  INVALID_PARAM: {
    CODE: 400,
    MESSAGE: {
      VI: "Dữ liệu không hợp lệ",
      EN: "Invalid param"
    }
  },
  ITEM_NOT_FOUND: {
		CODE: 1002,
		MESSAGE: {
			VI: "Không tìm thấy dữ liệu",
			EN: "ITEM NOT FOUND"
		}
	},
  MISSING_STORE_ID: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số storeId",
      EN: "Missing storeId"
    }
  },
  MISSING_EMAIL: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số email",
      EN: "Missing email"
    }
  },
  MISSING_PHONE: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số phone",
      EN: "Missing phone"
    }
  },
  MISSING_FULL_NAME: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số fullName",
      EN: "Missing fullName"
    }
  },
  MISSING_CHANNEL_WORKS: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số channelWorks",
      EN: "Missing channelWorks"
    }
  },
  MISSING_WORKING_TIMES: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số workingTimes",
      EN: "Missing workingTimes"
    }
  },
  PARAMS_INVALID_FORMAT_CHANNEL_WORKS: {
    CODE: 1003,
    MESSAGE: {
      VI: "Tham số channelWorks không đúng định dạng",
      EN: "Parameter channelWorks invalid format"
    }
  },
  PARAMS_INVALID_FORMAT_WORKING_TIMES: {
    CODE: 1003,
    MESSAGE: {
      VI: "Tham số workingTimes không đúng định dạng",
      EN: "Parameter workingTimes invalid format"
    }
  },
  MISSING_CASHIER_ID: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số cashierId",
      EN: "Missing cashierId"
    }
  },
  MISSING_PASSWORD_FOR_APP: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số passwordForApp",
      EN: "Missing passwordForApp"
    }
  },
  MISSING_PASSWORD_FOR_WEB: {
    CODE: 1000,
    MESSAGE: {
      VI: "Thiếu tham số passwordForWeb",
      EN: "Missing passwordForWeb"
    }
  },
  MISSING_MERCHANT_ID: {
    CODE: 1004,
    MESSAGE: {
      VI: "Thiếu tham số merchantId",
      EN: "Missing merchantId"
    }
  },
  MISSING_PAYMENT_CHANNEL_STATE: {
    CODE: 1004,
    MESSAGE: {
      VI: "Thiếu trạng thái kênh thanh toán",
      EN: "Missing payment channel state"
    }
  },
  STORE_NOT_FOUND: {
    CODE: 1004,
    MESSAGE: {
      VI: "Không tìm thấy thông tin store",
      EN: "Store not found"
    }
  },
  CASHIER_NOT_FOUND: {
    CODE: 1004,
    MESSAGE: {
      VI: "Không tìm thấy thông tin nhân viên",
      EN: "Cashier not found"
    }
  },
  PHONE_EXISTED: {
    CODE: 1003,
    MESSAGE: {
      VI: "Số điện thoại của nhân viên đã tồn tại",
      EN: "Phone cashier existed"
    }
  },
  EMAIL_EXISTED: {
    CODE: 1003,
    MESSAGE: {
      VI: "Địa chỉ email của nhân viên đã tồn tại",
      EN: "Email cashier existed"
    }
  },
  INVALID_EMAIL: {
    CODE: 1001,
    MESSAGE: {
      VI: "Địa chỉ email không hợp lệ",
      EN: "Invalid email"
    }
  },
  INVALID_PHONE: {
    CODE: 1001,
    MESSAGE: {
      VI: "Số điện thoại không hợp lệ",
      EN: "Invalid phone number"
    }
  },
  INVALID_IDENTITY_NUMBER: {
    CODE: 1001,
    MESSAGE: {
      VI: "Số định danh không hợp lệ",
      EN: "Invalid identity number"
    }
  },
  INVALID_PAYMENT_CHANNEL: {
    CODE: 1001,
    MESSAGE: {
      VI: "Kênh thanh toán không hợp lệ",
      EN: "Invalid payment channel"
    }
  },
  INVALID_IDENTITY_NAME: {
    CODE: 1001,
    MESSAGE: {
      VI: "Họ tên không hợp lệ",
      EN: "Invalid fullname"
    }
  },
  MERCHANT_NOT_FOUND: {
    CODE: 1004,
    MESSAGE: {
      VI: "Không tìm thấy thông tin merchant",
      EN: "Merchant not found"
    }
  },
  PAYOUT_REQUEST_NOT_FOUND: {
    CODE: 1004,
    MESSAGE: {
      VI: "Không tìm thấy thông tin yêu cầu rút tiền",
      EN: "payout request not found"
    }
  },
  RECONCILE_APPROVE_NOT_TOTAL_ITEM: {
    CODE: 1000,
    MESSAGE: {
      VI: "Số lượng các dòng đối soát cần duyệt không đủ. Vui lòng duyệt đủ các dòng đối soát lệch",
      EN: "Total items need to approve not enough"
    }
  }
};
export = COMMON_CODES;

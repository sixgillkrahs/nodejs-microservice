const BUSSINESS_CODES = {
  SYSTEM_CONFIG_EXISTED: {
    CODE: 1003,
    MESSAGE: {
      VI: "Key cấu hình đã tồn tại trên hệ thống, vui lòng kiểm tra lại!",
      EN: "Configuration key already exists on the system, please check again!"
    }
  },

  USED_BUSINESS_LINE: {
    CODE: 1701,
    MESSAGE: {
      VI: "Không thể xóa ngành nghề đã được sử dụng (code: ${valObj.code})",
      EN: "Can not delete used business line (code: ${valObj.code})"
    }
  },
  NO_PAYMENT_INFO_FOUND: {
    CODE: 2001,
    MESSAGE: {
      VI: "Không tìm thấy thông tin giao dịch",
      EN: "Transaction info not found"
    }
  },
  INVALID_REFUND_AMOUNT: {
    CODE: 2002,
    MESSAGE: {
      VI: "Số tiền yêu cầu hoàn lớn hơn giá trị hóa đơn",
      EN: "The amount requested for refund is greater than the invoice value"
    }
  },
  REFUND_EXISTED: {
    CODE: 2003,
    MESSAGE: {
      VI: "Đang tồn tại yêu cầu hoàn tiền cho hóa đơn ở trạng thái chờ duyệt",
      EN: "There is a request for a refund for current invoice pending approval"
    }
  },
  UPDATE_APPROVED_REFUND: {
    CODE: 2004,
    MESSAGE: {
      VI: "Không thể cập nhật yêu cầu hoàn tiền đã được duyệt",
      EN: "Unable to update the approved refund request"
    }
  },
  DELETE_APPROVED_REFUND: {
    CODE: 2005,
    MESSAGE: {
      VI: "Không thể xóa yêu cầu hoàn tiền đã được duyệt",
      EN: "Unable to delete the approved refund request"
    }
  },
  USER_EXISTED: {
    CODE: 2101,
    MESSAGE: {
      VI: "Tài khoản đăng nhập đã được sử dụng!",
      EN: "The login account is already in use!"
    }
  },
  MERCHANT_CODE_EXISTED: {
    CODE: 2102,
    MESSAGE: {
      VI: "Mã merchant đã tồn tại?",
      EN: "Merchant code existed!"
    }
  },
  MERCHANT_STORE_INVALID: {
    CODE: 1401,
    MESSAGE: {
      VI: "Chức năng này chỉ dành cho cửa hàng của merchant",
      EN: "This function just for store of merchant"
    }
  },
  MERCHANT_MASTER_ACCOUNT_EXISTED: {
    CODE: 2103,
    MESSAGE: {
      VI: "Thông tin đăng nhập Goopay đã được sử dụng, vui lòng kiểm tra lại!",
      EN: "Goopay login account has been used, please check again!"
    }
  },
  MERCHANT_REGISTRATION_EMAIL_EXISTED: {
    CODE: 2104,
    MESSAGE: {
      VI: "Email này đã tồn tại, vui lòng nhập lại",
      EN: "Email already exists, please enter again"
    }
  },
  MERCHANT_REGISTRATION_PENDING_EXISTED: {
    CODE: 2105,
    MESSAGE: {
      VI: "Đã tồn tại đơn đăng ký trạng thái chờ duyệt/đã duyệt trên hệ thống, vui lòng kiểm tra lại!",
      EN: "There is already a pending/approved application in the system, please check again!"
    }
  },
  STORE_NOT_FOUND: {
    CODE: 2106,
    MESSAGE: {
      VI: "Thông tin cửa hàng không chính xác. Vui lòng kiểm tra lại",
      EN: "Could not found store .Please check again!"
    }
  },
  CREATE_BANK_ACCOUNT_FAILED: {
    CODE: 2107,
    MESSAGE: {
      VI: "Tài khoản ví của bạn đã tồn tại. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ",
      EN: "Account wallet existed. Please check or call support center"
    }
  },
  BUSINESS_LINE_CODE_EXISTED: {
    CODE: 2108,
    MESSAGE: {
      VI: "Mã ngành nghề kinh doanh đã tồn tại!",
      EN: "Business Line code existed!"
    }
  },
  TOKEN_ACTIVE_MERCHANT_REGISTRATION_EXPIRED: {
    CODE: 2100,
    MESSAGE: {
      VI: "Token kích hoạt đã hết hạn!. Vui lòng sử dụng Goopay App để lấy lại link kích hoạt",
      EN: "Token active expired. Please use Goopay App to get link active again"
    }
  },
  MERCHANT_REGISTRATION_UPDATE_WRONG_STATE: {
    CODE: 2110,
    MESSAGE: {
      VI: "Chỉ có thể cập nhật đơn trạng thái từ chối duyệt!",
      EN: "Only approval status can be updated!"
    }
  },
  MERCHANT_REGISTRATION_APPROVE_WRONG_STATE: {
    CODE: 2111,
    MESSAGE: {
      VI: "Chỉ có thể duyệt/từ chối duyệt đơn trạng thái chờ duyệt!",
      EN: "Can only approve/reject approval pending status application!"
    }
  },
  ACCOUNT_HAS_BEEN_ACTIVATED: {
    CODE: 2112,
    MESSAGE: {
      VI: "Tài khoản đã được kích hoạt!",
      EN: "Account has been activated!"
    }
  },
  INVALID_REPORT_CHART_TYPE: {
    CODE: 2113,
    MESSAGE: {
      VI: "Loại biểu đồ report không hợp lệ!",
      EN: "Invalid report chart type!"
    }
  },
  INVALID_REPORT_TRANS_TYPE: {
    CODE: 2114,
    MESSAGE: {
      VI: "Loại giao dịch không hợp lệ!",
      EN: "Invalid report transaction type!"
    }
  },
  INVALID_REPORT_TRANS_STATUS: {
    CODE: 2115,
    MESSAGE: {
      VI: "Trạng thái giao dịch không hợp lệ!",
      EN: "Invalid report transaction status!"
    }
  },
  INVALID_REPORT_DATA_TYPE: {
    CODE: 2116,
    MESSAGE: {
      VI: "Loại dữ liệu report không hợp lệ!",
      EN: "Invalid report data type!"
    }
  },
  MERCHANT_REGISTRATION_PHONE_EXISTED: {
    CODE: 2117,
    MESSAGE: {
      VI: "Số điện thoại/Email đăng ký đã tồn tại trên hệ thống, vui lòng kiểm tra lại!",
      EN: "Registered phone/email already exists on the system, please check again!"
    }
  },
  MERCHANT_NOT_INIT_WALLET: {
    CODE: 2118,
    MESSAGE: {
      VI: "Merchant chưa liên kết ví",
      EN: "Merchant have not wallet info"
    }
  },
  PAYOUT_BANK_REGISTERED: {
    CODE: 2118,
    MESSAGE: {
      VI: "Ngân hàng rút tiền đã được đăng ký, hiện tại chỉ hỗ trợ một ngân hàng",
      EN: "Registered payout bank, currently only one bank is supported"
    }
  },
  PAYOUT_BANK_NOT_SUPPORT: {
    CODE: 2119,
    MESSAGE: {
      VI: "Ngân hàng rút tiền chưa được hỗ trợ",
      EN: "Payout bank not support"
    }
  },
  MERCHANT_WALLET_NOT_AVAILABLE: {
    CODE: 2120,
    MESSAGE: {
      VI: "Merchant chưa có tài khoản ví",
      EN: "Merchant wallet not available"
    }
  },
  PAYOUT_REQUEST_ALREADY_APPROVE: {
    CODE: 2121,
    MESSAGE: {
      VI: "Yêu cầu này đã được duyệt",
      EN: "This request was approved"
    }
  },
  CANNOT_DELETE_STORE_ACTIVE: {
    CODE: 2122,
    MESSAGE: {
      VI: "Không thể xóa cửa hàng đang kích hoạt",
      EN: "Cannot delete store activated"
    }
  },
  CANNOT_DELETE_STORE_HAS_CASHIER: {
    CODE: 2123,
    MESSAGE: {
      VI: "Không thể xóa cửa hàng đã có cashier",
      EN: "Cannot delete store has cashier"
    }
  },
  NO_DATA_EXPORT: {
    CODE: 2124,
    MESSAGE: {
      VI: "Không có dữ liệu để xuất file",
      EN: "No data to export"
    }
  },
  MERCHANT_INFO_NOT_FOUND: {
    CODE: 2125,
    MESSAGE: {
      VI: "Không tìm thấy thông tin merchant",
      EN: "Merchant not found"
    }
  },
  MERCHANT_INFO_HAVE_NOT_WALLET: {
    CODE: 2126,
    MESSAGE: {
      VI: "Merchant không có thông tin ví",
      EN: "Merchant have not wallet info"
    }
  },
  MERCHANT_TRANSFER_AMOUNT_FAILED: {
    CODE: 2127,
    MESSAGE: {
      VI: "Xử lý chuyển tiền vào ví merchant thất bại",
      EN: "Processing transfer amount to merchant wallet failed"
    }
  },
  MERCHANT_RECONCILE_STATE_DONE: {
    CODE: 2128,
    MESSAGE: {
      VI: "Không thể phê duyệt đối soát. Đối soát đã hoàn tất",
      EN: "Cannot approve on reconcile data with state DONE"
    }
  },
  MERCHANT_RECONCILE_TRANSFER_AMOUNT_WRONG: {
    CODE: 2128,
    MESSAGE: {
      VI: "Vui lòng kiểm tra lại tổng tiền các giao dịch thanh toán bé hơn tổng tiền các giao dịch hoàn",
      EN: "Please check again. Current total payment request amount is lower than total refund request amount"
    }
  },
  MERCHANT_STATE_NOT_REJECTED_WITH_REASON: {
    CODE: 2129,
    MESSAGE: {
      VI: "Merchant đang không ở trạng thái cần chỉnh sửa",
      EN: "Merchant is not in editing state"
    }
  },
  TOKEN_RECHECK_MERCHANT_REGISTRATION_EXPIRED: {
    CODE: 2130,
    MESSAGE: {
      VI: "Token đã hết hạn!",
      EN: "Token recheck expired"
    }
  },
  CREATE_MERCHANT_WALLET_FAILED: {
    CODE: 2131,
    MESSAGE: {
      VI: "Tạo ví mặc định cho merchant thất bại",
      EN: "Create wallet merchant failed"
    }
  },
  CREATE_MERCHANT_ACCOUNT_WALLET_FAILED: {
    CODE: 2132,
    MESSAGE: {
      VI: "Tạo tài khoản liên kết ví mặc định thất bại",
      EN: "Create account wallet linked merchant failed"
    }
  },
  MERCHANT_USER_EMAIL_EXISTED: {
    CODE: 2133,
    MESSAGE: {
      VI: "Email người dùng đã tồn tại, vui lòng kiểm tra lại!",
      EN: "User email already exists, please check again!"
    }
  },
  MERCHANT_USER_INVALID_ACTIVE: {
    CODE: 2134,
    MESSAGE: {
      VI: "Không thể kích hoạt/ngưng kích hoạt tài khoản chưa được xác thực!",
      EN: "Can't activate/deactivate unauthenticated accounts!"
    }
  },
  INVALID_REFUND_FULL: {
    CODE: 2135,
    MESSAGE: {
      VI: "Chỉ cho phép hoàn tiền toàn phần",
      EN: "Only full refunds are allowed"
    }
  },
  INVALID_ROLE_UPDATE: {
    CODE: 2136,
    MESSAGE: {
      VI: "Không thể cập nhật phân quyền!",
      EN: "Unable to update permissions!"
    }
  },
  MERCHANT_PAYMENT_PAGE_CONFIG_EXISTED: {
    CODE: 2137,
    MESSAGE: {
      VI: "Đã tồn tại yêu cầu chỉnh sửa ở trạng thái chờ duyệt!",
      EN: "An update request exists in a pending state!"
    }
  },
  SYNC_MANUAL_RECONCILE_REPORT_MERCHANT_NOT_FOUND: {
    CODE: 2138,
    MESSAGE: {
      VI: "Thông tin merchant không tìm thấy, hủy tiến trình cập nhật dữ liệu đối soát",
      EN: "Merchant not found so cancel update data report"
    }
  },
  SYNC_MANUAL_RECONCILE_REPORT_NOT_FOUND: {
    CODE: 2139,
    MESSAGE: {
      VI: "Thông tin dữ liệu đối soát không tìm thấy, hủy tiến trình cập nhật dữ liệu đối soát",
      EN: "Reconcile report not found so cancel update data report"
    }
  },
  SYNC_MANUAL_RECONCILE_REPORT_NOT_UPDATE: {
    CODE: 2140,
    MESSAGE: {
      VI: "Không có dữ liệu thay đổi, không cập nhật lại dữ liệu đối soát",
      EN: "Have not data changed so do not update data report"
    }
  },
  SYNC_MANUAL_RECONCILE_REPORT_STILL_RECONCILE_PENDING: {
    CODE: 2141,
    MESSAGE: {
      VI: "Dữ liệu báo cáo đối soát trong kỳ chưa hoàn tất. Vẫn còn dữ liệu báo cáo trạng thái Chờ Đối Soát.",
      EN: "Have reconcile still not DONE, Please access and confirm reconciles have state PENDING"
    }
  },
  MERCHANT_PAYMENT_GATEWAY_APPROVE_WRONG_STATE: {
    CODE: 2142,
    MESSAGE: {
      VI: "Chỉ có thể duyệt/từ chối duyệt yêu cầu ở trạng thái chờ duyệt.",
      EN: "Requests can only be approved/rejected in PENDING status."
    }
  },
  MERCHANT_PAYMENT_GATEWAY_UPDATE_WRONG_STATE: {
    CODE: 2143,
    MESSAGE: {
      VI: "Không thể cập nhật/gửi duyệt yêu cầu ở trạng thái đã duyệt.",
      EN: "Unable to update/submit request in APPROVED state."
    }
  },
  TURN_OFF_PAYMENT_MERTHOD_FAIL: {
    CODE: 2145,
    MESSAGE: {
      VI: "Không thế khóa tất cả kênh thanh toán",
      EN: "You can not inactive all channels on a payment gateway"
    }
  },
  MERCHANT_RECONCILE_TRANSFER_AMOUNT_GREATER_TOTAL_BILL_PAID_AMOUNT: {
    CODE: 2146,
    MESSAGE: {
      VI: "Tổng số tiền không thể lớn tổng giá trị thanh toán trên tất cả đơn hàng",
      EN: "Please check again. Current total payment request amount is lower than total refund request amount"
    }
  },
  APPROVE_MERCHANT_CASHOUT_FAILED: {
    CODE: 2147,
    MESSAGE: {
      VI: "Không thể duyệt yêu cầu rút tiền",
      EN: "Approve merchant cashout failed"
    }
  },
  REJECT_MERCHANT_CASHOUT_FAILED: {
    CODE: 2147,
    MESSAGE: {
      VI: "Không thể từ chối yêu cầu rút tiền",
      EN: "Reject merchant cashout failed"
    }
  },
  INVALID_APPROVAL_METHOD: {
    CODE: 2148,
    MESSAGE: {
      VI: "Loại duyệt yêu cầu không được hỗ trợ",
      EN: "Invalid approval method"
    }
  },
  BANK_ACCOUNT_NAME_NOT_MATCH: {
    CODE: 2149,
    MESSAGE: {
      VI: "Tên tài khoản ngân hàng không trùng với tên tài khoản được đăng ký",
      EN: "The bank account name does not match the registered name."
    }
  },
  PAYOUT_REQUEST_ALREADY_COMPLETED: {
    CODE: 2150,
    MESSAGE: {
      VI: "Yêu cầu này đã được xử lý",
      EN: "This request has been completed"
    }
  },
  PAYOUT_REQUEST_NOT_APPROVED: {
    CODE: 2150,
    MESSAGE: {
      VI: "Yêu cầu này chưa được duyệt",
      EN: "This request not approved"
    }
  },
  WARNING_FRAUD_TRANS: {
    CODE: 1105,
    MESSAGE: {
      VI: "Từ chối giao dịch do vi phạm quy định của hệ thống.",
      EN: "Reject transaction due to violation of System regulations."
    }
  },
  VALIDATE_CHECK_MERCHANT_NAME: {
    CODE: 3000,
    MESSAGE: {
      VI: "Tên tối thiểu 5 ký tự chữ, tối đa 50 ký tự, không được chứa ký tự đặc biệt.",
      EN: "Name must be at least 5 alphanumeric characters, maximum 50 characters, no special characters."
    }
  },
  VALIDATE_CHECK_WEB_URL: {
    CODE: 3000,
    MESSAGE: {
      VI: "Đường dẫn website không hợp lệ.",
      EN: "Website url invalid"
    }
  },
  VALIDATE_INVALID_TAX_NO: {
    CODE: 3001,
    MESSAGE: {
      VI: "Mã số thuế không hợp lệ, vui lòng nhập lại",
      EN: "Invalid tax code, please re-enter"
    }
  },
  VALIDATE_MIN_LENGTH_TAX_NO: {
    CODE: 3002,
    MESSAGE: {
      VI: "Mã số thuế phải ít nhất 10 kí tự, vui lòng nhập lại",
      EN: "Tax code must be at least 10 characters, please re-enter"
    }
  },
  VALIDATE_MAX_LENGTH_TAX_NO: {
    CODE: 3003,
    MESSAGE: {
      VI: "Mã số thuế tối đa 14 kí tự, vui lòng nhập lại",
      EN: "Tax code maximum 14 characters, please re-enter"
    }
  },
  VALIDATE_MIN_LENGTH_MERCHANT_PHONE: {
    CODE: 3004,
    MESSAGE: {
      VI: "Số điện thoại phải ít nhất 8 kí tự, vui lòng nhập lại",
      EN: "Merchant phone must be at least 8 characters, please re-enter"
    }
  },
  VALIDATE_MAX_LENGTH_MERCHANT_PHONE: {
    CODE: 3005,
    MESSAGE: {
      VI: "Số điện thoại tối đa 11 kí tự, vui lòng nhập lại",
      EN: "Merchant phone maximum 11 characters, please re-enter"
    }
  },
  VALIDATE_MERCHANT_NAME_NOT_NULL: {
    CODE: 3000,
    MESSAGE: {
      VI: "Merchant name không được để trống",
      EN: "Merchant name can't be left blank"
    }
  },
  VALIDATE_CHECK_MIN_LENGTH_MERCHANT_NAME: {
    CODE: 3001,
    MESSAGE: {
      VI: "Tên ít nhất 5 ký tự, vui lòng nhập lại",
      EN: "Name is at least 5 characters, please re-enter"
    }
  },
  VALIDATE_CHECK_MAX_LENGTH_MERCHANT_NAME: {
    CODE: 3002,
    MESSAGE: {
      VI: "Tên không quá 250 ký tự, vui lòng nhập lại",
      EN: "Name should not exceed 250 characters, please re-enter"
    }
  },
  RISK_RULE_VIOLATION: {
    CODE: 3000,
    MESSAGE: {
      VI: "Từ chối đăng ký do vi phạm quy định của Goopay.",
      EN: "Authentication refused due to violation of Goopay regulations"
    }
  },
  RISK_RULE_VIOLATION_PORTAL: {
    CODE: 3009,
    MESSAGE: {
      VI: "Hồ sơ của bạn đã bị từ chối vì vi phạm quy định của Goopay.",
      EN: "Authentication refused due to violation of Goopay regulations"
    }
  },
  VIOLATION_VELOCITY_POLICIES: {
    CODE: 1106,
    MESSAGE: {
      VI: "Từ chối giao dịch do vi phạm quy định của hệ thống.",
      EN: "Reject transaction due to violation of System regulations."
    }
  },
  MERCHANT_WALLET_REQUEST_EXISTED: {
    CODE: 3010,
    MESSAGE: {
      VI: "Đã tồn tại yêu cầu/ví cho loại tiền tệ này, vui lòng kiểm tra lại.",
      EN: "A request/wallet already exists for this currency, please check again."
    }
  },
  MERCHANT_WALLET_REQUEST_INVALID_APPROVE_STATUS: {
    CODE: 3011,
    MESSAGE: {
      VI: "Chỉ có thể duyệt yêu cầu ở trạng thái chờ duyệt.",
      EN: "Requests can only be approved in pending status."
    }
  },
  CANNOT_LOCK_ALL_PAYMENT_CHANNEL: {
    CODE: 3012,
    MESSAGE: {
      VI: "Không thể khoá tất cả kênh thanh toán. Vui lòng kiểm tra lại",
      EN: "Cannot lock all payment channel. Please check back"
    }
  },
  CACHE_REGISTRATION_INFO_EXPIRED: {
    CODE: 3013,
    MESSAGE: {
      VI: "Hồ sơ đăng ký Merchant đã hết hạn, bạn vui lòng bổ sung đầy đủ thông tin và đăng ký!",
      EN: "Merchant registration has expired, please fill in your details and register!"
    }
  },
  BUSINESS_REGISTER_EMAIL_EXIST: {
    CODE: 3013,
    MESSAGE: {
      VI: "Email này đã được đăng kí!",
      EN: "This email registered!"
    }
  },
   CREATE_REQUEST_ERROR: {
    CODE: 10,
    MESSAGE: {
      VI: "File excel lỗi, vui lòng sửa lại",
      EN: "File excel error, please edit it"
    }
  },
   TAX_CODE_EXIST: {
    CODE: 100,
    MESSAGE: {
      VI: "Số giấy tờ đã tồn tại",
      EN: "documents existed"
    }
  },
  INSUFFICIENT_BALANCE: {
    CODE: 101,
    MESSAGE: {
      VI: "Số dư không đủ",
      EN: "Insufficient balance"
    }
  }
};

export { BUSSINESS_CODES };

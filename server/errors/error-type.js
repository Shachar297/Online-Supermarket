let errorType = {
    GENERAL_ERROR: { id: 1, httpCode: 600, message: "General Error .. PLEASE INFORM TO AN ADMIN", isShowStackTrace: true },
    USER_NAME_ALREADY_EXIST: { id: 2, httpCode: 601, message: "User name already exist", isShowStackTrace: false },
    UNAUTHORIZED: { id: 3, httpCode: 401, message: "Login failed, invalid username or password", isShowStackTrace: false },
    UNAUTHORIZED_USER_TYPE: { id: 4, httpCode: 666, message: "UNAUTHORIZED , \N Only an admin can commin this action", isShowStackTrace: false },
    USER_PASSWORD_CAN_NOT_BE_EMPTY: { id: 5, httpCode: 800, message: "Can not Launch empty Input", isShowStackTrace: false },
    USER_BAD_PASSWORD: { id: 6, httpCode: 801, message: "Password must contain NUM to NUM !", isShowStackTrace: false },
    USER_NAME_CAN_NOT_BE_EMPTY: { id: 7, httpCode: 802, message: "Can not Launch empty Input", isShowStackTrace: false },
    USER_BAD_USERNAME: { id: 8, httpCode: 803, message: "Username must contain NUM to NUM !", isShowStackTrace: false },
    STREET_NAME_CAN_NOT_BE_EMPTY: { id: 9, httpCode: 804, message: "Can not Launch empty Input", isShowStackTrace: false },
    STREET_BAD_LENGTH: { id: 10, httpCode: 805, message: "Street name must contain atleast two characters !", isShowStackTrace: false },
    CITY_CAN_NOT_BE_EMPTY: { id: 11, httpCode: 806, message: "Can not Launch empty Input", isShowStackTrace: false },
    CITY_BAD_LENGTH: { id: 12, httpCode: 807, message: "City name must contain atleast two characters !", isShowStackTrace: false },
    IDENTITY_NUMBER_CAN_NOT_REMAIN_EMPTY : {id : 13 , httpCode : 808 , message : "Identity Number can not remain Empty !" , isShowStackTrace : false},
    IDENTITY_NUMBER_BAD_LENGTH : {id : 14 , httpCode : 809 , message : "Identity Number must contain 7 characters" , isShowStackTrace : false},
    PRODUCT_NAME_CAN_NOT_BE_EMPTY : {id : 15 , httpCode : 900 , message : "Product name can not be empty !" , isShowStackTrace : false},
    PRODUCT_NAME_BAD_LENGTH : {id : 16 , httpCode : 901 , message : "Product name must contain N to N characters"},
    PRODUCT_PRICE_CAN_NOT_BE_ZERO : {id : 17 , httpCode : 902 , message : "Product price can not be 0 !"},
    PRODUCT_IMAGE_MISSING : {id : 18 , httpCode : 903 , message : "Product image URL must be a URL , and atleast 10 characters !"},
    CREDIT_CARD_MISSING : {id : 19 , httpCode : 910 , message : "Credit card Missing." , isShowStackTrace : false},
    CREDIT_CARD_BAD_LENGTH : {id : 20 , httpCode : 911 , message : "FOUR Credit card digits is mustable" , isShowStackTrace : false},
    CATEGORY_MISSING : {id : 21 , httpCode : 905 , message : "Category is missing." , isShowStackTrace : false}
}


module.exports = errorType;
const validFormData = ({
    date,
    state,
    dist,
    pinCode,
    address,
    cardNo,
    cvv,
    expiryDate,
}) => {
    const error = {};

    if (state === "" || state === undefined) {
        error.state = "Please Input State";
    }

    if (dist === "" || dist === undefined) {
        error.dist = "Please Input Dist";
    }

    if (pinCode === "" || pinCode === undefined) {
        error.pinCode = "Please Input PinCode";
    } else if (isNaN(pinCode)) {
        error.pinCode = "Invalid PinCode";
    } else if (pinCode.length !== 6) {
        error.pinCode = "Invalid PinCode";
    }

    if (date === "" || date === undefined) {
        error.date = "Please Select Date";
    }

    if (address === "" || address === undefined) {
        error.address = "Please Input Address";
    }

    if (cardNo === "" || cardNo === undefined) {
        error.cardNo = "Please Input CardNo";
    } else if (cardNo.match(new RegExp(`\d-{0,16}`))) {
        error.cardNo = "Please Enter Numbers Only";
    } else if (cardNo.length !== 19) {
        error.cardNo = "Invalid CardNo";
    }

    if (cvv === "" || cvv === undefined) {
        error.cvv = "Please Input CVV";
    } else if (isNaN(cvv)) {
        error.cvv = "Please Enter Numbers Only";
    } else if (cvv.length !== 3) {
        error.cvv = "Invalid cvv";
    }

    if (expiryDate === "") {
        error.expiryDate = "Please Input Expiry Date";
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length,
    };
};

export default validFormData;

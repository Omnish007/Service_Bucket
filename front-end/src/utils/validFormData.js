const validFormData = ({ date, state, dist, pinCode, address, cardNo, cvv, expiryDate }) => {
    const error = {}

    if (state == "") {
        error.state = "Please Input State"
    }

    if (dist == "") {
        error.dist = "Please Input Dist"
    }

    if (pinCode == "") {
        error.pinCode = "Please Input PinCode"
    }
    else if (isNaN(pinCode)) {
        error.pinCode = "Invalid PinCode"
    }
    else if (pinCode.length !== 6) {
        error.pinCode = "Invalid PinCode"
    }

    if (date == "") {
        error.date = "Please Select Date"
    }

    if (address == "") {
        error.address = "Please Input Address"
    }

    if (cardNo == "") {
        error.cardNo = "Please Input CardNo"
    }
    else if (isNaN(cardNo)) {
        error.cardNo = "Please Enter Numbers Only"
    }
    else if (cardNo.length !== 16) {
        error.cardNo = "Invalid CardNo"
    }

    if (cvv == "") {
        error.cvv = "Please Input CVV"
    }
    else if (isNaN(cvv)) {
        error.cvv = "Please Enter Numbers Only"
    }
    else if (cvv.length !== 3) {
        error.cvv = "Invalid cvv"
    }

    if (expiryDate == "") {
        error.expiryDate = "Please Input Expiry Date"
    }
    else if(isNaN(expiryDate)) {
        error.expiryDate = "Please Input Valid Expiry Date"
    }


    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }

}


export default validFormData
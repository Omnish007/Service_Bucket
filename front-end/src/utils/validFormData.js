const validFormData = ({ date, state, dist, pinCode, address }) => {
    const error = {}

    if(!state){
        error.state = "Please Input State"
    }

    if(!dist){
        error.dist = "Please Input Dist"
    }

    if(!pinCode){
        error.pinCode = "Please Input PinCode"
    }

    if(!date){
        error.date = "Please Select Date"
    }

    if(!address){
        error.address = "Please Input Address"
    }
    

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }

}


export default validFormData
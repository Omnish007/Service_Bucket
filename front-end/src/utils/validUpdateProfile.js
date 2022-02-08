const valid = ({ name, phone }) => {
    const error = {}

    if (name.length > 25) {
        error.name = "name is upto 25 characters long"
    } else if (name.length !== 0) {
        if (name.length < 3) {
            error.name = "name should be atleast 3 charecter long"
        }
    }

    if (phone.length !== 0) {
        if (phone.length !== 10) {
            error.phone = "Invalid Phone no."
        }
    } else if (isNaN(phone)) {
        error.phone = "Invalid Phone no."
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }

}

export default valid
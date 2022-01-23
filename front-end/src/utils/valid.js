const valid = ({name, email, phone, password, cf_password}) => {
    const error = {}

    if(!name){
        error.name = "Please enter your name"
    }else if(name.length > 25){
        error.name = "name is upto 25 characters long"
    }

    if(!email){
        error.email = "Please enter your email"
    }else if(!validateEmail(email)){
        error.email = "Email format is incorrect"
    }
    if(!phone){
        error.phone = "Please enter your phone no."
    }else if(phone.length !== 10){
        error.phone = "Invalid Phone no."
    }else if(isNaN(phone)){
        error.phone = "Invalid Phone no."
    }

    if(!password){
        error.password = "Please enter your password"
    }else if(password.length < 6 ){
        error.password = "password must be at least 6 character long "
    }

    if(password !== cf_password){
        error.cf_password = "Confirm password did not match"
    }
    else if(cf_password.length == 0){
        error.cf_password = "Re-enter your password"
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid
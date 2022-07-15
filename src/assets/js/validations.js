var namePattern = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
var emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/** name validator **/
$.validator.addMethod('name', (value, element, arg) => {
    const str = value.trim();
    const regex = new RegExp(namePattern);

    if (regex.test(str)) {
        return true;
    } else {
        return false;
    }
}, 'Enter a valid name');


/** email id validator **/
$.validator.addMethod('emailId', (value, element, arg) => {
    const str = value.trim();
    const regex = new RegExp(emailPattern);

    if (regex.test(str)) {
        return true;
    } else {
        return false;
    }
}, 'Enter a valid email id');

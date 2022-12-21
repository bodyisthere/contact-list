export const nameValidation = (name) => {
    const regExp = new RegExp('[0-9~@#$%^-_(){}]', 'i'); 
    if(regExp.test(name) || name.length === 0) return false;
    return true;
}

export const phoneValidation = (phone) => {
    const regExp = new RegExp('[^+7 \d\d\d \d\d\d \d\d \d\d]', 'i');
    if(regExp.test(phone)) return true;
    return false;
}
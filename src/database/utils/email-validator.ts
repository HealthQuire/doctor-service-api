const validateEmail = (email) => {
    const sample = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return sample.test(email);
};

export default validateEmail;

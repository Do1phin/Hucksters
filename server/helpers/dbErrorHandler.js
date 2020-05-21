const getErrorMessage = (error) => {

    if (error.name === 'MongoError') {
        throw new Error(`${error.name}: code [${error.code}] - ${error.errmsg}`)
    } else {
        throw new Error(`Ошибка ${error}`);
    }
};

export default getErrorMessage;

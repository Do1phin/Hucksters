const getErrorMessage = (error) => {

    if (error.name = 'MongoError') {
        return `${error.name}: code [${error.code}] - ${error.errmsg}`
    } else {
        return `Ошибка ${error}`
    }
    console.log('ОШИБКА ДЛЯ ОТСЛЕЖИВАНИЯ ', error)
};

export default getErrorMessage;

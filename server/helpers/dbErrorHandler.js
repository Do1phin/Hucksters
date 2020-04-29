const getErrorMessage = (error) => {

    if (error.name = 'MongoError') {
        return `${error.name}: code [${error.code}] - ${error.errmsg}`
    } else {
        return `Ошибка ${error}`
    }
    console.error('ОШИБКА ДЛЯ ОТСЛЕЖИВАНИЯ ', error)
};

export default getErrorMessage;

const stampToDate = (timestamp) => {
    return new Date(timestamp*1000).toLocaleString();
};

export {
    stampToDate
}

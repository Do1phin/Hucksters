const stampToDate = (timestamp) => {
    // const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(timestamp*1000).toLocaleString([]);
};

export {
    stampToDate
};

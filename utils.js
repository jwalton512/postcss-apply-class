module.exports = {
    stringToList(string) {
        return string.replace(/\s/g, '').split(',');
    }
};

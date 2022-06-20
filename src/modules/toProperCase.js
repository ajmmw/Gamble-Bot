module.exports = () => {
    Object.defineProperty(String.prototype, 'toProperCase', {
        value() {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        },
    });
};
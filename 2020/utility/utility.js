// multiple dimension array deep clone
const arrayClone = (array) => {
    let copy;
    if (Array.isArray(array)) {
        copy = [...array];
        for (let i=0; i<copy.length; i++) {
            copy[i] = arrayClone(array[i]);
        }
        return copy;
    } else if (typeof array === 'object') {
        throw "Can't clone array contains an object";
    }

    return array;
};

exports.arrayClone = arrayClone;
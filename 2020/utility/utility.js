/**
 * multiple dimension array deep clone
 * 
 * array copy or object copy is only copy one dimension (shallow copy),
 * deep clone need to copy children array or object
 * 
 */

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
let count = 0;
for(i=254032; i<789861; i++) {
    let data = i + '';
    let increase = true;
    let sameNeighberArray = [];
    let sameNeighberCount = 1;
    for(j=1; j<data.length; j++) {
        if (data[j] === data[j-1]) {
            sameNeighberCount++;
        } else {
            sameNeighberArray.push(sameNeighberCount);
            sameNeighberCount = 1;
        }
        if (j === data.length - 1) {
            sameNeighberArray.push(sameNeighberCount);
        }
        if (data[j] < data[j-1]) {
            increase = false;
        }
    }
    if (sameNeighberArray.indexOf(2) >=0 && increase) {
        count++;
    }
}

console.log(count);
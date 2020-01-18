const rr = new Map();
/*
rr.set('n',{no:1,age:20});
rr.set('b',{no:1,age:20});

const result = rr.values();
const ret = [];
for ( amount of rr.values()) {
    ret.push(amount);
console.log('result : ',amount);
}
*/
rr.set('n','baw');
console.log('rvvv : ',rr.has('n'));


rr.delete('n');
console.log('rvvv : ',rr.has('n'));

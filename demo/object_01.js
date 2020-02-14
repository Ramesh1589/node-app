function clone(target, map = new WeakMap()) {

    // clone primitive types
    if (typeof target != "object" || target == null) {
        return target;
    }

    const type = toRawType(target);
    let cloneTarget = null;


    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // clone Set
    if (type == "Set") {
        cloneTarget = new Set();
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // clone Map
    if (type == "Map") {
        cloneTarget = new Map();
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // clone Array
    if (type == "Array") {
        cloneTarget = new Array();
        forEach(target, (value, index) => {
          cloneTarget[index] = clone(value, map);
        })
    }

    // clone normal Object
    if (type == "Object") {
        cloneTarget = new Object();
        forEach(Object.keys(target), (key, index) => {
          cloneTarget[key] = clone(target[key], map);
        })
    }

    return cloneTarget;
}

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function toRawType (value) {
  let _toString = Object.prototype.toString;
  let str = _toString.call(value)
  return str.slice(8, -1)
}



// test 
const map = new Map();
map.set('key', 'value');

const set = new Set();
set.add('value1');
set.add('value2');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
};


const result = clone(target);

console.log(result);
console.log(result.map === target.map);
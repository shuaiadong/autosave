function isArray (o = []) {
    return o.slice && Array.isArray(o.slice());
}
function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

function flattenDeep(ele = []) {
    if( isObject(ele)) {
        return flattenDeepObj(ele)
    }
    if(isArray(ele)) {
        return flattenDeepArr(ele)
    }
    if(!ele) { // undefined null
        return ele
    }
   
}

function flattenDeepArr (arr = []) {
    return arr.map((ele, index) => {
        if(isArray(arr[index]) || isObject(arr[index])) {
            return flattenDeep(arr[index])
        }
        return arr[index]
    })
}

function flattenDeepObj (ele = {}) {
    return Object.keys(ele).map(key => {
        if(isArray(ele[key]) || isObject(ele[key])) {
            return flattenDeep(ele[key])
        }
        return ele[key]
    })
}
// console.log(flattenDeep({a: [1, 2, 3], b: '1'}))
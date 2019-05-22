import {reaction, action, observable} from 'mobx';

export default class Store {
    key = 'app'
    saveData = observable({
        textVal: '1'
    })
    beforeFlag = observable.box(false)

    // upData = action((data = {}) =>  {
    //     this.textVal = '1111111'
    // })

    setTextVal(val) {
        this.saveData.textVal = val
    }
}
export const _Utils_ = {
    addEvent: function(element, type, callback){
                if(element.addEventListener){
                    element.addEventListener(type, callback, false);
                }
                else if(element.attachEvent){
                    element.attachEvent('on' + type, callback);
                }
                else {
                    element['on' + type] = callback;
                }
        },
    removeEvent: function(element, type, callback){
            if(element.removeEventListener){
                element.removeEventListener(type, callback, false);
            }
            else if(element.detachEvent){
                element.detachEvent('on' + type, callback);
            }
            else {
                element['on' + type] = null;
            }
        },
    isFunc: function (func) {
        typeof func === 'function';
    }
};
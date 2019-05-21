
import debounce from 'lodash/debounce';
import utils from './utils';

/**
 * 1. 自动保存防抖
 * 2. 离开浏览器 | 刷新浏览器 - 选择取消时保存
 * 3. 组件卸载时保存
 */

// 返回值
/**
 *
 *  1.  debouncedSave
 *      - debouncedSave  | func
 *  2. 直接保存
 *      - save           | func
 *  3.  取消 debounced 
 *      - cancel         | func
 *  4. 清空
 *      - flush          | func   
 *  5. 退出
  *     - exit           | func
 * 
 */


class AutoSave {
    constructor(props) {
        this.debouncedSave = this.debouncedSave.bind(this);
        Object.assign(this.opts, props);
    }
    opts = {
        // 默认入参
              wait: 2000,                // 防抖时间
              onSave: null,              // 自动保存事件 传递过来
              onBeforeSave: null,        // 调用_save保存之前调用 return false 取消 保存
              saveMessage: '确定要离开吗？',
              leading: false,            // 超时前调用
              maxWait: 0,                // 延迟的最长时间
              trailing: true,            // 超时后调用
    }

    /**
     *  true > 可以绑定定时间  
     *  || 为了不重复绑定事件
     *  || 数据改变的识别
     */
    saved = true; 
    
    // 统一处理保存事
    async _save () {
        if(this.saved || !this.opts.onSave) {
            return ;
        }
        if(this.opts.onBeforeSave && this.opts.onBeforeSave(...arguments) === false) {
            return ;
        }
        await this.opts.onSave(...arguments);
        this.removeBeforunload();

    }

    // 私有防抖的_save
    _debouncedSave = debounce(this._save, this.opts.wait || 200, {}, {
        leading : this.opts.leading,
        maxWait : this.opts.maxWait,
        trailing: this.opts.trailing
        // lodash 参数
    });

    // 暴露的 onSave 调用方法
    debouncedSave () {
        this.saved && this.addBeforunload();
        this._debouncedSave(...arguments);
    }
    // 直接保存
    save () {
        this.saved = false;
        this._save(...arguments);
    }
    // debounced 取消
    cancel = () => {
        this._debouncedSave.cancel()
    }
    // 清空
    flush = () => {
        this._debouncedSave.flush()
    }

    /**
     * window.unload | exit
     *  1. Beforeunload 处理
     *  2. 组件销毁时：路由切换页面时
     *  */
    addBeforunload () {
        if(typeof window === undefined) {return ;}
        utils.addEvent(window, 'beforeunload',this.saveBeforeClosing);
        this.saved = false;
    }

    removeBeforunload() {
        if(typeof window === undefined) {return ;}
        utils.removeEvent(window, 'beforeunload', this.saveBeforeClosing);
        this.saved = true;
    }

    saveBeforeClosing = (e) => {
        // todo this._save(); 问题 -> 不管点取消 确认都会执行 ->没给用户选择的机会 问题
        this._save && setTimeout(this._save, 100); // 关闭选择取消时保存
        return (e || window.event).returnValue = this.opts.saveMessage; // Gecko + IE
    }
    /**
     * 组件销毁 点击路由切换时调用
     * 直接调用保存
     *  */
    exit() {
        if(this.saved) {
            // 未绑定 beforeunload 数据没发生变化
            return ;
        }
        this._save();
    }
}


export default function autoSaveWrap (props) {
    return new AutoSave(props);
}
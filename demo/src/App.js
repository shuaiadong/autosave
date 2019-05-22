import React from 'react';
import {observer, inject} from 'mobx-react';
import Store from './appStore';
import autoSave from 'debounce-save';

import './App.css';

// @observer
// @inject(['store'])
const  App = observer(
class Apps extends React.Component{

  constructor(props) {
    super(props)
    this.postSave()
    this.local = new Store()
  }

  beforeSave() {
    return !!this.local.beforeFlag
  }

  // 1. 调用autosave
  autoSave = autoSave({
    wait: 3000,
    onSave: this.postSave,
    onBeforeSave: this.beforeSave
  })


  renderLog() {
    return <React.Fragment> 
    <pre>
      // 入参
      {`/**
      {
        // 默认参数
                 wait: 2000,                   // default 防抖时间
                 onSave: null,                 // 自动保存事件(ajax)
                 onBeforeSave: null,           // 调用onSave 之前调用 
                 saveMessage: '确定要离开吗？',   // 提示语
                 leading: false,               // 超时前调用
                 maxWait: 1,                   // 延迟的最长时间
                 trailing: true,               // 超时后调用
      }
      * 
      */`}
    </pre>
    <pre>
      // 返回值
      {`/**
      *
      *  1.  debouncedSave
      *      - debouncedSave  | func
      * 
      *  2. 直接保存
      *      - save           | func
      * 
      *  3.  取消 debounced 
      *      - cancel         | func
      * 
      *  4. 清空
      *      - flush          | func   
      * 
      *  5. 退出 （组件卸载时）会直接调用保存接口
      *      - exit           | func
      * 
      * 
      */`}
    </pre>
    </React.Fragment>

  }
  postSave = async () => {
    const {status, data} = await this.http.get('/save', {
      data: {
        // data: this.local.saveData.textVal
      }
    })
  }

  componentWillUnmount() {
    console.log('组件卸载时直接调用')
    this.autoSave && this.autoSave.exit()
  }

  render () {
    return (
      <div className="App">
         {this.renderLog()}
          <button> 直接保存(save) </button><span>直接保存后之前的debouncedSave也不会触发</span>
          <br/>
          <br/>
          <button> debouncedSave (延时保存)</button>
          <br/>
          <br/>
          <button> 取消 debounced (cancel) </button>
          <br/>
          <br/>
          <button>exit</button><br/>

          <textarea 
          value={this.local.saveData.textVal} 
          onChange={({target: {value}}) => {
            this.local.setTextVal(value)
          }
        }
          ></textarea>
      </div>
    );
  }
});

export default  App;
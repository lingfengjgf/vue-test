// 1、实现Store类
// 2、实现install方法
class Store {
  constructor(options){
    this.$options = options;

    const computed = {};
    this.getters = {};
    const store = this;
  
    if(options.getters){
      Object.keys(options.getters).forEach(key=>{
        // 将用户传入的getters转换为computed可以使用的函数
        const fn = options.getters[key];
        computed[key] = function(){
          return fn(store.state)
        }

        // 定义只读属性
        Object.defineProperty(store.getters,key,{
          get:()=>{
            return store._vm[key]
          }
        })
      })

    }
    // 让用户传入的state变成响应式的
    this._vm = new Vue({
      data(){
        return {
          // 不希望$$state被代理
          $$state:options.state
        }
      },
      computed
    })

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get state(){
    return this._vm._data.$$state;
  }

  set state(v){
    console.error('请使用replaceState修改状态');
  }

  commit(type,payload){
    const entry = this.$options.mutations[type];
    entry&&entry(this.state,payload)
  }

  dispatch(type,payload){
    const entry = this.$options.actions[type];
    entry&&entry(this,payload)
  }  
}

let Vue;

function install(_Vue){
  Vue = _Vue;

  // 注册$store
  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出的对象是Vuex
export default {Store, install}
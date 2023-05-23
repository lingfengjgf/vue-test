import { reactive } from "vue";

export function createStore(options) {
  // 创建store实例
  const store = {
    _state: reactive(options.state()),
    get state() {
      return this._state;
    },
    set state(v) {
      console.error("please use replaceState() to reset state");
    },
    _mutations: options.mutations,
    _actions: options.actions,
  };

  // 实现install方法
  store.install = function (app) {
    const store = this;

    app.config.globalProperties.$store = store;
  };

  // commit实现
  const commit = function (type, payload) {
    // 获取用户设置的type对应的mutation
    const entry = this._mutations[type];
    if (!entry) {
      console.error(`unknow mutation type: ${type}`);
      return;
    }
    entry.call(this.state, this.state, payload);
  };
  store.commit = commit.bind(store);

  // dispatch实现
  const dispatch = function (type, payload) {
    // 获取用户设置的type对应的action
    const entry = this._actions[type];
    if (!entry) {
      console.error(`unknow action type: ${type}`);
      return;
    }
    entry.call(this, this, payload);
  };
  store.dispatch = dispatch.bind(store);

  return store;
}

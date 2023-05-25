import { computed, reactive, watch } from "vue";

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
    _getters: options.getters,
    _commit: false,
    _withCommit(fn) {
      this._commit = true;
      fn();
      this._commit = false;
    },
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
    this._withCommit(() => {
      entry.call(this.state, this.state, payload);
    });
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

  // getters实现
  const getters = {};
  Object.keys(store._getters).forEach((key) => {
    // 定义计算属性
    const result = computed(() => {
      const getter = store._getters[key];
      if (getter) {
        return getter.call(store, store.state);
      } else {
        console.error(`unknow getter type: ${key}`);
        return "";
      }
    });
    // 动态定义store.getters.xxx，值是用户定义函数的返回值
    Object.defineProperty(getters, key, {
      // 只读
      get() {
        return result;
      },
    });
  });
  store.getters = getters;

  // strict模式实现
  if (options.strict) {
    watch(
      store.state,
      () => {
        if (!store._commit) {
          console.warn("please use commit to mutate state!");
        }
      },
      {
        deep: true,
        flush: "sync",
      }
    );
  }

  return store;
}

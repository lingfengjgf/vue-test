// 接收一个需要响应式处理的对象，返回一个代理对象
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      return Reflect.set(target, key, value);
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key);
    },
  });
}

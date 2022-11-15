// observer desgin pattern..
export const createEmitter = () => {
  const subscriptions = new Map();
  return {
    emit: (v: any) => subscriptions.forEach((fn) => fn(v)),
    subscribe: (fn: any) => {
      const key = Symbol();
      subscriptions.set(key, fn);
      return () => subscriptions.delete(key);
    },
  };
};

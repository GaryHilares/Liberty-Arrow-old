function getUniqueIdHandler() {
  const prefix = `${Date.now()}-${Math.random()}`;
  const get = (suffix) => {
    return `${prefix}-${suffix}`;
  }
  return {get: get};
};

function compose(a, b) {
  return function (c) {
    return a(b(c));
  };
}
const deepCopy = compose(JSON.parse, JSON.stringify);

const Utils = {
  deepCopy,
  getUniqueIdHandler
};

export default Utils;
export { deepCopy, getUniqueIdHandler };
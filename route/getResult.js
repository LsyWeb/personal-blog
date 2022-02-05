exports.getResult = function (result, msg) {
  const res = {
    code: 0,
    msg: msg ? msg : '',
    data: result ? result : null
  };
  return res;
}
exports.getErr = function (msg, code) {
  const res = {
    code,
    msg
  }
  return res;
}
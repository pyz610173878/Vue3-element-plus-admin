/**
 * @param {string} path
 * @returns {Boolean}
 */

/**
 * @param {string} str
 * @returns {Boolean}
 */

// 校验邮箱
export function validate_email(value) {
  let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return regEmail.test(value)
}

// 校验密码
export function validate_password(value){
  // 
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value);
}

// 密码校验

export function checkPassword(rule, value, callback, source, options) {
  if(!value || value === ""){
      callback(new Error("请输入用密码"));
  }else if(!validate_password(value)) {
      callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
  } else {
      callback();
  }
}

// 用户名校验
export function checkUser(rule, value, callback, source, options) {
  if(!value || value === ""){
      callback(new Error("请输入用户名"));
  }else if(!validate_email(value)) {
      callback(new Error("邮箱格式不正确"));
  } else {
      callback();
  }
}

// 校验验证码
export function validate_code(value){
  let regCode = /^[a-z0-9]{6}$/;
  return regCode.test(value);
}
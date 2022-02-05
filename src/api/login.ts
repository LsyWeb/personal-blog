import { loginInfo } from '@/types/loginType';
/**
 * 登录
 * @param account 账号
 * @param password 密码
 * @returns
 */
export async function login({
  account,
  password,
}: loginInfo): Promise<any> {
  if (account === 'liushuaiyang' && password === 'lsy090017') {
    return {
      code: 0,
      msg: '登录成功',
      data: {
        account,
        role: '超级管理员',
      }
    };
  } else {
    return {
      code: 1,
      msg: '账号密码错误',
      data: null,
    };
  }
}

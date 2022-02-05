import { login as loginUserInfo } from '@/api/login';
import { dataType } from '@/types/apiDataType';
const storageKey = 'lsy-blog-admin-userInfo';
export default {
  namespace: 'userInfo',
  state: null,
  subscriptions: {
    whoAmI({ dispatch }: any) {
      const userInfo = localStorage.getItem(storageKey);
      if (userInfo) {
        dispatch({ type: 'setUserInfo', payload: JSON.parse(userInfo) });
      }
    },
  },
  reducers: {
    setUserInfo(state: any, { payload }: any): any {
      return payload;
    },
  },
  effects: {
    *login({ payload }: any, { put, call }: any) {
      const res: dataType = yield call(loginUserInfo, payload);
      if (res.data) {
        localStorage.setItem(storageKey, JSON.stringify(res.data));
        yield put({ type: 'setUserInfo', payload: res.data });
      }
      return res as dataType;
    },
    *loginOut({ payload }: any, { put, call }: any) {
      localStorage.removeItem(storageKey);
      yield put({ type: 'setUserInfo', payload: null });
    },
  },
};

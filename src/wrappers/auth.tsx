import { Redirect, useStore } from 'umi'

export default (props:any) => {
  const state = useStore().getState();
  if (state.userInfo) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="/login" />;
  }
}
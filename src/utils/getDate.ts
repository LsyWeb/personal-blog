export default function getDate(time:string|number){
  const Time = new Date(time);
  const year = Time.getFullYear();
  const month = Time.getMonth() + 1;
  const day = Time.getDate();
  const hour = Time.getHours() < 10 ? '0' + Time.getHours(): Time.getHours();
  const min = Time.getMinutes() < 10 ? '0' + Time.getMinutes(): Time.getMinutes();
  const second = Time.getSeconds() < 10 ? '0' + Time.getSeconds(): Time.getSeconds();
  let result = `${year}年${month}月${day}日 ${hour}:${min}:${second}`;
  return result;
} 
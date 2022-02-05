import '@/styles/atom-one-dark.css'
import hljs from 'highlightjs'
export default function (el){
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
}
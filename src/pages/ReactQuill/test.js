

function a (arr) {
  arr[0]=arr[2]
  console.log('arr:',arr)
}
function b (c,d,e) {
  console.log(c,d,e)
  e=10
  console.log(arguments)
  a(arguments)
  return c+d+e
}
const res = b(1,1,1)

console.log('res:',res)
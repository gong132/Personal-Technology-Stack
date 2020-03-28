const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log('监听到请求了')
  // console.log('res',res)
  res.end(JSON.stringify({data:'hello'}))
})

server.listen(3000, () => console.log('3000端口已启动...'))
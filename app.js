var restify = require('restify');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/echo2/:name', function (req, res, next) {
  if(req.params.name == 'crashme') {	  
	  console.log("pre crash..");
	  res.send("crashing btg application");
	  process.exit(1); 
  } else {
	res.send(req.params);
    return next();  
  }
});

var port_no = process.env.PORT || 5000 ;
server.listen(port_no, function () {
  console.log('%s listening at %s', server.name, server.url);
});
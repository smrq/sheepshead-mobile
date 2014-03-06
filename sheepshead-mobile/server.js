var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');
var connectLivereload = require('connect-livereload');

var BUILD_FOLDER = "phonegap-build/www";

var proxy = httpProxy.createProxyServer({});
var app = express();
//app.use(connectLivereload());
app.get('/phonegap.js', function (req, res) { res.sendfile('./bower_components/phonegap-desktop/js/phonegap-desktop.js'); });
app.get('/debugdata.json', function (req, res) { res.sendfile('./bower_components/phonegap-desktop/debugdata.json'); });
app.get('/remote.js', function (req, res) { res.sendfile('./proxyRemote.js'); });
app.all('/sheepshead.cgi', function (req, res) {
	proxy.web(req, res, { target: 'http://sheepshead.overmangroup.com:80' });
});
app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

module.exports = app;
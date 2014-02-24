(function (global) {
	var remotes = {
		'sheepshead.cgi': 'http://sheepshead.overmangroup.com/sheepshead.cgi'
	};
	global.remote = function (url) {
		return remotes[url];
	};
	global.inBrowser = false;
})(window);

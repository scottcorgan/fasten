var Fasten=function(a){var b=this,c="http://api.fasten.io",d="http://js.pusher.com/2.1/pusher.min.js",e="c9e8f9099ff0d687f7b8";this._endpoint=a.replace(/\//,"_"),this._hookCallbacks=[],this._load(d,function(){Pusher.log=function(a){window.console&&window.console.log&&window.console.log(a)},b._pusher=new Pusher(e,{authEndpoint:c+"/pusher/auth"}),b._channel=b._pusher.subscribe("private-"+b._endpoint),b._listenForHooks()})};Fasten.prototype.hook=function(a){a&&this._hookCallbacks.push(a)},Fasten.prototype._listenForHooks=function(){var a=this;this._channel.bind("hooked",function(b){a._hookCallbacks.forEach(function(a){"function"==typeof a&&a(b)})})},Fasten.connect=function(a){return new Fasten(a)},Fasten.prototype._load=function(a,b){var c=document.createElement("script");c.src=a,c.async=!0,c.onreadystatechange=c.onload=function(){var a=c.readyState;b.done||a&&!/loaded|complete/.test(a)||(b.done=!0,b())},document.getElementsByTagName("head")[0].appendChild(c)};
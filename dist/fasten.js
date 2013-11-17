/*
 AngularJS v1.2.1
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(v,c,B){'use strict';function y(t,q,l,b,f){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(k,A,n,C,x){function w(){g&&(g.$destroy(),g=null);p&&(f.leave(p),p=null)}function d(){var a=t.current&&t.current.locals,e=a&&a.$template;if(e){var z=k.$new();x(z,function(u){u.html(e);f.enter(u,null,p||A,function(){!c.isDefined(r)||r&&!k.$eval(r)||q()});w();var h=l(u.contents()),m=t.current;g=m.scope=z;p=u;if(m.controller){a.$scope=g;var d=b(m.controller,a);m.controllerAs&&
(g[m.controllerAs]=d);u.data("$ngControllerController",d);u.children().data("$ngControllerController",d)}h(g);g.$emit("$viewContentLoaded");g.$eval(s)})}else w()}var g,p,r=n.autoscroll,s=n.onload||"";k.$on("$routeChangeSuccess",d);d()}}}v=c.module("ngRoute",["ng"]).provider("$route",function(){function t(b,f){return c.extend(new (c.extend(function(){},{prototype:b})),f)}function q(b,c){var k=c.caseInsensitiveMatch,l={originalPath:b,regexp:b},n=l.keys=[];b=b.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,
function(b,c,f,d){b="?"===d?d:null;d="*"===d?d:null;n.push({name:f,optional:!!b});c=c||"";return""+(b?"":c)+"(?:"+(b?c:"")+(d&&"(.+?)"||"([^/]+)")+(b||"")+")"+(b||"")}).replace(/([\/$\*])/g,"\\$1");l.regexp=RegExp("^"+b+"$",k?"i":"");return l}var l={};this.when=function(b,f){l[b]=c.extend({reloadOnSearch:!0},f,b&&q(b,f));if(b){var k="/"==b[b.length-1]?b.substr(0,b.length-1):b+"/";l[k]=c.extend({redirectTo:b},q(k,f))}return this};this.otherwise=function(b){this.when(null,b);return this};this.$get=
["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(b,f,k,q,n,v,x,w){function d(){var a=g(),e=s.current;if(a&&e&&a.$$route===e.$$route&&c.equals(a.pathParams,e.pathParams)&&!a.reloadOnSearch&&!r)e.params=a.params,c.copy(e.params,k),b.$broadcast("$routeUpdate",e);else if(a||e)r=!1,b.$broadcast("$routeChangeStart",a,e),(s.current=a)&&a.redirectTo&&(c.isString(a.redirectTo)?f.path(p(a.redirectTo,a.params)).search(a.params).replace():f.url(a.redirectTo(a.pathParams,
f.path(),f.search())).replace()),q.when(a).then(function(){if(a){var b=c.extend({},a.resolve),e,h;c.forEach(b,function(a,e){b[e]=c.isString(a)?n.get(a):n.invoke(a)});c.isDefined(e=a.template)?c.isFunction(e)&&(e=e(a.params)):c.isDefined(h=a.templateUrl)&&(c.isFunction(h)&&(h=h(a.params)),h=w.getTrustedResourceUrl(h),c.isDefined(h)&&(a.loadedTemplateUrl=h,e=v.get(h,{cache:x}).then(function(a){return a.data})));c.isDefined(e)&&(b.$template=e);return q.all(b)}}).then(function(f){a==s.current&&(a&&(a.locals=
f,c.copy(a.params,k)),b.$broadcast("$routeChangeSuccess",a,e))},function(c){a==s.current&&b.$broadcast("$routeChangeError",a,e,c)})}function g(){var a,b;c.forEach(l,function(d,l){var h;if(h=!b){var m=f.path();h=d.keys;var k={};if(d.regexp)if(m=d.regexp.exec(m)){for(var g=1,q=m.length;g<q;++g){var n=h[g-1],p="string"==typeof m[g]?decodeURIComponent(m[g]):m[g];n&&p&&(k[n.name]=p)}h=k}else h=null;else h=null;h=a=h}h&&(b=t(d,{params:c.extend({},f.search(),a),pathParams:a}),b.$$route=d)});return b||l[null]&&
t(l[null],{params:{},pathParams:{}})}function p(a,b){var d=[];c.forEach((a||"").split(":"),function(a,c){if(0===c)d.push(a);else{var f=a.match(/(\w+)(.*)/),g=f[1];d.push(b[g]);d.push(f[2]||"");delete b[g]}});return d.join("")}var r=!1,s={routes:l,reload:function(){r=!0;b.$evalAsync(d)}};b.$on("$locationChangeSuccess",d);return s}]});v.provider("$routeParams",function(){this.$get=function(){return{}}});v.directive("ngView",y);y.$inject=["$route","$anchorScroll","$compile","$controller","$animate"]})(window,
window.angular);
//# sourceMappingURL=angular-route.min.js.map

;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (Http, $http) {
  Http.prototype._request = function (options, callback) {
    options.data = options.data || options.form;
    
    $http(options)
      .success(function (data) {
        var body = data.self || data;
        callback(null, body, body);
      }).error(function (err) {
        callback(err);
      });
  };
};
},{}],2:[function(require,module,exports){
module.exports = function (Http, $rootScope, $q) {
  Http.prototype._promiseWrap = function (callback) {
    var d = $q.defer();
    
    callback(function (data) {
      $rootScope.narratorApply(function () {
        d.resolve(data);
      });
    }, function (err) {
      $rootScope.narratorApply(function () {
        d.reject(err);
      });
    });
    
    return d.promise;
  };
};
},{}],3:[function(require,module,exports){
angular.module('narrator', [])
  .provider('narrator', function () {
    
    var Narrator = require('../narrator');
    var Http = require('../http');
    var asQ = require('./asQ');
    var asHttp = require('./asHttp');
    
    return {
      _options: {},
      
      configure: function (options) {
        this._options = options;
      },
      
      $get: function ($rootScope, $q, $http) {
        $rootScope.narratorApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };
        
        asQ(Http, $rootScope, $q);
        asHttp(Http, $http);
        return new Narrator(this._options);
      }
    };
  });
},{"../http":7,"../narrator":8,"./asHttp":1,"./asQ":2}],4:[function(require,module,exports){
var defaults = require('./helpers/defaults');
var extend = require('extend');
var urljoin = require('url-join');
var Http = require('./http');

var Endpoint = module.exports = function (options) {
  this.hooks = {
    pre: function (next) { next(); }
  };
  
  this.options = {
    host: '',
    path: '',
    headers: {},
    _endpoints: {}
  };
  
  if(!options) {
    options = {};
  }
  
  if (!options.userDefined) {
    options.userDefined = {};
  }
  
  defaults(options.userDefined.hooks, this.hooks);
  extend(this.options, options);
  extend(this, options.userDefined);
  
  this.http = new Http({
    context: this,
    headers: this.options.headers,
    hooks: this.hooks
  });
};

// Placed here because of circular dependency stuff
var Entity = require('./entity');

// TODO: make this endpoint work too
// Placed here because of circular dependency stuff
// var Narrator = require('./narrator');

// Endpoint.prototype.endpoint = function (path, customMethods) {
//     var api = new Narrator({
//       host: this.url(),
//       headers: this.options.headers,
//       _endpoints: this.options._endpoints
//     });
    
//     return api.endpoint(path, customMethods);
// };

Endpoint.prototype.url = function () {
  return urljoin(this.options.host, this.options.path);
};

Endpoint.prototype.one = function (id, userDefined) {
  var entity = new Entity({
    _endpoints: this.options._endpoints,
    host: this.options.host,
    path: urljoin('/', this.options.path),
    headers: this.options.headers,
    userDefined: userDefined || {},
    id: id,
    api: this.options.api
  });
  
  return entity;
};

Endpoint.prototype.list = function (callback) {
  return this.http.request(this.url(), 'GET', function (err, response, list) {
    if (callback) callback(err, list);
  });
};

Endpoint.prototype.create = function (payload, callback) {
  var requestBody = {
    form: payload
  };
  
  return this.http.request(this.url(), 'POST', requestBody, function (err, response, body) {
    if (callback) callback(err, body);
  });
};

Endpoint.prototype.getEndpoint = function (path, id) {
  var pathKey = (id) ? path + id : path;
  return this.options._endpoints[pathKey];
};

},{"./entity":5,"./helpers/defaults":6,"./http":7,"extend":11,"url-join":12}],5:[function(require,module,exports){
var Http = require('./http');
var urljoin = require('url-join');
var defaults = require('./helpers/defaults');
var extend = require('extend');

var Entity = module.exports = function (options) {
  this.hooks = {
    pre: function (next) { next(); }
  };
  
  this.options = {
    host: '',
    path: '',
    headers: {},
    id: 0,
    _endpoints: {}
  };
  
  if(!options) {
    options = {};
  }
  
  if (!options.userDefined) {
    options.userDefined = {};
  }
  
  defaults(options.userDefined.hooks, this.hooks);
  
  extend(this.options, options);
  extend(this, options.userDefined);
  
  this.http = new Http({
    context: this,
    headers: this.options.headers,
    hooks: this.hooks
  });
};

// Placed here because of circular dependency stuff
var Narrator = require('./narrator');

Entity.prototype.endpoint = function (path, customMethods) {
  var api = new Narrator({
    id: this.options.id,
    host: this.url(),
    headers: this.options.headers,
    _endpoints: this.options._endpoints
  });
  return api.endpoint(path, customMethods);
};

Entity.prototype.url = function () {
  return urljoin(this.options.host, this.options.path, this.options.id);
};

Entity.prototype.get = function (callback) {
  return this.http.request(this.url(), 'GET', function (err, response, data) {
    if (callback) callback(err, data);
  });
};

Entity.prototype.update = function (payload, callback) {
  var requestBody = {
    form: payload
  };
  
  return this.http.request(this.url(), 'PUT', requestBody, function (err, response, body) {
    if (callback) callback(err, body);
  });
};

Entity.prototype.remove = function (callback) {
  return this.http.request(this.url(), 'DELETE', function (err, response, body) {
    if (callback) callback(err, body);
  });
};

Entity.prototype.getEndpoint = function (path, id) {
  var pathKey = (id) ? path + id : path;
  return this.options._endpoints[pathKey];
};

},{"./helpers/defaults":6,"./http":7,"./narrator":8,"extend":11,"url-join":12}],6:[function(require,module,exports){
module.exports = function(options, defaults) {
  options = options || {};

  Object.keys(defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key];
    }
  });

  return options;
};
},{}],7:[function(require,module,exports){
var process=require("__browserify_process");var extend = require('extend');
var defaults = require('./helpers/defaults');
var request = require('request');
var Promise = require('promise');

var Http = module.exports = function (options) {
  this.options = {
    headers: {},
    hooks: {},
    context: {}
  };
  
  extend(this.options, options);
  
  // Be sure we have a promise
  if (hasPromise(this)) {
    this.promise = this.options.context.options.api.promise;
  }
  else {
    this.promise = function (callback) {
      return new Promise(callback);
    };
  }
  
  function hasPromise (obj) {
    return obj.options.context.options && obj.options.context.options.api && obj.options.context.options.api.promise;
  }
};

Http.prototype.setHeaders = function (headers) {
  this.options.headers = headers;
};

Http.prototype.setHeader = function (key, value) {
  this.options.headers[key] = value;
};

Http.prototype.removeHeader = function (key) {
  delete this.options.headers[key];
};

Http.prototype._parseJSON = function (data) {
  try {
    data = JSON.parse(data);
  }
  catch (e) {}
  finally {
    return data;
  }
};

Http.prototype._promiseWrap = function (callback) {
  return new Promise(callback);
};

Http.prototype._request = request;

Http.prototype._http = function (path, method, options, callback) {
  var self = this;
  
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  
  if (typeof callback === 'undefined') {
    callback = function () {};
  }
  
  var requestOptions = {
    url: path,
    method: method
  };
  
  requestOptions = defaults(options, requestOptions);
  return this._promiseWrap(function (resolve, reject) {
    self._request(requestOptions, function (err, response, body) {
      var responseBody = self._parseJSON(body);
      
      if (err) {
        reject(err);
      }
      else{
        resolve(responseBody);
      }
      
      callback(err, response, responseBody);
    });
  });
};

Http.prototype.request = function (path, method, options, callback) {
  var self = this;
  
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  
  var httpOptions = {};
  var httpRequest = {};
  
  extend(httpOptions, {
    headers: this.options.headers
  }, options);
  
  extend(httpRequest, httpOptions, {
    path: path,
    method: method
  });
  
  return this._promiseWrap(function (resolve, reject) {
    // TODO: pass current api context (api, users, etc)
    process.nextTick(function () {
      var preHook = (self.options.hooks && self.options.hooks.pre) ? self.options.hooks.pre : function (next) { next(); };
      
      preHook.call(self.options.context, function () {
        self._http(path, method, httpOptions, callback).then(resolve, reject);
      });
    });
  });
};
},{"./helpers/defaults":6,"__browserify_process":10,"extend":11,"promise":9,"request":9}],8:[function(require,module,exports){
var extend = require('extend');
var urljoin = require('url-join');
var Promise = require('promise');

var Narrator = module.exports = function (options) {
  options = options || {};
  
  this._endpoints = {};
  this.host = '/';
  
  extend(this, options);
};

Narrator.Http = require('./http');

// Placed here because of circular dependency stuff
var Endpoint = require('./endpoint');

Narrator.prototype.endpoint = function (path, userDefined) {
  var pathKey = (this.id) ? path + this.id : path;
  
  if(!(pathKey in this._endpoints)) {
    var endpoint = new Endpoint({
      host: this.host,
      path: urljoin('/', path),
      headers: this.headers,
      userDefined: userDefined || {},
      _endpoints: this._endpoints,
      api: this
    });
    
    this._endpoints[pathKey] = endpoint;
  }
  
  return this._endpoints[pathKey];
};

},{"./endpoint":4,"./http":7,"extend":11,"promise":9,"url-join":12}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],11:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
  if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
    return false;

  var has_own_constructor = hasOwn.call(obj, 'constructor');
  var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
    return false;

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for ( key in obj ) {}

  return key === undefined || hasOwn.call( obj, key );
};

module.exports = function extend() {
  var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && typeof target !== "function") {
    target = {};
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

},{}],12:[function(require,module,exports){
function normalize (str) {
  return str
          .replace(/[\/]+/g, '/')
          .replace(/\/\?/g, '?')
          .replace(/\/\#/g, '#')
          .replace(/\:\//g, '://');
}

module.exports = function () {
  var joined = [].slice.call(arguments, 0).join('/');
  return normalize(joined);
};
},{}]},{},[3])
;
var fastenRef = new Firebase('https://fasten.firebaseio.com');
angular.module('Fasten', ['ngRoute', 'narrator']);
angular.module('Fasten')
  .factory('api', function (narrator) {
    var api = {
      hooks: narrator.endpoint('hooks')
    };
    
    return api;
  });
angular.module('Fasten')
  .factory('hooks', function ($q, api) {
    var _allHooks = [];
    var hooks = api.hooks;
    
    hooks.all = function (refresh) {
      var d = $q.defer();
      
      if (_allHooks.length > 0 && !refresh) {
        d.resolve(_allHooks);
      }
      else{
        hooks.list().then(function (hooks) {
          _allHooks = hooks;
          d.resolve(_allHooks);
        });
      }
      
      
      return d.promise;
    }
    
    return hooks;
  });
angular.module('Fasten')
  .factory('User', function ($q, narrator, $location, $rootScope) {
    var _user;
    var scope = $rootScope.$new();
    
    var User = {
      get: function () {
        return _user;
      },
      
      set: function (user) {
        _user = user;
      },
      
      getEmail: function () {
        return _user.email.replace('.', 'dot');
      },
      
      whenLoggedIn: function () {
        var d = $q.defer();
        
        User.auth = new FirebaseSimpleLogin(fastenRef, function(err, user) {
          if (err) return console.error('error logging in');
          if (!user) return $location.path('/login');
          
          narrator.headers = {
            authorization: user.firebaseAuthToken
          };
          
          $rootScope._user = user;
          
          d.resolve(user);
        });
        
        return d.promise;
      },
      
      login: function (email, password) {
        var promise = User.whenLoggedIn();
        
        User.auth.login('password', {
          email: email,
          password: password
        });
        
        return promise;
      },
      
      logout: function () {
        User.auth.logout();
        User.set(null);
        $location.path('/login');
      }
    };
    
    return User;
  });
angular.module('Fasten')
  .config(function ($routeProvider, $locationProvider, narratorProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/hooks', {
        templateUrl: '/templates/hooks.html',
        resolve: {
          user: authenciateUser
        }
      })
      .when('/hooks/:endpoint*', {
        templateUrl: '/templates/hook.html'
      })
      .when('/login', {
        templateUrl: '/templates/login.html'
      })
      .when('/settings', {
        templateUrl: '/templates/settings.html'
      })
      .otherwise({
        redirectTo: '/hooks'
      });
    
    narratorProvider.configure({
      host: 'http://localhost:4000',
    });
    
    function authenciateUser ($q, User) {
      if (User.get()) {
        var d = $q.defer();
        d.resolve(User.get());
        return d.promise;
      }
      
      return User.whenLoggedIn();
    }
  });
angular.module('Fasten')
  .controller('AppCtrl', function ($scope, $rootScope, User, $location) {
    $scope.User = User;
    
  });
angular.module('Fasten')
  .controller('HookCtrl', function ($scope, $routeParams) {
    $scope.endpoint = $routeParams.endpoint;
  });
angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, User, $timeout, api, hooks, $rootScope) {
    User.set($rootScope._user);
    
    $scope.User = User;
    $scope.hooks = [];
    
    var userWatcher = $scope.$watch(User.get, function (user) {
      if (!user) return;
      
      userWatcher();
      
      hooks.all().then(function (hooks) {
        $scope.hooks = hooks;
      });
    });

    $scope.createHook = function () {
      var domains = _.map($scope.newHookDomain.split(','), function (domain) {
        return domain.replace(/ /g, '');
      });
      
      var hook = {
        title: $scope.newHookTitle,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      };
      
      hooks.create(hook).then(function (hook) {
        $scope.hooks.push(hook);
        $scope.resetNewHookValues();
        $scope.showHookComposer = false;
      });
    };
    
    $scope.removeHook = function (hook) {
      if (!confirm('Are you sure you want to delete this?')) return;
      
      hooks.one(hook.endpoint).remove().then(function () {
        var idx = $scope.hooks.indexOf(hook);
        $scope.hooks.splice(idx, 1);
      });
    };
    
    $scope.resetNewHookValues = function () {
      $scope.newHookTitle = null;
      $scope.newHookEndpoint = null;
      $scope.newHookDomain = null;
    };
    
  });
angular.module('Fasten')
  .controller('LoginCtrl', function ($scope, $rootScope, $timeout, User, $location) {
    $scope.data = [];
    $scope.User = User;
    $scope.loading = false;
    
    $scope.login = function () {
      $scope.loading = true;
      User.login($scope.email, $scope.password).then(function () {
        $scope.loadig = false;
        $location.path('/');
      });
    };
    
    $scope.signup = function () {
      $rootScope.auth.createUser($scope.email, $scope.password, function (err, user) {
        $timeout(function () {
          if (err) $scope.formError = err.message; return;
          
          $scope.User.set(user);
          $scope.resetForm();
        });
        
      });
    };
    
    $scope.resetForm = function () {
      $scope.email = null;
      $scope.password = null;
      $scope.data = [];
    };
  });
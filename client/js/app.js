/* register the modules the application depends upon here*/
//angular.module('events', []);
angular.module('users', []);

/* register the application and inject all the necessary dependencies */
//var app = angular.module('directoryApp', ['events']);
var app = angular.module('directoryApp', ['users']);
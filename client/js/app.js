/* register the modules the application depends upon here*/
angular.module('events', []);
angular.module('users', []);

/* register the application and inject all the necessary dependencies */
var app_events = angular.module('appEvents', ['events']);
var app_users = angular.module('appUsers', ['users']);
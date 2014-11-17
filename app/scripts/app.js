'use strict';

var ip = '192.168.70.144';

angular
    .module('ccapApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'vxWamp',
        'highcharts-ng'
    ])
    .config(function($wampProvider) {
        $wampProvider.init({
            url: 'ws://' + ip + ':9000/',
            realm: 'ccap-v1'
        });
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/visitors.html',
                controller: 'VisitorsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($wamp){
        $wamp.open();
    });
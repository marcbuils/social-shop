(function (angular) {
	"use strict";

	angular.module('socialShopApp', ['ui.bootstrap']).config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
}(this.angular));
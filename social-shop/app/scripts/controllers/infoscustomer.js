(function(angular) {
	"use strict";

	angular.module("socialShopApp").controller("InfosCustomer", function($scope, $serviceCustomer) {
		$scope.serviceCustomer = $serviceCustomer;
	});
}(this.angular));
(function (angular) {
	"use strict";
	
	angular.module('socialShopApp').controller('SearchCustomer', function ($scope, $serviceCustomer) {
		$scope.serviceCustomer = $serviceCustomer;
		$scope.opts = {
			backdropFade: true,
			dialogFade:true
		};
		
		$scope.search = function () {
			$serviceCustomer.search($scope.customer);
			$scope.customer = '';
		};
		
		$scope.selectCustomer = function (customer) {
			$serviceCustomer.selectCustomer(customer.id);
		};
		
		$scope.close = function () {
			$serviceCustomer.resetSearch();
		};
	});
}(this.angular));
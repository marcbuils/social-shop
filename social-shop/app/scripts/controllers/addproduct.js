(function(angular) {
	"use strict";

	angular.module("socialShopApp").controller("AddProduct", function($scope) {
		$scope.search = function() {
			if ($scope.product)
				alert($scope.product);
		};
	});
}(this.angular));
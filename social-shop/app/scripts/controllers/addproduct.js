(function(angular) {
	"use strict";

	angular.module("socialShopApp").controller("AddProduct", function($scope, $serviceProduct) {
		$scope.serviceProduct = $serviceProduct;
		$scope.opts = {
			backdropFade: true,
			dialogFade:true
		};
		
		$scope.search = function () {
			$serviceProduct.search($scope.product);
			$scope.product = '';
		};
		
		$scope.selectProduct = function (product) {
			$serviceProduct.selectProduct(product.id);
		};
		
		$scope.close = function () {
			$serviceProduct.resetSearch();
		};
	});
}(this.angular));
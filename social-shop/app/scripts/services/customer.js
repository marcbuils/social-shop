(function (angular) {
	"use strict";
	
	angular.module('socialShopApp').service('$serviceCustomer', function ($rootScope) {
		return {
			customers: [],
			
			customer: {},
			
			hasCustomers: false,
			
			search: function (_search) {
				var self = this; 
				
				$.ajax({
					method: 'GET',
					dataType : 'xml',
					url: 'http://172.16.159.128/prestashop/api/customers?display=full&filter[lastname]=%[' + _search  + ']%',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Authorization", "Basic " + 'TkpZMkFSS1E5RFo4WUowRFlFRVZGVllKRTczNjA5REE6');
					}
				})
				.done(function(_data) { 
					var data = new X2JS().xml2json(_data).prestashop;
					
					self.customers = [];
					_.each(data.customers.customer_asArray, function (customer) {
						this.customers.push({
							id: customer.id.toString(),
							firstname: customer.firstname.toString(),
							lastname: customer.lastname.toString()
						});
					}, self);
					
					self.hasCustomers = self.customers.length > 0;
					$rootScope.$apply();
				})
				.fail(function(error) { 
					alert('error: ' + error.statusText);
				});
			},
			
			selectCustomer: function (customer) {
				this.customer = _.findWhere(this.customers, { id: customer });
				this.resetSearch();
			},
			
			resetSearch: function () {
				this.customers = [];
				this.hasCustomers = false;
			}
		};
	});
}(this.angular));
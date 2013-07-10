(function (angular) {
	"use strict";
	
	angular.module('socialShopApp').service('$serviceCustomer', function ($rootScope) {
		return {
			customers: [],
			
			customer: {},
			
			hasCustomers: false,
			
			search: function (_search) {
				var self = this; 
				self.customers = [];
				
				$.ajax({
					method: 'GET',
					dataType : 'xml',
					url: 'http://192.168.1.49/prestashop/api/customers?display=full&filter[firstname]=%[' + _search + ']%',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Authorization", "Basic " + 'UllBWlo1UDhRVkdYRkQxS1E2ME5XM1VYN1NOQ084MFY6');
					}
				})
				.done(function(_data) { 
					var data = new X2JS().xml2json(_data).prestashop;
										
					_.each(data.customers.customer_asArray, function (customer) {
						self.customers.push({
							id: customer.id.toString(),
							firstname: customer.firstname.toString(),
							lastname: customer.lastname.toString(),
							email: customer.email.toString(),
							date_add: customer.date_add.toString()
						});
					}, self);
					
					$.ajax({
						method: 'GET',
						dataType : 'xml',
						url: 'http://192.168.1.49/prestashop/api/customers?display=full&filter[lastname]=%[' + _search + ']%',
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Authorization", "Basic " + 'UllBWlo1UDhRVkdYRkQxS1E2ME5XM1VYN1NOQ084MFY6');
						}
					})
					.done(function(_data) { 
						var data = new X2JS().xml2json(_data).prestashop;

						_.each(data.customers.customer_asArray, function (customer) {
							if (!_.findWhere(self.customers, { id: customer.id.toString() })) {
								self.customers.push({
									id: customer.id.toString(),
									firstname: customer.firstname.toString(),
									lastname: customer.lastname.toString(),
									email: customer.email.toString(),
									date_add: customer.date_add.toString()
								});
							}
						}, self);
						
						
						$.ajax({
							method: 'GET',
							dataType : 'xml',
							url: 'http://192.168.1.49/prestashop/api/customers?display=full&filter[id]=%[' + _search + ']%',
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic " + 'UllBWlo1UDhRVkdYRkQxS1E2ME5XM1VYN1NOQ084MFY6');
							}
						})
						.done(function(_data) { 
							var data = new X2JS().xml2json(_data).prestashop;

							_.each(data.customers.customer_asArray, function (customer) {
								if (!_.findWhere(self.customers, { id: customer.id.toString() })) {
									self.customers.push({
										id: customer.id.toString(),
										firstname: customer.firstname.toString(),
										lastname: customer.lastname.toString(),
										email: customer.email.toString(),
										date_add: customer.date_add.toString()
									});
								}
							}, self);
							
							if (self.customers.length > 1)
								self.hasCustomers = true;
							else if (self.customers.length == 1)
								self.selectCustomer(self.customers[0].id);
							else
								alert('Aucun résultat');
							
							$rootScope.$apply();
						})
						.fail(function(error) { 
							console.log(error);
							alert('error: ' + error.statusText);
						});
					})
					.fail(function(error) { 
						console.log(error);
						alert('error: ' + error.statusText);
					});
				})
				.fail(function(error) { 
					console.log(error);
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
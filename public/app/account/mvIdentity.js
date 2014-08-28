angular.module('app').factory('mvIdentity', function() {
	return {
		currentUer: undefined,
		isAuthenticated: function() {
			//console.log('called isAuthenticated: ')
			return !!this.currentUser;
		}
	}
})
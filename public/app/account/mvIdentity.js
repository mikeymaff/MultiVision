angular.module('app').factory('mvIdentity', function($window, mvUser) {
	var currentUser;
	if(!!$window.bootstrappedUserObject) {
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			//console.log('called isAuthenticated: ')
			return !!this.currentUser;
		},
		isAuthorized: function() {
			return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
		}
	}
})
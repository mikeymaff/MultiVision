var passport = require('passport');

exports.authenticate = function(req, res, next) {
	//console.log('login request made')
	req.body.userName = req.body.userName.toLowerCase();
	var auth = passport.authenticate('local', function(err, user) {
		//console.log('auth variable')
		if(err) {return next(err);}
		if(!user) {
			//console.log('user doesnt exist!')
			res.send({success:false})
		}

		// console.log('found user: ' + user)
		req.logIn(user, function(err) {

			if(err) {return next(err);}
			res.send({success:true, user:user});
		})
	})
	auth(req, res, next);
}

exports.requiresApiLogin = function(req, res, next) {
	if(!req.isAuthenticated()) {
		res.status(403);
		res.end();
	} else {
		next();
	}
}

exports.requiresRole = function(role) {
	return function(req, res, next) {
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
			res.status(403);
			res.end();
		} else {
			next();
		}
	}
}
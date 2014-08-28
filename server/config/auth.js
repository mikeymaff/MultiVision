var passport = require('passport');

exports.authenticate = function(req, res, next) {
	//console.log('login request made')
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
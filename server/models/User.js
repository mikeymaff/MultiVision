var mongoose	= require('mongoose'),
	encrypt		= require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {type:String, required:'{PATH} is required'},
	lastName: {type:String, required:'{PATH} is required'},
	userName: {
		type: String,
		required: '{PATH} is required',
		unique:true
	},
	salt: {type:String, required:'{PATH} is required'},
	hashed_pwd: {type:String, required:'{PATH} is required'},
	roles: [String]
});
userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) == this.hashed_pwd;
	}
}
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection) {
		if(collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'joe');
			User.create({firstName:'Joe', lastName:'Eames', userName:'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'john');
			User.create({firstName:'John', lastName:'Papa', userName:'john', salt: salt, hashed_pwd: hash, roles: []});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'dan');
			User.create({firstName:'Dan', lastName:'Wahlin', userName:'dan', salt: salt, hashed_pwd: hash});
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;
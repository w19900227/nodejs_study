var mongoose = require('mongoose'),
	Blog = mongoose.model('Blog'),
	Comment = mongoose.model('Comment');

exports.list = function(req, res) {
	res.send('respond with a resource');
};

exports.register = function(req, res) {
	if ( req.session.logined ) {
		res.redirect('/');
		return;
	}
	res.render('users/register');
}

exports.signin = function(req, res) {
	if ( req.session.logined ) {
		res.redirect('/');
		return;
	}
	res.render('users/signin');
}

exports.signout = function(req, res) {
	req.session.logined = false;
	res.redirect('/');
	res.end();
}

exports.forget = function(req, res) {
	if ( req.session.logined ) {
		res.redirect('/');
		return;
	}
	res.render('users/forget');
}


exports.add_article = function(req, res){
    if ((!req.session.name) || (!req.session.logined)) {
		res.redirect('/');
        return;
    }
	res.locals.username = req.session.name ;
	res.locals.authenticated = req.session.logined;
	res.render('users/add_article');
};

exports.add = function(req, res){
    if (!req.session.name) {
		res.redirect('/');
        return;
    }
	new Blog({
		Username: req.session.name,
		Article: req.body.Content,
		CreateDate: Date.now()
	}).save( function( err ){
		if (err) {
			console.log('Fail to save to DB.');
			return;
		}
		console.log('Save to DB.');
	});		
	res.redirect('/');
	
};

exports.profile = function(req, res){
    if ((!req.session.name) || (!req.session.logined)) {
		res.redirect('/');
        return;
    }
	res.locals.username = req.session.name ;
	res.locals.authenticated = req.session.logined;
	Blog.find({ Username: req.session.name },  function ( err, blogs, count ){
		res.render( 'users/profile', {
			title : 'Blog System',
			blogs: blogs
		});
	});
};

exports.del_article = function(req, res){
	Blog.remove({ _id: req.params.id }, function(err) {
		if (err)
			console.log('Fail to delete article.');
		else
			console.log('Done');
	});
	res.redirect('profile');
};

exports.modify = function(req, res){
    if ((!req.session.name) || (!req.session.logined)) {
		res.redirect('/');
        return;
    }
	res.locals.username = req.session.name ;
	res.locals.authenticated = req.session.logined;
	res.locals.messageID = req.params.id;
	Blog.find({ _id: req.params.id }, function ( err, blogs, count ){
		res.render( 'users/modify', {
			blogs: blogs
		});
	});		
};

exports.update = function(req, res){
    if (!req.params.id) {
		res.redirect('/');
        return;
    }
	Blog.update({ _id: req.params.id }, { Article: req.body.Content }, function(err) {
		if (err)
			console.log('Fail to update article.');
		else
			console.log('Done');
	});	
	res.redirect('profile');
};

exports.message = function(req, res){
	res.locals.username = req.session.name ;
	res.locals.authenticated = req.session.logined;
	res.locals.messageID = req.params.id;
	Blog.find({ _id: req.params.id }, function ( err, blogs, count ){
		Comment.find({ MessageID: req.params.id }, function ( err, comments, count ){
			res.render( 'users/message', {
				blogs: blogs,
				comments: comments
			});
		});	
	});	
};

exports.comment = function(req, res){
    if (!req.params.id) {
		res.redirect('/');
        return;
    }
	new Comment({
		Visitor: req.body.Visitor,
		Comment: req.body.Comment,
		MessageID: req.params.id,
		CreateDate: Date.now()
	}).save( function( err ){
		if (err) {
			console.log('Fail to save to DB.');
			return;
		}
		console.log('Save to DB.');
	});		
	res.redirect('/message/'+req.params.id);
};

exports.login = function(req, res) {
	if ( ( ! req.body.user ) || ( ! req.body.password ) ) {
		res.redirect('register');
		return;
	}
	req.session.name = req.body.user;
	req.session.password = req.body.password;
	req.session.logined = true;
	res.redirect('/');
	
}
/*
var dogs = express.Router();

    dogs.get('/', function(req, res, next) {
        // doing more stuff 
    });

    dogs.post('/', function(req, res, next) {
                // stuff stuff stuff
    });

// call our router we just created
app.use('/dogs', dogs);
*/

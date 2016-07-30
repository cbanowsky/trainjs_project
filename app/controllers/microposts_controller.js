function MicropostsController() {

	this.index = function(req, res, next) {
		var microposts = ModelSync( Micropost.findAll() );
		res.end(JSON.stringify(microposts));
	};

	this.create = function(req, res, next) {
		var micropost = ModelSync( Micropost.create(req.body) );
		res.end(JSON.stringify(micropost));
	};

	this.show = function(req, res, next) {
		var micropost = ModelSync( Micropost.findById(req.params.id) );
		res.end(JSON.stringify(micropost));
	};

	this.update = function(req, res, next) {
		var micropost = ModelSync( Micropost.findById(req.params.id) );
		micropost.update(req.body).then(function(_micropost) {
			res.end(JSON.stringify(_micropost));
		})
	};

	this.destroy = function(req, res, next) {
		var micropost = ModelSync( Micropost.findById(req.params.id) );
		micropost.destroy();
		res.end();
	};

}

module.exports = MicropostsController;

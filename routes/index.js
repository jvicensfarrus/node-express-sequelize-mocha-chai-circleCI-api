var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

module.exports = function(express)
{
	var router = express.Router();

	fs.readdirSync(__dirname)
		.filter(function(file) {
			return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
		})
		.forEach(function(file) {
			require("./" + file)(router);
		});


	router.all('/', function(req, res, next) {
	  	res.send({ msg : process.env.SERVICE_NAME + ' online', success: true });
	});

	return router;
}

var controller = require('../controllers/analyticController.js');

module.exports = function(router){


    /* GET analytics by ID. */
    router.post('/analytic/get', function(req, res) {

    		var analytic_id = req.body.id;

    		controller.getAnalytic(analytic_id)
    		.then(function(result){
        		res.send({ success: true, analytic: result.analytic });
        	})
    	    .catch(function(error) {
    	    	res.send({ success: false, msg: error.message });
    		});
    	});


    /* POST into analytic. */
    router.post('/analytic/add', function(req, res) {

        var	user_id = req.body.user_id,
            page_id = req.body.page_id,
            object_id = req.body.object_id;

        controller.addAnalytic(user_id, page_id, object_id)
        .then(function(result){
            res.send({ success: true, msg: result.message, analytic: result.task });
        })
        .catch(function(error) {
            res.send({ success: false, msg: error.message });
        });
    });

    return router;

}

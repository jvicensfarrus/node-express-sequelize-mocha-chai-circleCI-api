'use strict';
/* -------------------- *\
	   Dependencies
\* -------------------- */

var log4js = require('log4js');
var squel = require('squel');
var Model = require('../models');



/* -------------------- *\
		Configs
\* -------------------- */

log4js.configure({
    appenders: {
        connecttask: { type: 'file', filename: '../logs/error.log' }
    },
    categories: {
        default: { appenders: ['connecttask'], level: 'error' }
    }
});



/* -------------------- *\
		Variables
\* -------------------- */

var logger = log4js.getLogger('connecttask');
var Analytic = Model.Analytic;
var sequelize = Model.sequelize;



/* -------------------- *\
		Functions
\* -------------------- */

function logError(error){
    logger.error(error);
    logger.error('\n\n');
    if(process.env.NODE_ENV != 'live'){
        return error.message;
    }
    else{
        return 'System error, please contact admin.';
    }
}



module.exports = {

    addAnalytic: function(user_id, page_id, object_id) {
		let q = new Promise ( (resolve, reject) => {
			try
			{
				Analytic.create({ user_id: user_id, page_id: page_id, object_id: object_id })
				.then(folder => {
					resolve({message:'success'});
				})
				.catch( error => {
                    reject({ message: logError(error)});
				});

			}
			catch(error)
			{
				reject({ message: logError(error)});
			}
		});

		return q;
	},


	getAnalytic: function(analytic_id) {
		let q = new Promise ( (resolve, reject) => {
			try
			{
				var query = squel.select();

				query
					.field('analytic.id')
					.field('analytic.user_id')
					.field('analytic.page_id')
					.field('analytic.object_id')
					.field('analytic.createdAt')
					.field('analytic.updatedAt')

					.from('analytic')
					.where('analytic.id = ?', analytic_id);


				sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT })
				.then(result => {
					resolve({ analytic: result[0]});
				})
				.catch(function(error) {
					reject({ message: logError(error)});
				});
			}
			catch(error)
			{
	            reject({ message: logError(error)});
			}
		});

		return q;
	}
}

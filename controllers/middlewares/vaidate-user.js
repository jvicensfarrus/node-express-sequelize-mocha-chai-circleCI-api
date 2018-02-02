// 'use strict';
//
// var log4js = require('log4js');
//
// log4js.configure({
//     appenders: {
//         connectuser: { type: 'file', filename: '../logs/error.log' }
//     },
//     categories: {
//         default: { appenders: ['connectuser'], level: 'error' }
//     }
// });
//
// var logger = log4js.getLogger('connectuser');
//
// var squel = require('squel');
// var Model = require('../../../../api/models');
// var sequelize = Model.sequelize;
//
// function validateUser(req, res, next) {
// 	var query = squel.select();
//     query
//         .field('user.status')
//         .from('user')
//         .where('user.deleted_at IS NULL')
//         .where('user.id = ?', req.body.logged_in_user_id);
//
//     sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT })
//     .then(function(result) {
//
//         if(result.length)
//         {
//             var user = result[0];
//
//             if(user.status)
//             {
//                 next();
//             }
//             else
//             {
//                 res.status(401).json({
//                     success: false,
//                     logout: true,
//                     msg: 'Invalid user.'
//                 });
//             }
//         }
//         else
//         {
//             res.status(401).json({
// 		  		success: false,
//                 logout: true,
// 		    	msg: 'Invalid user.'
// 		  	});
//         }
//
//     })
//     .catch(function(error) {
//         logger.error(error); logger.error('\n\n');
//         res.status(401).json({
// 	  		success: false,
//             logout: true,
// 	    	msg: 'Invalid user.'
// 	  	});
//     });
// }
//
// module.exports = validateUser;

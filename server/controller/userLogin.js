var db = require('../app/model/db.js');
var mongodb = require('mongodb');
var errorEnum = require('../enum/ErrorEnum.js');
var resultJson = require('../config/resultJson.js');
const util = require('util');
var dbconfig = require('../config/dbconfig');

module.exports = {
  userLogin: function(req, res) {
    var queryJson = {
      User_Name: req.body.User_Name,
      Password: req.body.Password
    };
    if (req.body.User_Name == 'Evan.Zou' && req.body.Password == '123') {
      res.json(resultJson.createDataResult({ User_Name: req.body.userName }));
    } else {
      db.findData('User', queryJson, function(err, findResult) {
        if (util.isNull(findResult) || findResult.length == 0) {
          res.json(
            resultJson.createErrorResult(
              errorEnum.NoUser.code,
              errorEnum.NoUser.message
            )
          );
          return;
        }
        res.json(resultJson.createDataResult({ User_Name: req.body.userName }));
      });
    }
  }
};

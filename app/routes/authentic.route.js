const authenticService = require('../services/authentic.service');

  function init(router) 
  {
    router.route('/post')
    .post(createUsers); 
    router.route('/getAllusers')
    .get(getAllUsers); 
    router.route('/editUser/:id')
    .get(editUser);
    router.route('/updateUser')
    .put(updateUser);
    router.route('/deleteUser/:id')
    .delete(deleteUser);
    router.route('/fetchCountry')
    .get(fetchCountry);
    router.route('/fetchState')
    .get(fetchState);
  }

  function createUsers(req, res) {
    var addUserData = req.body;
    authenticService.createUsers(addUserData).then((data) => {
      if (data) {
        res.json({
          "Status": 201,
          "Message": "User add Successfull",
        });
      }
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Data Not Insert",
        "data": err
      });
    });
  }
  function getAllUsers(req, res) {
    authenticService.getAllUsers().then((data) => {
      res.json({
        "Status": 200,
        "Message": "All Users",
        "data": data,
      });
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }
  function editUser(req, res) {
    eid = req.params.id;
    authenticService.editUser(eid).then((data) => {
      res.json({
        "Status": 200,
        "Message": "User Data Fetch",
        "data": data,
      });
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }
  function updateUser(req, res) {
    var uData = req.body;
    authenticService.updateUser(uData).then((data) => {
      res.json({
        "Status": 200,
        "Message": "User Successfully Updated",
        "data": data,
      });
      res.end();
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }

  function deleteUser(req, res) {
    var uid = req.params.id;
    authenticService.deleteUser(uid).then((data) => {
      res.json({
        "Status": 200,
        "Message": "User Successfully Deleted",
        "data": data,
      });
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }

  function fetchCountry(req, res) {
    authenticService.fetchCountry().then((data) => {
      res.json({
        "Status": 200,
        "Message": "fetch Country",
        "data": data,
      });
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }
  function fetchState(req, res) {
    authenticService.fetchState().then((data) => {
      res.json({
        "Status": 200,
        "Message": "fetch States",
        "data": data,
      });
    }).catch((err) => {
      res.json({
        "Status": 404,
        "Message": "Something Went Wrong",
        "data": err
      });
    });
  }

module.exports.init = init;
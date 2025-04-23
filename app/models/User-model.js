var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/student";
var request = require("request");
var userModel = {
  createUsers: createUsers,
  getAllUsers: getAllUsers,
  editUser: editUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  fetchCountry: fetchCountry,
  fetchState: fetchState,
};
function createUsers(data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("student");

      dbo.collection("users").insertOne(data, function (error, row) {
        if (error) {
          reject([
            { success: false, message: "Something Went Wrong", error: error },
          ]);
        } else {
          var jsonData = {
            message: "Inserted Successfully",
            data: row.insertedId,
          };
          resolve(jsonData);
        }
      });
    });
  });
}
function getAllUsers() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      var dbo = db.db("student");
      dbo
        .collection("users")
        .find()
        .toArray(function (err, row) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(row);
          }
        });
    });
  });
}

function editUser(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("student");
      dbo.collection("users").findOne({ _id: Number(id) }, function (err, row) {
        if (err) {
          console.log(err);
          reject([{ success: false, message: error }]);
        } else {
          resolve(row);
        }
      });
    });
  });
}

function updateUser(udata) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      var dbo = db.db("student");
      var query = { _id: Number(udata._id) };
      console.log(query);
      // var newvalues = { $set: { name: udata.name, email: udata.email, phone: udata.phone } };
      var newvalues = { $set: udata };
      console.log(newvalues);
      dbo
        .collection("users")
        .updateOne(query, newvalues, function (error, result) {
          if (error) {
            console.log(error);
            reject({ success: false, error: error });
          } else {
            resolve(result);
          }
        });
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("student");
      dbo.collection("users").remove({ _id: Number(id) }, function (err, row) {
        if (err) {
          console.log(err);
          reject([{ success: false, message: error }]);
        } else {
          resolve(row);
        }
      });
    });
  });
}

function fetchCountry() {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "https://location.wlfpt.co/api/v1/countries",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        var data = JSON.parse(response.body);
        // resolve(dataarr);
        var dataarr = [];
        data.forEach((E) => {
          dataarr.push(E.name);
          resolve(dataarr);
        });
      }
    );
  });
}

async function fetchState() {
  return new Promise(async (resolve, reject) => {
    let arr = ["IN", "AF", "UZ"];
    for (let i = 0; i <= arr.length - 1; i++) {
      const getData = await getstate(arr[i]);
      // console.log(getData);
      resolve(getData);
    }
  });
}

function getstate(i) {
  return new Promise((resolve, reject) => {
    var url =
      "https://location.wlfpt.co/api/v1/states?filter=" + i + "&type=code";
    request(url, (err, res) => {
      if (err) {
        return err;
      }
      var daily_data = [];
      //console.log(res);
      var backend_final_data = JSON.parse(res);
      daily_data = backend_final_data.concat(daily_data);
      //console.log(daily_data);
      resolve(daily_data);
    });
  });
}

// https://location.wlfpt.co/api/v1/states?filter=AF&type=code

module.exports = userModel;

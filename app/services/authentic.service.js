var userModel = require("../models/User-model.js");
var tagService = {
    createUsers: createUsers,
    getAllUsers: getAllUsers,
    editUser: editUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    fetchCountry: fetchCountry,
    fetchState:fetchState
     
}

function createUsers(data) {
    return new Promise((resolve, reject) => {
        userModel.createUsers(data).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        userModel.getAllUsers().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function editUser(id) {
    return new Promise((resolve, reject) => {
        userModel.editUser(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}
function updateUser(udata, callback) {
    return new Promise((resolve, reject) => {
        userModel.updateUser(udata).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        userModel.deleteUser(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function fetchCountry() {
    return new Promise((resolve, reject) => {
        userModel.fetchCountry().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}
function fetchState() {
    return new Promise((resolve, reject) => {
        userModel.fetchState().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = tagService;


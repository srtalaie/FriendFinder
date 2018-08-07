const express = require('express');
const app = express();
const friendsData = require('../data/friends');


module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function (req, res) {
        let newFriend = req.body;

        console.log(newFriend);

        friendsData.push(newFriend);

        res.json(newFriend);

        let currentUser = friendsData[friendsData.length - 1]

        //Loops through firendsArray to see who is a compatbile match between current user and the entire database of friends based on the lowest deviation
        for (let i = 0; i < friendsData.length; i++) {
            let results = totalDifference(currentUser.scores, friendsData[i].scores);
            if (results < 20) {
                 res.json(true);
            } else {
                res.json(false);
            }
        }
    });

    //Utils
    let resultsArr = [];
    let resultsTotal;

    //Finds the total difference between two users
    function totalDifference(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            resultsArr.push(Math.abs(arr1[i] - arr2[i]));
        }
        resultsTotal = resultsArr.reduce((a, b) => a + b);
        return resultsTotal;
    }
}
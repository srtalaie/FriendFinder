const express = require('express');
const friendsData = require('../data/friends');


module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function (req, res) {
        let newFriend = req.body;
        friendsData.push(newFriend);
        let names = '';
        //Loops through firendsArray to see who is a compatbile match between current user and the entire database of friends based on the lowest deviation
        for (let i = 0; i < friendsData.length - 1; i++) {
            debugger;
            console.log(totalDifference(newFriend.scores, friendsData[i].scores));
            if (totalDifference(newFriend.scores, friendsData[i].scores) <= 20) {
               if(names === "Sorry No matches."){names = ''};   
                names += `<li>${friendsData[i].name}</li>`;
            } else if (totalDifference(newFriend.scores, friendsData[i].scores) > 20 && names === ""){
                names = 'Sorry No matches.';
            }
        }
        console.log(names);
        res.json(names);
    });

    //Utils

    //Finds the total difference between two users
    function totalDifference(arr1, arr2) {
        let results = 0;
        for (let i = 0; i < arr1.length; i++) {
            results += (Math.abs(arr1[i] - arr2[i]));
        }
        return results;
    }
}
'use strict';

import { environment } from '../environments/environment';
const axios = require('axios');

module.exports = {
    checkSecuritContext: function(successCallback, failureCallback) {
        var access_token = getAccessTokenFromCookie();
        if (access_token != "") {
            console.log("Old access Token :", access_token);
            getUserInfo(this, successCallback, failureCallback);
        } else {
            console.log("No Old access token available");
            failureCallback();
        }
    },
    getAccessToken: function() {
        return getAccessTokenFromCookie();
    },
    getPrincipal: function () {
        return this.principal;
    }
};

function getUserInfo(_this, successCallback, failureCallback) {
    var config = {
        method: 'get',
        url: environment.userInfoUri,
        headers: { 
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
            'Authorization': 'bearer ' + getAccessTokenFromCookie()
        }
    }

    axios.request(config).
        then(function(response) {
            console.log("Old token valid");
            _this.principal = response.data.principal;
            successCallback();
        }).
        catch(function(error) {
            console.log("Old token NOT valid");
            _this.principal = null;
            console.log('Error', error);
            failureCallback();
        });
}

function getAccessTokenFromCookie() {
    var access_token = getCookie("access_token");
    return access_token;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

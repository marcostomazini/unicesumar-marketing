'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('usuarios-mobile').factory('mySocket', function(socketFactory) {
    return socketFactory();
});
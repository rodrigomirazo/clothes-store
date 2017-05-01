'use strict';

angular.module('myApp').factory('dressService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://localhost:8080/dress/';

    var dress = {};

    var factory = {
        fetchAllDresses:fetchAllDresses,
        fetchDressById:fetchDressById,
        createDress:createDress,
        updateDress:updateDress,
        deleteDress:deleteDress,
        getDress:getDress
    };

    return factory;

    function fetchAllDresses() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function fetchDressById(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)
            .then(
                function(response) {
                    deferred.resolve(response.data);
                    console.log("this is servise ressponce")
                    dress = response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching user by id');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getDress() {
        console.log("service get dress "+dress);
        return dress;
    }

    function createDress(dress) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, dress)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }


    function updateDress(dress, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, dress)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function deleteDress(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);
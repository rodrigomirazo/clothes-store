'use strict';

angular.module('myApp').factory('statusService', ['$http', '$q', function($http, $q){

    return {
        getAll: getAll,
        addEntity: addEntity,
        updateEntity: updateEntity,
        deleteEntity: deleteEntity
    };

    function getAll() {
        var deferred = $q.defer();
        $http.get('orderStatus')
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching entities'+errResponse);
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function addEntity(status) {
        var deferred = $q.defer();
        $http.post('orderStatus', status)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while creating entity'+errResponse);
                    deferred.resolve(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateEntity(status) {
        var deferred = $q.defer();
        $http.put('orderStatus', status)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating entity'+errResponse);
                    deferred.resolve(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteEntity(id) {
        var deferred = $q.defer();
        $http.delete('orderStatus/'+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting entity'+errResponse);
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);


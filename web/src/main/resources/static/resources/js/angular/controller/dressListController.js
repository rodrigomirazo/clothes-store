'use strict';

angular.module('myApp').controller('dressListController', ['$scope', '$location', '$routeParams', 'dressService', 'Upload', '$timeout',
    function($scope, $location, $routeParams, dressService, Upload, $timeout) {



    var self = this;
    self.dress = {
        id: null,
        manufacturer: {},
        type: {},
        category: {},
        description: {
            dressId: null,
            english: null,
            russian:null
        },
        price: null,
        amount: null,
        imageSource: null,
        releaseDate: null,
        orderDetailSet: null,
        sizeSet: [],
        colorSet: [],
        dressImageSet: []
    };
    self.dresses=[];
    self.categories=[];
    self.types=[];
    self.manufacturers=[];
    self.colors=[];
    self.sizes=[];
    self.imageFiles=[];

    self.imgSrc=null;

    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.fetchDressById = fetchDressById;
    self.addDress = addDress;
    self.logImgFiles = logImgFiles;
    self.fetchDressProperties = fetchDressProperties;
    self.readAsDataUrl = readAsDataUrl;
    self.editDress = editDress;
    self.removeDress = removeDress;

    fetchAllDresses();

    function fetchAllDresses(){
        dressService.fetchAllDresses()
            .then(
            function(d) {
                self.dresses = d;
            },
            function(errResponse){
                console.error('Error while fetching Users'+errResponse);
            }
        );
    }

    function logImgFiles() {
        console.log(self.imageFiles);
    }

    function fetchDressProperties() {
        dressService.fetchDressById($routeParams.id)
            .then(
                function (d) {
                    self.dress = d;
                },
                function (errResponse) {
                    console.error('Error while fetching dress by id:' + errResponse.toString());
                }
            );
        dressService.fetchCategories()
            .then(
                function (c) {
                    self.categories = c;
                },
                function (errResponse) {
                    console.error('Error while fetching categories:' + errResponse.toString());
                }
            );
        dressService.fetchManufacturers()
            .then(
                function (m) {
                    self.manufacturers = m;
                },
                function (errResponse) {
                    console.error('Error while fetching manufacturers:' + errResponse.toString());
                }
            );
        dressService.fetchColors()
            .then(
                function (c) {
                    self.colors = c;
                },
                function (errResponse) {
                    console.error('Error while fetching colors:' + errResponse.toString());
                }
            );
        dressService.fetchSizes()
            .then(
                function (s) {
                    self.sizes = s;
                },
                function (errResponse) {
                    console.error('Error while fetching sizes:' + errResponse.toString());
                }
            );
        dressService.fetchTypes()
            .then(
                function (t) {
                    self.types = t;
                },
                function (errResponse) {
                    console.error('Error while fetching types:' + errResponse.toString());
                }
            );
    }

    function fetchDressById() {
        dressService.fetchDressById($routeParams.id)
            .then(
                function (d) {
                    self.dress = d;
                },
                function (errResponse) {
                    console.error('Error while fetching dress by id:' + errResponse.toString());
                }
            );
    }

    function createDress(dress){
        dressService.createDress(dress)
            .then(
            function(){
                self.dresses = [];
                fetchAllDresses();
                self.dresses.push(dress);
            },
            //fetchAllDresses(),
            function(errResponse){
                console.error('Error while creating User'+errResponse);
            }
        );
    }

    function addDress() {
        dressService.addDress(self.dress, self.imageFiles);
    }

    function editDress(id) {
        dressService.editDress(id, self.dress)
            .then(
                function(){
                    self.dresses = [];
                    fetchAllDresses();
                    self.dresses[id] = self.dress;
                },
                function(errResponse){
                    console.error('Error while updating User'+errResponse);
                }
            );
    }

    function removeDress(id) {
        dressService.removeDress(id)
            .then(
                fetchAllDresses(),
                function(errResponse){
                    console.error('Error while deleting User'+errResponse);
                }
            );
    }

    function updateDress(dress, id){
        dressService.updateDress(dress, id)
            .then(
                function(){
                    self.dresses = [];
                    fetchAllDresses();
                    self.dresses[id] = dress;
                },
            //fetchAllDresses(),
            function(errResponse){
                console.error('Error while updating User'+errResponse);
            }
        );
    }

    function deleteDress(id){
        dressService.deleteDress(id)
            .then(
            fetchAllDresses(),
            function(errResponse){
                console.error('Error while deleting User'+errResponse);
            }
        );
    }

    function submit() {
        if(self.dress.id===null){
            console.log('Saving New User', self.dress);
            createDress(self.dress);
        }else{
            updateDress(self.dress, self.dress.id);
            console.log('User updated with id ', self.dress.id);
        }
        reset();
    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.dresses.length; i++){
            if(self.dresses[i].id === id) {
                self.dress = angular.copy(self.dresses[i]);
                console.log(JSON.stringify(self.dress));
                break;
            }
        }
    }

    function remove(id){
        console.log('id to be deleted', id);
        if(self.dress.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteDress(id);
    }


    function reset(){
        self.dress= {
            "id": null,
            "manufacturer": {},
            "clazz": {},
            "category": {},
            "description": {},
            "price": null,
            "imageResource": null,
            "releaseDate": '',
            "sizeSet": [
                {
                    "id": 1,
                    "ukSize": 10
                },
                {
                    "id": 2,
                    "ukSize": 12
                },
                {
                    "id": 3,
                    "ukSize": 14
                }
            ],
            "colorSet": [
                {
                    "id": 3,
                    "color": "White",
                    "imageResource": null
                },
                {
                    "id": 1,
                    "color": "Red",
                    "imageResource": null
                },
                {
                    "id": 2,
                    "color": "Black",
                    "imageResource": null
                }
            ],
            "dressImageSet": [
                {
                    "id": 2,
                    "image_resource": "twst2"
                },
                {
                    "id": 1,
                    "image_resource": "test1"
                }
            ]
        };
        //.myForm.$setPristine(); //reset Form
    }

    function readAsDataUrl(file) {
        dressService.readAsDataUrl(file, $scope)
            .then(
                function (result) {
                    self.imgSrc = result;
                }
            );
    }

    $scope.$watch('imageFiles', function () {
        $scope.upload($scope.imageFiles);
    });

    $scope.upload = function (imageFiles) {
        if (imageFiles && imageFiles.length) {
            for (var i = 0; i < imageFiles.length; i++) {
                var file = imageFiles[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                                resp.config.data.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n' +
                            $scope.log;
                    });
                }
            }
        }
    };
}]);

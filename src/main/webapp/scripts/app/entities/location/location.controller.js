'use strict';

angular.module('hrApp')
    .controller('LocationController', function ($scope, Location) {
        $scope.locations = [];
        $scope.loadAll = function() {
            Location.query(function(result) {
               $scope.locations = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Location.get({id: id}, function(result) {
                $scope.location = result;
                $('#deleteLocationConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Location.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteLocationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.location = {streetAddress: null, postalCode: null, city: null, stateProvince: null, id: null};
        };
    });

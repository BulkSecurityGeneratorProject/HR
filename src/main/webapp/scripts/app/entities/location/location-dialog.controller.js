'use strict';

angular.module('hrApp').controller('LocationDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Location', 'Department', 'Country',
        function ($scope, $stateParams, $modalInstance, entity, Location, Department, Country) {

        $scope.location = entity;
        $scope.departments = Department.query();
            $scope.countrys = Country.query({filter: 'location-is-null'});
        $scope.load = function(id) {
            Location.get({id : id}, function(result) {
                $scope.location = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('hrApp:locationUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.location.id != null) {
                Location.update($scope.location, onSaveFinished);
            } else {
                Location.save($scope.location, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

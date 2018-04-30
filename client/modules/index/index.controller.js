angular.module('app').controller('IndexCtrl', function ($scope, $state, $http, $sessionStorage, routeName) {
    $scope.routeName = routeName;

});
angular.module('app').controller('SettingCtrl', function ($scope, $http, routeName, $state) {
   console.log('setting controller')
    $scope.routeName = routeName;

   console.log($state)

});
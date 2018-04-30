angular.module('app').config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('YYYY-MM-DD');
    };
});

angular.module('app').controller('journalizingCtrl', function ($scope, $http, categoryList, accountList) {
    console.log('journalizingCtrl')
    $scope.journalizing = {};

    $scope.categoryList = categoryList;
    $scope.accountList = accountList;

    $scope.post = function (journalizing) {
        console.log(journalizing)
    };

});
angular.module('app').controller('Account.ListCtrl', function ($scope, $http, $state, routeName, accountTypeMap, accountList,  modal) {

    $scope.noData = true;

    if (angular.isDefined(accountTypeMap)) {
        $scope.accountTypeMap = accountTypeMap;
    }

    if (angular.isDefined(accountList) && !_.isEmpty(accountList)) {
        $scope.accountList = accountList;
        $scope.noData = false;
    }

    $scope.moveDetail = function (account) {
        $state.go(routeName.ACCOUNT_DETAIL, {id: account.id});
    };

    $scope.removeAccount = function (account) {
        let options = modal.defaultOptions;
        modal.open({title: 'a', content: 'aaa'}).result.then(function (d) {
           console.log(d);
        });
    };

    $scope.showModal = function () {
        let options = modal.defaultOptions;
        
        modal.open({title: 'a', content: 'aaa'}).result.then(function (d) {

        });
    }

});
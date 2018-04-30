angular.module('app').controller('Account.ListCtrl', function ($scope, $http, $state, routeName, accountTypeMap, accountList,  modal) {

    if (angular.isDefined(accountTypeMap)) {
        $scope.accountTypeMap = accountTypeMap;
    }


    if (angular.isDefined(accountList)) {
        $scope.accountList = accountList;
    }

    console.log('accountCtrl')

    $scope.moveDetail = function (account) {
        $state.go(routeName.ACCOUNT_DETAIL, {id: account.id});
    };

    $scope.showModal = function () {
        let options = modal.defaultOptions;
        
        modal.open({title: 'a', content: 'aaa'}).result.then(function (d) {

        });
    }

});
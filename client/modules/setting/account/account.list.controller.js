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
        $state.go(routeName.ACCOUNT_DETAIL, {id: account._id});
    };

    $scope.removeAccount = function (account) {
        let options = modal.defaultOptions;
        options.title = 'Confirm';
        options.content = 'Deleting. Continue?';
        options.okFunction = function () {
            $http.delete('/api/account/' + account._id).then(function (d) {
                $http.get('/api/account/list').then(function (d) {
                    $scope.accountList = d.data.accountList;
                });
            });
        };
        modal.open(options);
        return options;
    };

    // $scope.showModal = function () {
    //     let options = modal.defaultOptions;
    //     options.title = 'Confirm';
    //     options.content = 'Deleting. Continue?';
    //     options.okFunction = function () {
    //       $http.delete('/api/account/' + account._id).then(function (d) {
    //           $http.get('/api/account/list').then(function (d) {
    //               $scope.accountList = d.data.accountList;
    //           });
    //
    //       });
    //     };
        // modal.open({title: 'a', content: 'aaa'}).result.then(function (d) {
        //
        // });
    // }



});
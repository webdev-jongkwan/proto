angular.module('app').controller('Account.DetailCtrl', function ($scope, $http, $state, routeName, accountTypeList, account) {
    console.log('Account.DetailCtrl')
    let isCreateMode = true;

    if (angular.isDefined(accountTypeList)) {
        $scope.accountTypeList = accountTypeList;
    }

    if (angular.isDefined(account)) {
        $scope.account = account;
        $scope.account.type = $scope.account.type._id;
        isCreateMode = false;
    }

    $scope.goBack = function () {
        $state.go(routeName.ACCOUNT_LIST);
    };

    $scope.createAccount = function (account) {
        // type id only
        let params = {
            name: account.name,
            des: account.des,
            type: account.type,
            number: account.number,
            balance: account.balance
        };

        if (isCreateMode) {
            $http.post('/api/account', params).then(function (d) {
                if (d) {
                    $state.go(routeName.ACCOUNT_LIST);
                } else {
                    //noti err pop
                }
            });
        } else {
            $http.put('/api/account'+ account.id, params).then(function (d) {
                if (d) {
                    $state.go(routeName.ACCOUNT_LIST);
                } else {
                    //noti err pop
                }
            });
        }
    }
});
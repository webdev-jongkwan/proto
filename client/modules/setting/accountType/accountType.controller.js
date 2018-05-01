angular.module('app').controller('AccountTypeCtrl', function ($scope, $http, accountTypeList) {

    $scope.accountTypeList = [];
    if (!_.isEmpty(accountTypeList)) {
        $scope.accountTypeList = angular.copy(accountTypeList);
    }

    $scope.backUpData = {};

    $scope.setEmpty = function () {
        $scope.accountType.name = null;
        $scope.accountType.des = null;
    };

    let getAccountTypeList = function () {
        $http.get('/api/accountType/list').then(function (d) {
            $scope.accountTypeList = d.data.accountTypeList;
        });
    };

    $scope.addAccountType = function () {
        if ($scope.accountType.name) {
            let params = {
                name: $scope.accountType.name,
                des: $scope.accountType.des
            };

            $http.post('/api/accountType', params).then(function (d) {
                $scope.setEmpty();
                getAccountTypeList();
            });
        } else {
            // error popup
        }
    };

    $scope.updateAccountType = function (accountType) {
        if (accountType.name) {
            let params = {
                name: accountType.name,
                des: accountType.des
            };

            $http.put('/api/accountType/' + accountType.id, params).then(function (d) {
                $scope.backUpData = {};
                getAccountTypeList();
            });
        }
    };

    $scope.removeAccountType = function (accountType) {
        $http.delete('/api/accountType/' + accountType.id).then(function (d) {
            getAccountTypeList();
        });
    };

    let editingIndex = '';
    $scope.editAccountType= function (index) {
        let accountType = $scope.accountTypeList[index];
        $scope.cancelEditCategory(editingIndex);
        editingIndex = index;
        $scope.backUpData = {
            name: accountType.name,
            des: accountType.des
        };
        accountType.editable = true;
    };

    $scope.cancelEditAccountType = function (index) {
        let accountType = $scope.accountTypeList[index];
        if (!accountType) {
            return;
        }
        accountType.name = $scope.backUpData.name;
        accountType.des = $scope.backUpData.des;
        accountType.editable = false;
        $scope.backUpData = {};
        editingIndex = '';
    };

});
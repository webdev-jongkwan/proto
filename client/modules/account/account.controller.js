angular.module('app').controller('accountCtrl', function ($scope, $http) {

    $scope.accountList = [
        {
            name: 'Test',
            type: 'aaa',
            balance: '111'
        },
        {
            name: 'Test 2',
            type: 'aaa 2',
            balance: '111 2'
        },
        {
            name: 'Test 3',
            type: 'aaa 3',
            balance: '111 3'
        },
        {
            name: 'Test 4',
            type: 'aaa 4',
            balance: '111 4'
        },
        {
            name: 'Test 5',
            type: 'aaa 5',
            balance: '111 5'
        }
    ];

    $scope.accountTypeList = [
        {
            id: 1,
            name: '1',
            des: '111'
        },
        {
            id: 2,
            name: '2',
            des: '222'
        },
        {
            id: 3,
            name: '3',
            des: '333'
        },
        {
            id: 4,
            name: '4',
            des: '444'
        },
        {
            id: 5,
            name: '5',
            des: '555'
        }
    ];
    console.log('accountCtrl')

    $scope.goAccountDetail = function (account) {
        console.log(account);
    };

    $scope.createAccount = function (account) {
        console.log(account);
    }
});
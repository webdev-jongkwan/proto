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
    console.log('accountCtrl')
});
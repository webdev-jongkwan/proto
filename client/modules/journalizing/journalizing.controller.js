angular.module('app').config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('YYYY-MM-DD');
    };
});

angular.module('app').controller('journalizingCtrl', function ($scope, $http, journalizingList, categoryList, accountInfo) {

    $scope.journalizingList = journalizingList;
    $scope.categoryList = categoryList;
    $scope.accountList = accountInfo.accountList;
    $scope.balanceMap = accountInfo.balanceMap;

    let defaultSet = {
        datetime: moment().format('YYYY-MM-DD'),
        isIncome: true,
        account: _.first(accountInfo.accountList)._id,
        category: _.first(categoryList)._id
    };

    $scope.journalizing = _.clone(defaultSet);

    $scope.balance = '';
    $scope.getBalance = function (selectedAccountId) {
        $scope.balance = $scope.balanceMap[selectedAccountId];
    };
    $scope.getBalance($scope.journalizing.account);

    $scope.isIncome = function (value) {
        $scope.journalizing.isIncome = value;
    };
    $scope.isIncome($scope.journalizing.isIncome);

    $scope.postJournalizing = function (journalizing) {
        let params = {
            datetime: moment(journalizing.datetime).format('YYYY-MM-DD'),
            isIncome: journalizing.isIncome,
            account: journalizing.account,
            balance: $scope.balance,
            category: journalizing.category,
            amount: journalizing.amount,
            des: journalizing.des
        };

        $http.post('/api/journalizing', params).then(function (d) {
            console.log(d);
            $http.get('/api/journalizing/list').then(function (d) {
                $scope.journalizingList = d.data.journalizingList;
            });
        });
        // console.log(journalizing)
    };

});
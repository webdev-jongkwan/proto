angular.module('app').controller('test', function ($scope, $http, journalizingList, categoryList, accountInfo, uiGridConstants) {

    $scope.accountMap = accountInfo.accountMap;
    $scope.alabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A'];

    $scope.adata = [
        [65, 59, 80, 81, 56, 55, 40]

    ];


    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.data = [
        [65, -59, 80, 81, -56, 55, -40],
        [28, 48, -40, 19, 86, 27, 90]
    ];
    $scope.datasetOverride = [
        {
            label: "Bar chart",
            borderWidth: 1,
            type: 'bar'
        },
        {
            label: "Line chart",
            borderWidth: 3,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            type: 'line'
        }
    ];



$scope.getAaa = function () {
    $http.get('/api/aaa/a').then(function (d) {
        let returnedList = d.data.aaa;


        $scope.alabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A'];

        $scope.adata = [
            65, 59, 80, 81, 56, 55, 40
        ];


    })
}


});
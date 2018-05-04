angular.module('app').controller('test', function ($scope, $http, journalizingList, categoryList, accountInfo, uiGridConstants) {

    $scope.accountMap = accountInfo.accountMap;
    // $scope.alabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A'];
$scope.seriess = ['Series B'];
    // $scope.adata = [
    //     [65, 59, 80, 81, 56, 55, 40]
    //
    // ];


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

    $scope.getMonth = function () {
        $http.get('/api/aaa/month/4').then(function (d) {
            let returnedList = d.data.bbb;
            let dataA = returnedList.resultA;

            $scope.sseriess = ['Series S'];
            $scope.slabels = [];
            $scope.sdata = [];
            for ( let key in dataA) {
                $scope.slabels.push(key);
                $scope.sdata.push(dataA[key]);
            }
        }) ;
    };


$scope.getAaa = function () {
    $http.get('/api/aaa/a').then(function (d) {
        let returnedList = d.data.aaa;

        let dataA = returnedList.resultA;
        let dataB = returnedList.resultB;

        $scope.alabels = [];
        $scope.adata = [];

        $scope.blabels = [];
        $scope.bdata = [];

        $scope.clabels = [];
        $scope.cdata = [];

        for ( let key in dataA) {
            $scope.alabels.push($scope.accountMap[key]);
            $scope.adata.push(dataA[key]);
        }

        for ( let key in dataB) {
            $scope.blabels.push($scope.accountMap[key]);
            $scope.bdata.push(dataB[key]);
        }

        $scope.clabels = $scope.blabels;
        $scope.cdata = $scope.bdata;


    })
}


});
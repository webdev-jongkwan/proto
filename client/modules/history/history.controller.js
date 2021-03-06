angular.module('app').controller('HistoryCtrl', function ($scope, $http, journalizingList, categoryList, accountInfo, uiGridConstants) {

    $scope.journalizingList = journalizingList;
    $scope.categoryList = categoryList;
    $scope.accountList = accountInfo.accountList;
    $scope.balanceMap = accountInfo.balanceMap;
    $scope.accountMap = accountInfo.accountMap;

    let makeFilterOption = function (listData) {
      let resultData = [];
      angular.forEach(listData, function (data) {
          let obj = {
              value: data.id,
              label: data.name
          };
          resultData.push(obj);
      });
      return resultData;
    };

    let accountFiletrData = makeFilterOption($scope.accountList);
    let categoryFilterData = makeFilterOption($scope.categoryList);

    $scope.userTypeList = [
        {id: 0, name: 'Both'},
        {id: 1, name: 'Jake'},
        {id: 2, name: 'Jane'}
    ];

    let columns = [
        {
            name: 'Date',
            field: 'datetime',
            type: 'date',
            // cellFilter: 'date:"YYYY-MM-dd"',
            // width: 50,
            cellTemplate: '<div class="ui-gird-cell-contents text-center" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'Account',
            field: 'account',
            filter: {
                type: uiGridConstants.filter.SELECT,
                selectOptions: accountFiletrData
            },
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'AB',
            field: 'isIncome',
            // width: 10,
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'category',
            field: 'category',
            filter: {
                type: uiGridConstants.filter.SELECT,
                selectOptions: categoryFilterData
            },
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'amount',
            field: 'amount',
            // width: 30,
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'des',
            field: 'des',
            // width: 50,
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        },
        {
            name: 'balance',
            field: 'balance',
            // width: 50,
            cellTemplate: '<div class="ui-gird-cell-contents" ng-click="grid.appScope.moveDetail(row.entity)">{{row.entity[col.field]}}</div>'
        }
    ];

    // $scope.gridHeight = 36 * $scope.journalizingList.length + "px";

    $scope.gridOptions = {
        data: $scope.journalizingList,
        enableSorting: true,
        enableFiltering: true,
        // onRegisterApi: function(gridApi){
        //     vm.gridApi = gridApi;
        // },

        enableVerticalScrollbar : uiGridConstants.scrollbars.NEVER,
        enableHorizontalScrollbar  : uiGridConstants.scrollbars.NEVER,
        enableColumnMenus: false,
        headerRowHeight: 43,
        rowHeight: 36,
        minRowsToShow:2000,
        virtualizationThreshold: 50,
        columnDefs: columns
    };

    // $scope.gridOptions.data = journalizingList;
    // $scope.moveDetail = function (item) {
    //     $state.go(routeName.PAY_CODE_DETAIL, {id: item.id});
    // };

});
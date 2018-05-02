angular.module('app').constant('routeName', {
    BASE: 'base',
    INDEX: 'index',
    SETTING: 'setting',
    CATEGORY: 'category',
    ACCOUNT: 'account',
    ACCOUNT_LIST: 'account.list',
    ACCOUNT_DETAIL: 'account.detail',
    ACCOUNT_TYPE: 'accountType',
    JOURNALIZING: 'journalizing'

});

angular.module('app').config(function ($stateProvider, $urlRouterProvider, routeName) {
    $stateProvider.state({
        name: routeName.BASE,
        abstract: true,
        template: '<div ui-view=""></div>',
        controller: function ($state, $sessionStorage) {
        }
    });

    $stateProvider.state({
        name: routeName.INDEX,
        url: '/',
        parent: routeName.BASE,
        templateUrl: 'modules/index/index.html',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'IndexCtrl'
    });

    $stateProvider.state({
        name: routeName.SETTING,
        url: 'setting',
        parent: routeName.INDEX,
        templateUrl: 'modules/setting/setting.html',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'SettingCtrl'
    });

    $stateProvider
        .state(routeName.ACCOUNT, {
            url: 'account',
            abstract: true,
            parent: routeName.INDEX,
            template: '<div ui-view=""></div>'
        })
        .state(routeName.ACCOUNT_LIST, {
            url: '/list',
            templateUrl: 'modules/setting/account/account-list.html',
            controller: 'Account.ListCtrl',
            resolve: {
                accountTypeMap: function ($http, $q) {
                    let defer = $q.defer();
                    let accountTypeMap = {};
                    $http.get('/api/accountType/list').then(function (d) {
                        if (d.data.accountTypeList) {
                            let accountTypeList = d.data.accountTypeList;
                            for (let i = 0; i < accountTypeList.length; i++) {
                                accountTypeMap[accountTypeList[i]._id] = accountTypeList[i];
                            }
                        }
                        defer.resolve(accountTypeMap);
                    }, function (e) {
                        defer.reject(e);
                    });
                    return defer.promise;
                },
                accountList: function ($http, $q) {
                    let defer = $q.defer();
                    $http.get('/api/account/list').then(function (d) {
                        defer.resolve(d.data.accountList);
                    }, function (e) {
                        defer.reject(e);
                    });
                    return defer.promise;
                }
            }
        })
        .state(routeName.ACCOUNT_DETAIL, {
            url: '/detail/:id',
            templateUrl: 'modules/setting/account/account-detail.html',
            controller: 'Account.DetailCtrl',
            params: {
              id: ''
            },
            resolve: {
                accountTypeList: function ($http, $q) {
                    let defer = $q.defer();
                    $http.get('/api/accountType/list').then(function (d) {
                        let accountTypeList;
                        if (d.data.accountTypeList) {
                            accountTypeList = d.data.accountTypeList;
                        }
                        defer.resolve(accountTypeList);
                    }, function (e) {
                        defer.reject(e);
                    });
                    return defer.promise;
                },
                account: function ($stateParams, $http, $q) {
                    if (!_.isUndefined($stateParams.id) && !_.isEqual($stateParams.id, "")) {
                        let defer = $q.defer();
                        $http.get('/api/account/'+$stateParams.id).then(function(d) {
                            defer.resolve(d.data.account);
                        }, function (e) {
                            defer.reject(e);
                        });
                        return defer.promise;
                    }
                    console.log($stateParams)
                }
            }
        });

    $stateProvider.state({
        name: routeName.ACCOUNT_TYPE,
        url: 'accountType',
        parent: routeName.INDEX,
        templateUrl: 'modules/setting/accountType/accountType.html',
        resolve: {
            accountTypeList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('/api/accountType/list').then(function (d) {
                    defer.resolve(d.data.accountTypeList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'AccountTypeCtrl'
    });

    $stateProvider.state({
        name: routeName.CATEGORY,
        url: 'category',
        parent: routeName.INDEX,
        templateUrl: 'modules/setting/category/category.html',
        resolve: {
            categoryList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('/api/category/list').then(function (d) {
                    defer.resolve(d.data.categoryList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'CategoryCtrl'
    });

    // $stateProvider
    //     .state(routeName.RULE, {
    //         url: 'rule',
    //         abstract: true,
    //         parent: routeName.INDEX,
    //         template: '<div ui-view=""></div>'
    //     })
    //     .state(routeName.RULE_LIST, {
    //         url: '/list',
    //         templateUrl: 'modules/rule/rule-list.html',
    //         controller: 'Rule.ListCtrl'
    //     })
    //     .state(routeName.RULE_DETAIL, {
    //         url: '/detail/:id',
    //         templateUrl: 'modules/rule/rule-detail.html',
    //         controller: 'Rule.DetailCtrl'
    //     });

    $stateProvider.state({
        name: routeName.JOURNALIZING,
        url: 'journalizing',
        parent: routeName.INDEX,
        templateUrl: 'modules/journalizing/journalizing.html',
        resolve: {
            categoryList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('api/category/list').then(function (d) {
                    defer.resolve(d.data.categoryList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            },
            accountInfo: function ($http, $q) {
                let defer = $q.defer();
                let accountInfo = {};
                $http.get('api/account/list').then(function (d) {
                    accountInfo.accountList = d.data.accountList;
                    accountInfo.balanceMap = {};
                    for (let i = 0; i < accountInfo.accountList.length; i++) {
                        accountInfo.balanceMap[accountInfo.accountList[i]._id] = accountInfo.accountList[i].balance;
                    }
                    defer.resolve(accountInfo);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            },
            journalizingList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('api/journalizing/list').then(function (d) {
                    defer.resolve(d.data.journalizingList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'journalizingCtrl'
    });

    $urlRouterProvider.otherwise('/');
});
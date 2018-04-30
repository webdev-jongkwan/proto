angular.module('app').constant('routeName', {
    BASE: 'base',
    INDEX: 'index',
    CATEGORY: 'category',
    ACCOUNT: 'account',
    ACCOUNT_LIST: 'account.list',
    ACCOUNT_DETAIL: 'account.detail',
    JOURNALIZING: 'journalizing',
    RULE: 'rule',
    RULE_LIST: 'rule.list',
    RULE_DETAIL: 'rule.detail'

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

    $stateProvider
        .state(routeName.ACCOUNT, {
            url: 'account',
            abstract: true,
            parent: routeName.INDEX,
            template: '<div ui-view=""></div>'
        })
        .state(routeName.ACCOUNT_LIST, {
            url: '/list',
            templateUrl: 'modules/account/account-list.html',
            controller: 'Account.ListCtrl',
            resolve: {
                accountTypeMap: function ($http, $q) {
                    let defer = $q.defer();
                    let accountTypeMap = {};
                    $http.get('/api/accountType/list').then(function (d) {
                        if (d.data.accountTypeList) {
                            let accountTypeList = d.data.accountTypeList;
                            for (let i = 0; i < accountTypeList.length; i++) {
                                accountTypeMap[accountTypeList[i].id] = accountTypeList[i];
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
            templateUrl: 'modules/account/account-detail.html',
            controller: 'Account.DetailCtrl',
            params: { id: null },
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
                    if (angular.isDefined($stateParams.id)) {
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
        name: routeName.CATEGORY,
        url: 'category',
        parent: routeName.INDEX,
        templateUrl: 'modules/category/category.html',
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

    $stateProvider
        .state(routeName.RULE, {
            url: 'rule',
            abstract: true,
            parent: routeName.INDEX,
            template: '<div ui-view=""></div>'
        })
        .state(routeName.RULE_LIST, {
            url: '/list',
            templateUrl: 'modules/rule/rule-list.html',
            controller: 'Rule.ListCtrl'
        })
        .state(routeName.RULE_DETAIL, {
            url: '/detail/:id',
            templateUrl: 'modules/rule/rule-detail.html',
            controller: 'Rule.DetailCtrl'
        });

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
            accountList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('api/account/list').then(function (d) {
                    defer.resolve(d.data.accountList);
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
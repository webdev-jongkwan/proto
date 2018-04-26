angular.module('app').constant('routeName', {
    BASE: 'base',
    INDEX: 'index',
    // LOGIN: 'login',
    // USER: 'user',
    ACCOUNT: 'account',
    CATEGORY: 'category',
    JOURNALIZING: 'journalizing'
});

angular.module('app').config(function ($stateProvider, $urlRouterProvider, routeName) {
    $stateProvider.state({
        name: routeName.BASE,
        abstract: true,
        template: '<div ui-view=""></div>',
        controller: function ($state, $sessionStorage) {
            // if ($sessionStorage.token) {
            //     $state.go(routeName.MAIN);
            // } else {
            //     $state.go(routeName.LOGIN);
            // }
        }
    });

    // $stateProvider.state({
    //     name: routeName.LOGIN,
    //     url: '/login',
    //     parent: routeName.BASE,
    //     templateUrl: 'modules/login/login.html',
    //     controller: 'loginCtrl',
    //     resolve: {
    //         routeName: function (routeName) {
    //             return routeName;
    //         }
    //     }
    // });

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
        controller: 'indexCtrl'
    });

    // $stateProvider.state({
    //     name: routeName.USER,
    //     url: 'user',
    //     parent: routeName.MAIN,
    //     templateUrl: 'modules/user/user.html',
    //     resolve: {
    //         routeName: function (routeName) {
    //             return routeName;
    //         }
    //     },
    //     controller: 'userCtrl'
    // });

    $stateProvider.state({
        name: routeName.ACCOUNT,
        url: 'category',
        parent: routeName.INDEX,
        templateUrl: 'modules/category/category.html',
        resolve: {
            // categoryList: function ($http, $q) {
            //     let defer = $q.defer();
            //     $http.get('/category/list').then(function (d) {
            //         defer.resolve(d.data.categoryList);
            //     }, function (e) {
            //         defer.reject(e);
            //     });
            //     return defer.promise;
            // }
        },
        controller: 'categoryCtrl'
    });

    $stateProvider.state({
        name: routeName.CATEGORY,
        url: 'category',
        parent: routeName.INDEX,
        templateUrl: 'modules/category/category.html',
        resolve: {
            categoryList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('/api/category').then(function (d) {
                    defer.resolve(d.data.categoryList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'categoryCtrl'
    });

    $stateProvider.state({
        name: routeName.JOURNALIZING,
        url: 'journalizing',
        parent: routeName.INDEX,
        templateUrl: 'modules/journalizing/journalizing.html',
        resolve: {
            // categoryList: function ($http, $q) {
            //     let defer = $q.defer();
            //     $http.get('/category/list').then(function (d) {
            //         defer.resolve(d.data.categoryList);
            //     }, function (e) {
            //         defer.reject(e);
            //     });
            //     return defer.promise;
            // },
            // journalizingList: function ($http, $q) {
            //     let defer = $q.defer();
            //     $http.get('/journalizing/list').then(function (d) {
            //         defer.resolve(d.data.journalizingList);
            //     }, function (e) {
            //         defer.reject(e);
            //     });
            //     return defer.promise;
            // }
        },
        controller: 'journalizingCtrl'
    });

    $urlRouterProvider.otherwise('/');
});
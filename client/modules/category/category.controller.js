angular.module('app').controller('CategoryCtrl', function ($scope, $http, categoryList) {
    console.log('CategoryCtrl')

    $scope.categoryList = [];
    if (!_.isEmpty(categoryList)) {
        $scope.categoryList = angular.copy(categoryList);
    }

    $scope.backUpData = {};

    $scope.setEmpty = function () {
        $scope.category.name = null;
        $scope.category.des = null;
    };

    let getCategoryList = function () {
        $http.get('/api/category/list').then(function (d) {
            $scope.categoryList = d.data.categoryList;
        });
    };

    $scope.addCategory = function () {
        if ($scope.category.name) {
            let params = {
                name: $scope.category.name,
                des: $scope.category.des
            };

            $http.post('/api/category', params).then(function (d) {
                $scope.setEmpty();
                getCategoryList();
            });
        } else {
            // error popup
        }
    };

    $scope.updateCategory = function (category) {
        if (category.name) {
            let params = {

                name: category.name,
                des: category.des
            };

            $http.put('/api/category/' + category.id, params).then(function (d) {
                $scope.backUpData = {};
                getCategoryList();
            });
        }
    };

    $scope.removeCategory = function (category) {
        $http.delete('/api/category/' + category.id).then(function (d) {
            getCategoryList();
        });
    };


    let editingIndex = '';
    $scope.editCategory = function (index) {
        let category = $scope.categoryList[index];
        $scope.cancelEditCategory(editingIndex);
        editingIndex = index;
        $scope.backUpData = {
            name: category.name,
            des: category.des
        };
        category.editable = true;
    };

    $scope.cancelEditCategory = function (index) {
        let category = $scope.categoryList[index];
        if (!category) {
            return;
        }
        category.name = $scope.backUpData.name;
        category.des = $scope.backUpData.des;
        category.editable = false;
        $scope.backUpData = {};
        editingIndex = '';
    };

});
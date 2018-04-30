angular.module('app').service('modal', function ($uibModal) {
    var result = {};
    result.defaultOptions = {
        title: '',
        content: '',
        onlyClose: false,
        okFunction: function () {

        },
        closeFunction: function () {

        },
        okBtnName: 'OK',
        closeBtnName: 'Close'
    };

    result.open = function (modalOptions) {
        let modalInstance = $uibModal.open({
            templateUrl: 'modules/services/modal/modal.html',
            backdrop: 'static',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                let options = result.defaultOptions;

                if (angular.isDefined(modalOptions)) {
                    angular.extend(options, modalOptions);
                }

                $scope.modalOptions = options;

                $scope.apply = function () {
                    options.okFunction();
                    $uibModalInstance.close();
                };

                $scope.close = function () {
                    options.closeFunction();
                    $uibModalInstance.close();
                };
            }]
        });

        return modalInstance;
    };

    return result;
});
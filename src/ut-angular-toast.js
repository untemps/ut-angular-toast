(function () {
    'use strict';

    var module = angular.module('untemps.utToast', []);
    module.constant('utToastType', ['success', 'error', 'warning', 'info', 'neutral']);
    module.factory('Toast', ['utToastType', Toast]);
    module.controller('utToastController', ['utToast', utToastController]);
    module.service('utToast', ['$rootScope', '$window', '$compile', '$timeout', 'Toast', utToast]);

    /**
     * @ngdoc service
     * @name Toast
     * @description Toast object.
     *
     */
    function Toast(utToastType) {
        return function (type, text, delay) {
            var __this = this;

            var resolveType = function (type) {
                var result = 5;
                if (angular.isNumber(type)) {
                    result = Math.max(0, Math.min(utToastType.length, Math.floor(type)));
                } else if (angular.isString(type)) {
                    var index = utToastType.indexOf(type);
                    if (index > -1) {
                        result = index + 1;
                    }
                }
                return result;
            };

            __this.uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                /*jslint bitwise: true */
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16).toLocaleUpperCase();
            });
            __this.type = resolveType(type);
            __this.text = text;
            __this.delay = delay || 5000;
        };
    }

    /**
     * @ngdoc controller
     * @name utToastController
     * @description Controller for the toast container.
     *
     */
    function utToastController(utToast) {
        /*jshint validthis: true */
        var __this = this;

        __this.toasts = utToast.toasts;

        /**
         * Remove toast by index.
         * @param index Index of the toast to remove.
         */
        __this.remove = function (index) {
            utToast.remove(index);
        };
    }

    /**
     * @ngdoc service
     * @name utToast
     * @description Manage the toasts.
     *
     */
    function utToast($rootScope, $window, $compile, $timeout, Toast) {
        /*jshint validthis: true */
        var __this = this;

        __this.toasts = [];

        /**
         * Append a toast.
         * @param type  Toast type ('success'|'error'|'info'|'warning'|'neutral').
         * @param text  Message to display.
         * @param delay Display delay.
         */
        __this.append = function (type, text, delay, stack) {
            var toaster = $window.document.getElementsByClassName('toaster');
            if(toaster.length === 0) {
                var scope = $rootScope.$new();
                var template = '<div class="toaster" ng-controller="utToastController as ctrl">' +
                    '<div ng-repeat="toast in ctrl.toasts" ng-class="{success: toast.type===1, error: toast.type===2, warning: toast.type===3, info: toast.type===4, neutral: toast.type===5}">' +
                    '<span class="close" ng-click="ctrl.remove(toast)"></span>' +
                    '<span class="text" ng-bind-html="toast.text"></span>' +
                    '</div>' +
                    '</div>';
                var linkFn = $compile(template)(scope);
                angular.element($window.document.body).append(linkFn);
            }

            if(!stack) {
                __this.removeAll();
            }

            var toast = new Toast(type, text, delay);
            toast.timeout = $timeout(function () {
                __this.remove(toast);
            }, toast.delay);
            __this.toasts.push(toast);

            return toast;
        };

        /**
         * Remove toast.
         * @param toast Toast to remove.
         */
        __this.remove = function (toast) {
            $timeout.cancel(toast.timeout);
            toast.timeout = undefined;
            __this.toasts.splice(__this.toasts.indexOf(toast), 1);

            return __this.toasts.indexOf(toast) === -1;
        };

        /**
         * Remove all current toasts.
         */
        __this.removeAll = function () {
            while (__this.toasts.length > 0) {
                __this.remove(__this.toasts[0]);
            }

            return __this.toasts.length === 0;
        };

        $rootScope.$on('destroy', function() {
           __this.removeAll();
        });
    }
})();
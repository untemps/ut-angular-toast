/*!
 * angular-directive-boilerplate
 * https://github.com/mohsen1/angular-directive-boilerplate
 * Version: 0.0.8 - 2015-10-01T14:47:00.783Z
 * License: MIT
 */


(function () {
    'use strict';

    var module = angular.module('untemps.utToast', []);
    module.constant('utToastConstant', {delay: 5000});
    module.factory('utToastFactory', [utToastFactory]);
    module.directive('utToast', ['utToastFactory', utToast]);
    module.directive('utToastMessage', ['$animate', '$timeout', 'utToastFactory', 'utToastConstant', utToastMessage]);

    /**
     * @ngdoc service
     * @name utToastFactory
     * @description // TODO: To complete
     *
     */
    function utToastFactory () {
        /*jshint validthis: true */
        var __this = this;

        __this.messages = [];

        __this.add = function(message, level) {
            var lines = message;
            if(typeof message == 'string') {
                lines = [message];
            }
            __this.messages.push({lines: lines, level: level});
        };

        __this.remove = function(index) {
            __this.messages.splice(index, 1);
        };

        __this.removeAll = function() {
            __this.messages = [];
        };

        return __this;
    }

    /**
     * @ngdoc directive
     * @name utToast
     * @description // TODO: To complete
     *
     */
    function utToast(utToastFactory) {

        return {
            template: '<ul>' +
            '<li ng-repeat="message in messages" ng-class="{info: message.level==0, error: message.level==1, warn: message.level==2, success: message.level==3}">' +
            '<toast-message index="$index" lines="message.lines" level="message.level">' +
            '</li>' +
            '</ul>',
            restrict: 'AEC',
            compile: function(element, attrs) {
                return function(scope) {
                    scope.messages = utToastFactory.messages;
                };
            }
        };
    }

    /**
     * @ngdoc directive
     * @name utToast
     * @description // TODO: To complete
     *
     */
    function utToastMessage ($animate, $timeout, utToastFactory, utToastConstant) {
        return {
            template: '<div>' +
            '<div class="toast-line-container">' +
            '<span class="toast-line" ng-repeat="line in lines">{{line}}</span>' +
            '</div>' +
            '<span class="toast-close glyphicon glyphicon-remove" aria-hidden="true" ng-click="remove()"></span>' +
            '</div>',
            restrict: 'EA',
            replace: true,
            scope: {
                index: '=',
                lines: '=',
                level: '='
            },
            controller: function($scope) {
                $scope.remove = function() {
                    utToastFactory.remove($scope.index);
                    $scope.$apply();
                };
            },
            link: function(scope, element, attrs){
                $timeout(function () {
                    scope.remove();
                }, utToastConstant.delay);
            }
        };
    }
})();
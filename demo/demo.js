(function () {
    'use strict';

    var module = angular.module('demo', ['ngSanitize', 'untemps.utToast']);
    module.controller('demoController', ['utToast', demoController]);

    function demoController(utToast) {
        var __this = this;

        __this.delay = 5000;
        __this.text = 'Test';
        __this.types = [
            {label: 'success', value: 1},
            {label: 'error', value: 2},
            {label: 'warning', value: 3},
            {label: 'info', value: 4},
            {label: 'neutral', value: 5}
        ];
        __this.type = __this.types[0];

        __this.toast = function() {
            utToast.append(__this.type.value, __this.text, Math.min(20000, Math.max(1000, __this.delay)));
        };

        __this.removeAllToasts = function() {
            utToast.removeAll();
        };
    }
})();
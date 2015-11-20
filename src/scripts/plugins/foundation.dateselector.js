;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.dateselector = {
        name : 'dateselector',

        version : '5.5.3',

        settings : {
            callback : function () {}
        },

        init : function (scope, method, options) {
            var self = this;

            this.bindings(method, options);

            self.S('[' + this.attr_name() + ']', this.scope).each(function () {
                var selector = $(this);

                self.initDatepicker(selector.find('input[type="text"]').get(0));
            });
        },

        initDatepicker: function (el) {
            var self = this,
                dp = rome(el);

            dp.on('data', function (date) {
                console.log('selected datetime!');

                self.S(el).trigger('dateselected.fndtn.dateselector', date);
            });
        },

        events : function () {
            var self = this,
                S = this.S;

            S(this.scope)
                .off('.offcanvas')
                .on('dateselected.fndtn.dateselector', 'input[type="text"]', function (e) {
                    console.log('callback');
                })
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));

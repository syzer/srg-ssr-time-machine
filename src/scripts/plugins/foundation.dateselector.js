;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.dateselector = {
        name : 'dateselector',

        version : '5.5.3',

        currentDate: 'none',

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

            this.currentDate = 'none';
        },

        initDatepicker: function (el) {
            var self = this,
                dp = rome(el, {
                    inputFormat: "YYYY-MM-DD"
                });

            dp.on('data', function (date) {

                // TODO: investigate dual fireing
                if (self.currentDate === date) {
                    return;
                }

                console.log('selected datetime!');

                self.S(el).trigger('dateselected.fndtn.dateselector', date);

                self.currentDate = date;
            });
        },

        events : function () {
            var self = this,
                S = this.S;

            S(this.scope)
                .off('.offcanvas');
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));

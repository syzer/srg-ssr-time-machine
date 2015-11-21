;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.dataloader = {
        name : 'dataloader',

        version : '5.5.3',

        settings : {
            callback : function () {}
        },

        init : function (scope, method, options) {
            var self = this;

            this.bindings(method, options);

            self.events();
        },

        events : function () {
            var self = this,
                S = this.S;

            S(this.scope)
                .on('dateselected.fndtn.dateselector', function (e, date) {
                    $.get(SSR.endpoints.ssr.schedules + date, {
                            channel: 'RTS1'
                        },
                        function (data) {

                            console.log('triggered dataloader.fndtn.schedulesloaded event');

                            $(window).trigger('dataloader.fndtn.schedulesloaded', data);

                            //$.get(SSR.endpoints.ssr.schedules + '/' + date, function (data) {
                            //    $(window).trigger('dataloader.fndtn.broadcastsloaded', data);
                            //});
                        });
                });
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));

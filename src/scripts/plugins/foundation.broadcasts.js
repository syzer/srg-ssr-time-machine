;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.broadcasts = {
        name : 'broadcasts',

        version : '5.5.3',

        settings : {
            callback : function () {}
        },

        init : function (scope, method, options) {
            var self = this;

            this.bindings(method, options);

            self.S('[' + this.attr_name() + ']', this.scope).each(function () {
                var selector = $(this);
            });

            self.events();
        },

        updateList: function (data) {
            var self = this,
                container = this.S('#broadcasts'),
                items = '';

            $.each(data.schedules[0].broadcasts, function (index, broadcast) {

                if (broadcast.videos.length === 0) {
                    return;
                }

                items += '<tr><td>' + broadcast.titles[0] + '</td>';

                items += '<td>';

                $.each(broadcast.videos, function (index, video) {

                    $.ajax('/videos/' + video.id + '.json',
                        {
                            async: false
                        }
                    ).done(function(videoData) {
                        if (videoData.streams.tv === undefined) {
                            items += videoData.title;
                        } else {
                            items += '<a class="fancybox" href="'  + videoData.streams.tv + '">' + videoData.title +'</a>';
                        }

                        items += '<br /><br />';
                    });
                });

                items += '</td>';

                items += '</tr>';
            });

            container.find('tbody').html(items).parent('table').removeClass('hide');

            jQuery('.fancybox').each(function () {

                $(this).on('click', function (e) {
                    e.preventDefault();
                    $(this).fancybox();

                });
            });
        },

        events : function () {
            var self = this,
                S = this.S;

            S(window).on('dataloader.fndtn.schedulesloaded', function (event, data) {
                self.updateList(data);
            });

            //S().on('dataloader.fndtn.schedulesloaded', function (event, data) {
            //    self.updateList(data);
            //});

            S(".fancybox").on('click', function (e) {
                e.preventDefault();
                console.log(this);
            });
        },

        reflow : function () {}
    };
}(jQuery, window, window.document));

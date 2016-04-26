/**
 * 日历组件
 * @date 2015-03-17 17:21:25
 * @author vfasky <vfasky@gmail.com>
 */

define('m2/widgetDate', ['jquery', 'm2/widgetBase', 'rivets', 'touch'],
    function($, Widget, rivets, touch) {
        var UI = Widget.subclass({
            constructor: Widget.prototype.constructor,
            init: function() {
                //transform: translate3d(0px, -190px, 0px);
                this.$soure.attr('readonly', 'readonly');

                this.format = this.$soure.data('format') || 'yyyy-MM-dd';
                this.default = this.$soure.data('default') || null;
                this.showClear = this.$soure.attr('data-showClear') || false;
                this.years = [];
                this.months = [];
                this.dates = [];

                var i, len;
                var date = new Date();
                for (i = date.getFullYear() - 50, len = date.getFullYear(); i <= len; i++) {
                    this.years.push(i);
                }
                for (i = 1; i < 13; i++) {

                    this.months.push(i < 10 ? '0' + i : String(i));
                }
                for (i = 1; i < 32; i++) {

                    this.dates.push(i < 10 ? '0' + i : String(i));
                }

                var self = this;
                this.loadTpl('m2/widgetDate.html').done(function(html) {
                    self.$el = $(html).hide();
                    self.$el.appendTo(self.$soure.parent());
                    rivets.bind(self.$el, {
                        app: self
                    });

                    self.select(date.getFullYear(), date.getMonth() + 1, date.getDate());
                    if (self.default) {
                        self.select(self.default.split('-')[0], self.default.split('-')[1], self.default.split('-')[2] || '');
                    }
                    self.watch();
                });
            },
            watch: function() {
                if (this._initWatch) {
                    return;
                }
                this._initWatch = true;
                var self = this;
                var popEl = this.$el.find('.date-pop')[0];
                touch.on(popEl, 'touchstart', '.date-box', function(ev) {
                    ev.preventDefault();
                });

                this.$soure.on('click', function() {
                    self.$el.show();
                    self.select(self.year, self.month, self.date);
                    return false;
                });

                touch.on(popEl, 'swipeup', '.years-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(Number(self.year) + 1, self.month);
                });

                touch.on(popEl, 'swipedown', '.years-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(Number(self.year) - 1, self.month);
                });

                touch.on(popEl, 'swipeup', '.month-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(self.year, Number(self.month) + 1);
                });

                touch.on(popEl, 'swipedown', '.month-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(self.year, Number(self.month) - 1);
                });

                touch.on(popEl, 'swipeup', '.date-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(self.year, self.month, Number(self.date) + 1);
                });

                touch.on(popEl, 'swipedown', '.date-ul', function(ev) {
                    var $el = $(ev.target);
                    if ($el.is('ul') === false) {
                        $el = $el.parent();
                    }
                    self.select(self.year, self.month, Number(self.date) - 1);
                });



                // touch.on($(popEl).find('.yes'), 'tap', function() {

                //     return false;
                // }).on($(popEl).find('.no'), 'tap', function() {

                //     return false;
                // });
                touch.on(popEl, 'click', '.link-clear', function() {
                    var value = '至今';
                    self.$soure.val(value);
                    self.obsSet('');
                    self.$el.hide();
                });




            },
            select: function(year, month, date) {

                var year = Number(year);
                var month = Number(month) < 10 ? '0' + Number(month) : String(month);
                var _date = Number(date) < 10 ? '0' + Number(date) : String(date);

                //console.log(this.year, this.month);

                var $years = this.$el.find('.years-ul');
                var $year = $years.find('[data-val=' + year + ']');

                var $months = this.$el.find('.month-ul');
                var $month = $months.find('[data-val=' + month + ']');



                if ($year.length === 0 || $month.length === 0) {
                    return false;
                }
                this.year = year;
                this.month = month;


                var _yheight = $year.outerHeight() - 6;
                //if($year.is('.active') === false){
                var yposition = $year.position();
                var ytransform = 'translate3d(0px, ' + -(yposition.top - _yheight) + 'px, 0px)';

                $years.css({
                    transform: ytransform,
                    '-webkit-transform': ytransform,
                    'transition-duration': '600ms',
                    '-webkit-transition-duration': '600ms'
                });
                $years.find('li.active').removeClass('active');
                $year.addClass('active');
                //}
                var _mheight = $month.outerHeight() - 6
                    //if($month.is('.active') === false){
                var mposition = $month.position();
                var mtransform = 'translate3d(0px, ' + -(mposition.top - _mheight) + 'px, 0px)';

                $months.css({
                    transform: mtransform,
                    '-webkit-transform': mtransform,
                    'transition-duration': '600ms',
                    '-webkit-transition-duration': '600ms'
                });
                $months.find('li.active').removeClass('active');
                $month.addClass('active');
                //}
                //
                if (date != undefined && this.format == 'yyyy-MM-dd') {

                    var $dates = this.$el.find('.date-ul');
                    var $date = $dates.find('[data-val=' + _date + ']');
                    if ($date.length === 0) {
                        return false;
                    }
                    this.date = date;
                    var _dheight = $date.outerHeight() - 6
                        //if($month.is('.active') === false){
                    var dposition = $date.position();
                    // console.log('$date', $date);
                    var dtransform = 'translate3d(0px, ' + -(dposition.top - _dheight) + 'px, 0px)';

                    $dates.css({
                        transform: dtransform,
                        '-webkit-transform': dtransform,
                        'transition-duration': '600ms',
                        '-webkit-transition-duration': '600ms'
                    });
                    $dates.find('li.active').removeClass('active');
                    $date.addClass('active');
                }

            },
            update: function(value) {
                if (!value) {
                    this.$soure.val('');
                    return false;
                }
                if (value.indexOf('-') > 0) {
                    var tmp = value.split('-');
                    if (tmp.length >= 2) {
                        this.select(tmp[0], tmp[1]);
                        this.$soure.val(value);
                    }
                }
            },
            yesClick: function() {
                var self = this;
                var value = self.year + '-' + self.month;
                if (self.format == 'yyyy-MM-dd') {
                    value = value + '-' + self.date;
                }
                //console.log(value);
                self.$soure.val(value);
                self.obsSet(value);
                self.$el.hide();
                return false;
            },
            cancleClick: function() {
                var self = this;
                self.$el.hide();
                return false;
            }
        });

        rivets.binders.date = {
            bind: function(el) {
                this.ui = new UI(el, this);
            },
            unbind: function() {
                //this.ui.$el.remove();
            },
            routine: function(el, value) {
                this.ui.update(value);
            }
        };
    }
);

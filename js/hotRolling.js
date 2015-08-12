/* --------------------------------------------------------------------
# Version 1.0
# Author :
  _____            _____
 | ___ \          |  _  \
 | |_/ / __ _  ___| | | |___  _ __ __ _ _____   _
 | ___ \/ _` |/ _ \ | | / _ \| '__/ _` |_  / | | |
 | |_/ / (_| |  __/ |/ / (_) | | | (_| |/ /| |_| |
 \____/ \__,_|\___|___/ \___/|_|  \__,_/___|\__, |
                                             __/ |
                                            |___/
# Dependency
    jquery 1.+, 2.+

# Usage
    $(ele).hotRolling();
    $(ele).hotRolling(500);
    arguments: interval option

# description
    Korea Web portal site "Naver" component hotranking same function
--------------------------------------------------------------------*/
(function($) {
    $.fn.hotRolling = function(options) {
        var defaults = {
            duration: 500,
            pause: 500
        }

        var roll = function() {
            render();
            currIdx = getNextIdx();
        }

        var getNextIdx = function(){
            if((currIdx + 1)  > maxIdx) {
                return 0;
            }
            return (currIdx + 1);
        }

        var getPrevIdx = function(){
            if((currIdx - 1) < 0) {
                return maxIdx
            }
            return currIdx - 1;
        }

        var render = function() {
            initFlag && list.eq(getPrevIdx()).animate({top:"-100%"}, opt.duration, function() {
                $(this).css({top: "100%"});
            });
            list.eq(currIdx).animate({top:0}, opt.duration);
            initFlag = true;
        }

        var opt = $.extend({}, defaults, options);

        var timer,
            list = this.find('li'),
            currIdx = 0,
            maxIdx = list.length - 1,
            initFlag = false;
            interval = opt.duration + opt.pause;

        this.on("mouseenter",function() {
            clearInterval(timer);
        });

        this.on("mouseleave",function() {
            timer = setInterval(roll, interval);
        }).trigger("mouseleave");
        list.css({top: "100%"});

        return this;
    }
})(jQuery);
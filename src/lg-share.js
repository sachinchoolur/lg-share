(function() {

    'use strict';

    var defaults = {
        share: true,
        facebook: true,
        facebookDropdownText: 'Facebook',
        twitter: true,
        twitterDropdownText: 'Twitter',
        googlePlus: true,
        googlePlusDropdownText: 'GooglePlus',
        pinterest: true,
        pinterestDropdownText: 'Pinterest'
    };

    var Share = function(element) {

        this.core = $(element).data('lightGallery');

        this.core.s = $.extend({}, defaults, this.core.s);
        if (this.core.s.share) {
            this.init();
        }

        return this;
    };

    Share.prototype.init = function() {
        var _this = this;
        var shareHtml = '<span id="lg-share" class="lg-icon">' +
            '<ul class="lg-dropdown" style="position: absolute;">';
        shareHtml += _this.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + '</span></a></li>' : '';
        shareHtml += _this.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + '</span></a></li>' : '';
        shareHtml += _this.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + '</span></a></li>' : '';
        shareHtml += _this.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + '</span></a></li>' : '';
        shareHtml += '</ul></span>';

        this.core.$outer.find('.lg-toolbar').append(shareHtml);
        this.core.$outer.find('.lg').append('<div id="lg-dropdown-overlay"></div>');
        $('#lg-share').on('click.lg', function(){
            _this.core.$outer.toggleClass('lg-dropdown-active');
        });

        $('#lg-dropdown-overlay').on('click.lg', function(){
            _this.core.$outer.removeClass('lg-dropdown-active');
        });

        _this.core.$el.on('onAfterSlide.lg.tm', function(event, prevIndex, index) {

            setTimeout(function() {
	            
	            var fbUrl, twUrl, twText, gpUrl, piUrl, piText, piMedia;
	            fbUrl = twUrl = gpUrl = piUrl = window.location.href;
	            twText = piText = piMedia = '';
	            
	            // Check whether it is a jQuery instance or dynamicEl
	            if ( _this.core.$items instanceof jQuery ) {
		            var $item = _this.core.$items.eq(index);
		            
		            // Facebook url
		            fbUrl     = $item.attr('data-facebook-share-url') || fbUrl;
		            
		            // Twitter url + text
		            twUrl     = $item.attr('data-twitter-share-url') || twUrl;
		            twText    = $item.attr('data-tweet-text');
		            
		            // Google+ url
		            gpUrl     = $item.attr('data-googleplus-share-url') || gpUrl;
		            
		            // Pinterest url + media + text
		            piUrl     = $item.attr('data-pinterest-share-url') || piUrl;
		            piText    = $item.attr( 'data-pinterest-text' );
		            piMedia   = $item.attr( 'href' ) || $item.data( 'data-src' );
		            
	            } else {
		            var item  = _this.core.$items[ index ];
		            
		            // Facebook url
		            fbUrl     = 'facebookShareUrl' in item ? item.facebookShareUrl : fbUrl;
		            
		            // Twitter url + text
		            twUrl     = 'twitterShareUrl' in item ? item.twitterShareUrl : twUrl;
		            twText    = 'tweetText' in item ? item.tweetText : twText;

		            // Google+ url
		            gpUrl     = 'googleplusShareUrl' in item ? item.googleplusShareUrl : gpUrl;
		            
		            // Pinterest url + media + text
		            piUrl     = 'pinterestShareUrl' in item ? item.pinterestShareUrl : piUrl;
		            piText    = 'pinterestText' in item ? item.pinterestText : piText;
		            piMedia   = 'src' in item ? item.src : piMedia;
	            }
	            
	            $('#lg-share-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + (encodeURIComponent( fbUrl )));

                $('#lg-share-twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + twText + '&url=' + (encodeURIComponent( twUrl )));

                $('#lg-share-googleplus').attr('href', 'https://plus.google.com/share?url=' + (encodeURIComponent( gpUrl )));

                $('#lg-share-pinterest').attr('href', 'http://www.pinterest.com/pin/create/button/?url=' + (encodeURIComponent( piUrl )) + '&media=' + encodeURIComponent( piMedia ) + '&description=' + piText);

            }, 100);
        });
    };

    Share.prototype.destroy = function() {

    };

    $.fn.lightGallery.modules.share = Share;

})();


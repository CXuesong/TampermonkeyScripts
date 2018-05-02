// ==UserScript==
// @name         SSSS Helper
// @namespace    http://cxuesong.com/
// @version      0.2.0
// @updateURL    https://raw.githubusercontent.com/CXuesong/TampermonkeyScripts/master/SSSSHelper/helper.js
// @homepage     https://github.com/CXuesong/TampermonkeyScripts/tree/master/SSSSHelper
// @description  Makes SSSS web-comic more accessible to PC users. (Plus aRTD now.)
// @author       CXuesong
// @match        http://sssscomic.com/comic.php*
// @match        http://www.minnasundberg.fi/comic/page*
// @match        http://www.minnasundberg.fi/comic/sivu*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.slim.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var prevUrl = $("#navprev2b").parent().attr("href") || $('img[src*="aprev.jpg"]').parent().attr("href");
    var nextUrl = $("#navnext2b").parent().attr("href") || $('img[src*="anext.jpg"]').parent().attr("href");
    console.log("PrevUrl: %s, NextUrl: %s", prevUrl, nextUrl);
    $("body").keydown(function (e) {
        var keyCode = e.which || e.keyCode;
        if (keyCode == 37)
        {
            if (prevUrl)
            {
                if ($("body").scrollLeft() === 0)
                    window.open(prevUrl, "_self");
            }
        } else if (keyCode == 39) {
            if (nextUrl)
            {
                var fullWidth = $("body").prop("scrollWidth");
                if (!fullWidth || $("body").innerWidth() + $("body").scrollLeft() === fullWidth)
                    window.open(nextUrl, "_self");
            }
        }
    });
})();

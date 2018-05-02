// ==UserScript==
// @name         Github traveler
// @namespace    http://cxuesong.com/
// @version      0.1.1
// @updateURL    https://raw.githubusercontent.com/CXuesong/TampermonkeyScripts/master/GitTraveler/traveler.js
// @homepage     https://github.com/CXuesong/TampermonkeyScripts/tree/master/GitTraveler
// @description  Try to take over the world!
// @author       CXuesong
// @match        https://github.com/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// @grant        GM_setClipboard
// ==/UserScript==
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

(function() {
    'use strict';
    // Your code here...
    function InferRepositoryQuailfiedName()
    {
        var match = location.pathname.match(/([^\/]+)\/([^\/]+)/);
        return match[1] + "/" + match[2];
    }
    function InferWorkItemInfo()
    {
        var match = location.pathname.match(/([^\/]+)\/([^\/]+)\/(issues|pull)\/([^\/]+)/);
        if (!match) return null;
        var type = null;
        switch (match[3])
        {
            case "issues": type = "issue"; break;
            case "pull": type = "pr"; break;
            default: return null;
        }
        return {
            user: match[1],
            repo: match[2],
            type: type,
            id: match[4],
            qualifiedName: match[1] + "/" + match[2] + "#" + match[4]
        };
    }
    function InferCommitInfo()
    {
        var match = location.pathname.match(/([^\/]+)\/([^\/]+)\/(commit)\/([0-9a-z]+)/);
        if (!match) return null;
        return {
            user: match[1],
            repo: match[2],
            type: "commit",
            id: match[4],
            qualifiedName: match[4] + "@" + match[1] + "/" + match[2]
        };
    }
    function init()
    {
        var info = InferWorkItemInfo() || InferCommitInfo();
        if (info)
        {
            var container = null;
            var buttonClass = null;
            var prependButton = false;
            switch (info.type)
            {
                case "issue":
                case "pr":
                    container = $(".gh-header-actions");
                    buttonClass = "btn btn-sm float-right";
                    break;
                case "commit":
                    container = $(".full-commit");
                    buttonClass = "btn btn-outline float-right";
                    prependButton = true;
            }
            var button = $("<button></button>").addClass(buttonClass).text("Copy full ID").click(function(e) {
                GM_setClipboard(info.qualifiedName, "text");
                e.target.innerText = "Copied!";
            });
            if (prependButton)
            {
                button.prependTo(container);
            } else {
                button.appendTo(container);
            }
        }
    }
    window.addEventListener("pjax:complete", function (e) {
        init();
    }, false);
    init();
})();
/*
    url: https://github.com/quadrant-newmedia/HistoryInvalidation
    license: https://github.com/quadrant-newmedia/HistoryInvalidation/blob/master/LICENSE
*/
(function() {
    'use strict';
    function is_definitely_reloading() {
        try {
            return performance.getEntriesByType('navigation')[0].type == 'reload';
        } catch (e) {
            // If the browser doesn't support Performance API, we can't say for sure that the page is reloading
            return false
        }
    }
    if (
        !history.state || !history.state.HistoryInvalidation_loaded // This page was just navigated to. Assume it's fresh. You need to set caching headers such that pages aren't normally cached
        || is_definitely_reloading()
    ) {
        set_load_time();
    }
    function set_load_time() {
        var state = history.state || {};
        state.HistoryInvalidation_loaded = Date.now();
        history.replaceState(state, document.title, location.href);
    }
    function reload_if_stale() {
        if (!localStorage.HistoryInvalidation_invalidated) return
        if (localStorage.HistoryInvalidation_invalidated < history.state.HistoryInvalidation_loaded) return
        set_load_time();
        location.reload();
    }
    // We want to run as early as possible, so run now
    reload_if_stale();

    // pageshow will fire when page first loads (redundant, but not an issue), as well as each time it is loaded from bf cache (this part is important)
    addEventListener('pageshow', reload_if_stale);

    /*
        Public API.
    */
    window.HistoryInvalidation = {
        invalidate: function() {
            localStorage.HistoryInvalidation_invalidated = Date.now();
        },
    };
})();
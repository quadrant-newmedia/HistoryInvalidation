/*
    url: https://github.com/quadrant-newmedia/HistoryInvalidation
    license: https://github.com/quadrant-newmedia/HistoryInvalidation/LICENSE
*/
(function() {
    'use strict';
    if (!history.state || !history.state.back_reload_loaded) {
        set_load_time();
    }
    function set_load_time() {
        var state = history.state || {};
        state.back_reload_loaded = Date.now();
        history.replaceState(state, document.title, location.href);
    }
    function reload_if_stale() {
        if (!localStorage.back_reload_invalidated) return
        if (localStorage.back_reload_invalidated < history.state.back_reload_loaded) return
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
            localStorage.back_reload_invalidated = Date.now();
        },
    };
})();.
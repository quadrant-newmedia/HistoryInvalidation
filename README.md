# HistoryInvalidation.js

A simple utility to help invalidate the user's session history, so that stale history entries get reloaded when the user returns to them. Use with the "detail -> edit -> back()" pattern.

## Usage

    - add `<script async=true src="my_static_files/HistoryInvalidation.js"></script>` to any page that might need to be invalidated AND to any page that needs to invalidate others
    - call `HistoryInvalidation.invalidate()` as needed

Note - setting `async=true` is somewhat important. When returning to stale pages, you want them to run as soon as possible.

Also note - if it weren't for the async requirement, we'd have added this functionality to NavTricks.js. NavTricks cannot (easily) be used with async, so we can't combine the two.

// need: theme.js
/* use:
    function hoge() {}
    themeInitializers.push(hoge);
*/

function offcanvasShown() {
    UIkit.util.on('#offcanvas', 'shown', function () {
        $("#offcanvas .uk-offcanvas-close").eq(0).focus();
    });
}

themeInitializers.push(offcanvasShown);

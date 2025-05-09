console.log('registering helpers...');
window.Handlebars.registerHelper('truncate', function (str, len) {
    if (str && str.length > len) {
        var new_str = str.substring(0, len+1).replace(/\s+\S*$/, '');
        return new window.Handlebars.SafeString(new_str + '...');
    }
    return str;
});

window.Handlebars.registerHelper('ifEq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

window.Handlebars.registerHelper('fNum', function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
});
"use strict";

exports.__esModule = true;
var secsToTime = function secsToTime(secs) {
    var isNegative = false;
    if (secs < 0) {
        isNegative = true;
        secs = Math.abs(secs);
    }

    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "n": isNegative,
        "h": hours < 10 ? '0' + hours.toString() : hours.toString(),
        "m": minutes < 10 ? '0' + minutes.toString() : minutes.toString(),
        "s": seconds < 10 ? '0' + seconds.toString() : seconds.toString()
    };
    return obj;
};

exports["default"] = secsToTime;
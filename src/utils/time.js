export function utcToIso(utc_seconds) {
    var s = new Date(utc_seconds * 1e3).toISOString();
    return s;
}

export function utcToTime(utc_seconds) {
    var s = new Date(utc_seconds * 1e3).toISOString().split('T')[1].split('.')[0].split(':');
    return s[0]+':'+s[1];
}

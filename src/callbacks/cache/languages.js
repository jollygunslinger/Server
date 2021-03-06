"use strict";

function cache() {
    if (!settings.server.rebuildCache) {
        return;
    }
    
    let base = json.parse(json.read("db/cache/languages.json"));

    for (let file in db.locales) {
        let fileData = json.parse(json.read(db.locales[file][file]));
        base.data.push(fileData);
    }

    base.crc = utility.adlerGen(json.stringify(base.data));
    json.write("user/cache/languages.json", base);
}

server.addStartCallback("cacheLanguages", cache);
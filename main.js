'use strict';

function parseFile(file) {
    if (file === undefined)
        return; // user chose 'Cancel'

    if (/video\/.*/i.exec(file.type))
        parseVideoFile(file);
    else
        parseTextFile(file);
}

function clearForms() {
    var text = document.getElementById('textin');
    text.value = '';

    text = document.getElementById('textout');
    text.value = '';
}

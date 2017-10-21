'use strict';

function parseFile(file) {
    if (file === undefined)
        return; // user chose 'Cancel'

    try {
        if (/video\/.*/i.exec(file.type))
            parseVideoFile(file);
        else
            parseTextFile(file);
    } catch(err) {
        alert('Error ' + err.name + ':' + err.message + '\n' + err.stack);
    }
}

function clearForms() {
    var text = document.getElementById('textin');
    text.value = '';

    text = document.getElementById('textout');
    text.value = '';
}

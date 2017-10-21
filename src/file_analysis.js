'use strict';

function parseText(text) {
    var words = analyzeText(text);
    visualize(words);
}

function parseTextFile(file) {
    var reader = new FileReader();

    reader.onload = function() {
        parseText(reader.result);
    };

    reader.readAsText(file);
}

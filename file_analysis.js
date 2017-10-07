'use strict';

function parseTextFile(file) {
    var reader = new FileReader();

    reader.onload = function() {
        var text = reader.result;
        var words = analyzeText(text);
        visualize(words);
    };

    reader.readAsText(file);
}

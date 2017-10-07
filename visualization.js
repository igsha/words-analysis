'use strict';

function putResultsInTable(header, content) {
    var tbl  = document.getElementById('output');
    tbl.innerHTML = '';

    var tr = tbl.insertRow();
    for (var x of header) {
        var td = tr.insertCell();
        td.innerHTML = x;
    }

    for (var i in content) {
        var tr = tbl.insertRow();
        for (var j in content[i]) {
            var td = tr.insertCell();
            var value = content[i][j];
            if (typeof(value) === "number" && (value % 1) != 0)
                value = value.toFixed(2) + '%'
            td.innerHTML = value;
        }
    }
}

function visualize(words) {
    var header = ['Word', 'Frequency', 'Count', 'Stem'];
    putResultsInTable(header, words);
}

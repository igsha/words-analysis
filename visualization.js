'use strict';

function putResultsInTable(content) {
    var tbody = document.createElement('tbody');

    for (var i in content) {
        var tr = tbody.insertRow();
        for (var j in content[i]) {
            var td = tr.insertCell();
            var value = content[i][j];
            if (typeof(value) === 'number' && (value % 1) != 0)
                value = value.toFixed(2) + '%'
            td.innerText = value;
        }
    }

    var tbl  = document.getElementById('output');
    if (tbl.tBodies.length == 0)
        tbl.appendChild(tbody);
    else
        tbl.tBodies[0].replaceWith(tbody);
}

function visualize(words) {
    putResultsInTable(words);

    var label = document.getElementById('label');
    label.innerHTML = 'Statistic: ' + words.length + ' words, ' + words.reduce((a, x) => a + x.count, 0) + ' total words in the text.';

    document.getElementById('b-csv').disabled = false;
    document.getElementById('b-text').disabled = false;
}

function downloadCsv(table) {
    var text = '';
    for (var i = 0; i < table.rows.length; i++) {
        var cells = [];
        for (var j = 0; j < table.rows[i].cells.length; j++)
            cells.push(table.rows[i].cells[j].innerText);

        text += cells.join(',') + '\n';
    }

    download(text, 'Words.csv', 'text/csv');
}

function downloadText(table) {
    var text = '';
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < rows.length; i++)
        text += rows[i].cells[0].innerText + '\n';

    download(text, 'Words.txt', 'text/plain');
}

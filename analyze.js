'use strict';

var stemmer = snowballFactory.newStemmer('english');

function analyzeWords(words) {
    var dict = new Map;
    var total = 0;
    for (var x in words) {
        var word = words[x];
        if (word.length < 2)
            continue;

        var st = stemmer.stem(word);
        var obj = dict.get(st);
        if (obj === undefined) {
            obj = {count: 0, word: word, forms: new Set([word])};
            dict.set(st, obj);
        }

        obj.count++;
        obj.forms.add(word);

        if (obj.word.length > word.length) {
            console.log('Shorten => ' + word + ' vs. ' + obj.word);
            obj.word = word;
        }

        total++;
    }

    var stats = [];
    for (var [key, value] of dict) {
        stats.push({
            word: value.word,
            freq: value.count * 100 / total,
            count: value.count,
            stem: key,
            forms: Array.from(value.forms).join(';')
        });
    }

    return stats.sort((a, b) => b.count - a.count);
}


function analyzeText(text) {
    var words = text.toLowerCase().match(/([a-z]+)/g);
    return analyzeWords(words);
}

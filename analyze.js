'use strict';

var Lemmatizer = require('javascript-lemmatizer');
var lemmatizer = new Lemmatizer();

function analyzeWords(words) {
    var dict = new Map;
    var total = 0;
    for (var x in words) {
        var word = words[x];
        if (word.length < 2)
            continue;

        var lemmas = lemmatizer.only_lemmas(word);
        if (lemmas.length > 1)
            lemmas = lemmas.filter(x => x != word);
        var key = lemmas.join(';');

        var obj = dict.get(key);
        if (obj === undefined) {
            obj = {count: 0, word: word, forms: new Set};
            dict.set(key, obj);
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
            root: key,
            forms: Array.from(value.forms).join(';')
        });
    }

    return stats.sort((a, b) => b.count - a.count);
}

function analyzeText(text) {
    var words = text.toLowerCase().match(/([a-z]+)/g);
    return analyzeWords(words);
}

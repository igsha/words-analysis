'use strict';

var stemmer = snowballFactory.newStemmer('english');

function analyzeWords(words) {
    var dict = {};
    for (var x in words) {
        var word = words[x];
        if (word.length < 2)
            continue;

        var st = stemmer.stem(word);
        var obj = dict[st];
        if (obj === undefined) {
            obj = {count: 0, word: word};
            dict[st] = obj;
        }

        obj.count++;

        if (obj.word.length > word.length) {
            console.log('Shorten => ' + word + ' vs. ' + obj.word);
            obj.word = word;
        }
    }

    var stats = [];
    for (var x in dict)
        stats.push({word: dict[x].word, freq: dict[x].count * 100 / words.length, count: dict[x].count, stem: x});

    return stats.sort((a, b) => b.count - a.count);
}


function analyzeText(text) {
    var words = text.toLowerCase().match(/([a-z]+)/g);
    return analyzeWords(words);
}

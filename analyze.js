'use strict';

var stemmer = snowballFactory.newStemmer('english');

function analyzeWords(words) {
    var dict = {};
    var total = 0;
    for (var x in words) {
        var word = words[x];
        if (word.length < 2)
            continue;

        var st = stemmer.stem(word);
        var obj = dict[st];
        if (obj === undefined) {
            obj = {count: 0, word: word, forms: {}};
            obj.forms[word] = 1;
            dict[st] = obj;
        }

        obj.count++;
        obj.forms[word] = 1;

        if (obj.word.length > word.length) {
            console.log('Shorten => ' + word + ' vs. ' + obj.word);
            obj.word = word;
        }

        total++;
    }

    var stats = [];
    for (var x in dict) {
        var forms = [];
        for (var i in dict[x].forms)
            forms.push(i);

        stats.push({
            word: dict[x].word,
            freq: dict[x].count * 100 / total,
            count: dict[x].count,
            stem: x,
            forms: forms.join(';')
        });
    }

    return stats.sort((a, b) => b.count - a.count);
}


function analyzeText(text) {
    var words = text.toLowerCase().match(/([a-z]+)/g);
    return analyzeWords(words);
}

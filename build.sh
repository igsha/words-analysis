#!/usr/bin/env bash

JSONMAP=(\
    [1]='"../dict/index.noun.json"' \
    [2]='"../dict/index.verb.json"' \
    [3]='"../dict/index.adj.json"' \
    [4]='"../dict/index.adv.json"' \
    [5]='"../dict/noun.exc.json"' \
    [6]='"../dict/verb.exc.json"' \
    [7]='"../dict/adj.exc.json"' \
    [8]='"../dict/adv.exc.json"' \
)

function seddy
{
    sed -e "
    1i\
    require=
    s;1\(:\[function\);${JSONMAP[$1]}\1;
    \$s|\[1\]);\$|\[${JSONMAP[$1]}\]);|
    "
}

browserify -t browserify-data node_modules/javascript-lemmatizer/dict/index.noun.json | seddy 1 > dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/index.verb.json | seddy 2 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/index.adj.json | seddy 3 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/index.adv.json | seddy 4 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/noun.exc.json | seddy 5 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/verb.exc.json | seddy 6 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/adj.exc.json | seddy 7 >> dictionaries.js
browserify -t browserify-data node_modules/javascript-lemmatizer/dict/adv.exc.json | seddy 8 >> dictionaries.js

browserify -r javascript-lemmatizer -r underscore -o bundle.js

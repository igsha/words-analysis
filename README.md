# words-analysis

Analysing English words within text and video subtitles (mp4 only) using lemmatization algorithm.

# Installation

You should install several libraries and `browserify`:
```sh
$ npm install browserify browserify-data javascript-lemmatization
$ ./build.sh
```

Calling `./build.sh` is needed to pack dictionaries from `javascript-lemmatization`.

Note this process is necessary only if you want to update `bundle.js` and `dictionaries.js`.

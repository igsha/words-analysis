'use strict';

function parseVideoFile(file) {
    var fileSize = file.size;
    var offset = 0;
    var startDate = new Date();
    var chunkSize  = 1024 * 1024; // bytes
    var onBlockRead = null;

    var readBlock = function(offset, length, file) {
        var r = new FileReader();
        var blob = file.slice(offset, length + offset);
        r.onload = onBlockRead;
        r.readAsArrayBuffer(blob);
    }

    var mp4box = new MP4Box();
    mp4box.onError = function(e) {
        console.log("mp4box failed to parse data." + e);
    };
    mp4box.onMoovStart = function() {
        console.log("Starting to receive File Information");
    };
    mp4box.onReady = function(info) {
        var output = document.getElementById('textout');
        var track = null;
        var text;
        for (var t of info.subtitleTracks) {
            console.log([t.id, t.language, t.name, t.codec].join(' ') + '\n');

            if (t.language == 'eng' || t.language == 'und') {
                track = t;
                break;
            }
        }

        if (track === null) {
            alert("No english language track has been found.");
            return;
        }

        mp4box.onSamples = function(id, user, samples) {
            var text = '';
            for (var sample of samples) {
                if (sample.data.length < 3)
                    continue;

                var str = new TextDecoder().decode(sample.data.slice(2));
                text += str + '\n';
            }

            visualize(analyzeText(text));
            user.value = text;
        }

        mp4box.setExtractionOptions(track.id, output, {nbSamples: track.nb_samples});
        mp4box.start();
    };

    onBlockRead = function(evt) {
        if (evt.target.error == null) {
            var buffer = evt.target.result;
            buffer.fileStart = offset;
            mp4box.appendBuffer(buffer);
            offset += evt.target.result.byteLength;
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }
        if (offset >= fileSize) {
            console.log("Done reading file ("+fileSize+ " bytes) in "+(new Date() - startDate)+" ms");
            mp4box.flush();
            return;
        }

        readBlock(offset, chunkSize, file);
    }

    readBlock(offset, chunkSize, file);
}

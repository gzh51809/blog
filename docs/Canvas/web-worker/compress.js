const COMPRESS_DEFAULT_OPTS = {
    maxSize: 512000,
    unit: 'byte',
    maxWidth: 1920,
    maxHeight: 1344,
    quality: 1
}

class ImageCompressor {

    constructor(options) {
        this._opts = Object.assign({}, COMPRESS_DEFAULT_OPTS, options);
        this.maxFileSizeByte = this._opts.unit === 'kb' ? this._opts.maxSize * 1000 : this._opts.maxSize;
        this.records = [];
    }

    compress(file) {
        let cpStart = new Date().getTime();

        // 1. check params
        if (file.constructor !== File) {
            throw new Error(`[Error] Unexpected parameters ${file}, which must be a instance of File`)
        }

        // 2. get file's size, and check if it needs to compress
        if (file.size < this.maxFileSizeByte) {
            return file;
        }

        let reocrd = {
            name: file.name,
            source: {size: `${parseInt(file.size / 1024)}kb`},
            final: {}
        }

        Object.defineProperty(reocrd, 'config', {
            get: () => this._opts
        })

        // 3. get file's dataURL
        return this._readAsDataURL(file)
    }

    /**
     * Read file's dataURL
     * @param file
     * @returns {Promise}
     * @private
     */
    _readAsDataURL(file) {
        let fr = new FileReader();
        return new Promise((resolve, reject) => {
            try {
                fr.readAsDataURL(file);
                fr.onloadend = (e) => {
                    resolve(e.target.result)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

}


function dataURLtoBlob(dataURL) {

    var arr = dataURL.split(','),
        bin = atob(arr[1]),
        mime = arr[0].match(/:(.*?);/)[1],
        buffer = new Uint8Array(bin.length);

    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }

    return new Blob([buffer.buffer], {type: mime});
}

let ic = new ImageCompressor({quality: 0.8})
let sourceFile;

onmessage = function (ev) {

    let msg = ev.data;

    if (msg.index === 1) {
        sourceFile = msg.data;
        ic.compress(msg.data)
            .then(dataURL => {
                postMessage({
                    index: 1,
                    data: dataURL
                })
            })

    } else if (msg.index === 2) {
        let finalIMG = new File([dataURLtoBlob(msg.data)], sourceFile.name, {type: sourceFile.type});
        postMessage({
            index: 2,
            data: finalIMG
        })
    }


};

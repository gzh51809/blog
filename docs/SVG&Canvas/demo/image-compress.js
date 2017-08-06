
/**
 * Default options for compress image
 * @type {{maxSize: number, unit: string, maxWidth: number, maxHeight: number, quality: number}}
 */
const COMPRESS_DEFAULT_OPTS = {
    maxSize: 512000,
    unit: 'byte',
    maxWidth: 1920,
    maxHeight: 1344,
    quality: 1
}

class ImageCompressor {

    constructor(options) {
        this._opts = $.extend({}, COMPRESS_DEFAULT_OPTS, options);
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

        // 3. initial record
        let reocrd = {
            name: file.name,
            source: {size: `${parseInt(file.size / 1024)}kb`},
            final: {}
        }

        // readable config
        Object.defineProperty(reocrd, 'config', {
            get: () => this._opts
        })

        // 4. compress image
        return this._readAsDataURL(file)
        // source file's dataURL to image
            .then(dataURL => this._dataURLtoImage(dataURL))
            // draw source image in canvas
            .then(sourceImg => {
                let finalSize = this._getCompressedSize(sourceImg);

                $.extend(reocrd.source, {
                    width: `${sourceImg.width}px`,
                    height: `${sourceImg.height}px`
                });
                $.extend(reocrd.final, {
                    width: `${parseInt(finalSize.width)}px`,
                    height: `${parseInt(finalSize.height)}px`
                });

                return this._drawImageInCanvas(finalSize.width, finalSize.height, sourceImg);
            })
            // convert canvas to File
            .then(canvas => {
                let dataURL = canvas.toDataURL("image/jpeg", this._opts.quality),
                    finalIMG = new File([this._dataURLtoBlob(dataURL)], file.name, {type: file.type});
                reocrd.final.size = `${parseInt(finalIMG.size / 1024)}kb`;
                let cpEnd = new Date().getTime();
                reocrd.cost = `${cpEnd - cpStart}ms`
                this.records.push(reocrd);
                return finalIMG;
            })
            .fail(err => {
                throw new Error(err)
            })
    }

    /**
     * Get compressed width ang height
     * @param imgElement
     * @returns {{width: number, height: number}}
     * @private
     */
    _getCompressedSize(imgElement) {
        let ratioW = 1, ratioH = 1, ratio;

        if (imgElement.width > this._opts.maxWidth) {
            ratioW = imgElement.width / this._opts.maxWidth;
        }
        if (imgElement.height > this._opts.maxHeight) {
            ratioH = imgElement.height / this._opts.maxHeight;
        }
        ratio = Math.max(ratioW, ratioH);
        return {
            width: Math.floor(imgElement.width / ratio),
            height: Math.floor(imgElement.height / ratio)
        }
    }

    /**
     * Get image element by image's dataURL
     * @param dataURL
     * @returns {Promise}
     * @private
     */
    _dataURLtoImage(dataURL) {
        let imgElement = document.createElement('img');
        return $.Deferred(ref => {
            imgElement.setAttribute('src', dataURL);
            imgElement.onload = () => ref.resolve(imgElement);
            imgElement.onerror = err => ref.reject(err);
        });
    }

    /**
     * Get blob element by image's dataURL
     * @param dataURL
     * @returns {Promise}
     * @private
     */
    _dataURLtoBlob(dataURL) {

        let arr = dataURL.split(','),
            bin = atob(arr[1]),
            mime = arr[0].match(/:(.*?);/)[1],
            buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }

        return new Blob([buffer.buffer], {type: mime});
    }

    /**
     * Draw image in canvas
     * @param width
     * @param height
     * @param image
     * @returns {object}
     * @private
     */
    _drawImageInCanvas(width, height, image) {

        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        ctx.drawImage(image, 0, 0, width, height);
        return canvas;
    }

    /**
     * Read file's dataURL
     * @param file
     * @returns {Promise}
     * @private
     */
    _readAsDataURL(file) {
        let fr = new FileReader();
        return $.Deferred(def => {
            fr.readAsDataURL(file);
            fr.onloadend = e => def.resolve(e.target.result);
            fr.onerror = err => def.reject(err);
            return def;
        });
    }

}

let imageHandler = new ImageCompressor({quality: 0.8});




function webWorker() {

    var w;

    function startWorker()
    {
        if(typeof(Worker)!=="undefined")
        {
            if(typeof(w)=="undefined")
            {
                w=new Worker("demo_workers.js");
            }
            w.onmessage = function (event) {
                document.getElementById("result").innerHTML=event.data;
            };
        }
        else
        {
            document.getElementById("result").innerHTML= "Sorry, your browser does not support Web Workers...";
        }
    }

    function stopWorker()
    {
        w.terminate();
    }
}



document.getElementById('file').addEventListener('change', function () {

    let start, end, code, currentIndex = 0;
    for (let i = 0, l = this.files.length; i < l; i++) {

        if (i === 0) {
            start = new Date().getTime();
        }

        imageHandler
            .compress(this.files[i])
            .then(file => {
                console.log(currentIndex + ': ' + file.name)
                saveAs(file)
                currentIndex++;
                if (currentIndex === this.files.length) {
                    end = new Date().getTime();
                    console.log('Total cost ' + (end-start) + 's' );
                    code = document.createElement('pre');
                    code.innerHTML = JSON.stringify(imageHandler.records, null, 2);
                    document.querySelector('body').appendChild(code)
                }
            })
    }
})


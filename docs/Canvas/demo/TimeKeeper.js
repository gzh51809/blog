// 传入一个初始计时点
// 传入每个点的alias，检测每个点的时间
// 获取每个点的时间

const throwError = {
    unexpectedParameters() {
        throw new Error('[Unexpected Parameters]')
    },
    syntaxError() {
        throw new Error('[Syntax Error]')
    },
    customError(msg) {
        throw new Error(`[${msg}]`)
    }
}

class TimeKeeper {

    constructor() {
        this._stack = [];
        this.__selfTk__ = [];
        this._init();
    }

    _getTimeStamp() {
        return new Date().getTime();
    }

    _createMomentByAlias(alias) {
        return {
            alias,
            stamp: this._getTimeStamp()
        }
    }

    _findMomentByAlias(alias) {
        let result = this._stack.find(ponit => ponit.alias === alias);
        if (!result) {
            throwError.customError('Unsigned moment: ' + alias)
        }
        return result;
    }

    _toString(val) {
        return typeof val === 'string' ? val : val.toString();
    }

    _init() {
        if (this._stack.length !== 0) {
            return;
        }
        this._stack.push(this._createMomentByAlias('0'))
    }

    sign(alias) {
        this.__selfTk__ = [];
        this.__selfTk__.push(new Date().getTime());
        alias = typeof alias === "number" ? alias.toString() : alias;
        this._stack.push(this._createMomentByAlias(alias));
        this.__selfTk__.push(new Date().getTime());
    }

    all() {
        let result = {};
        for (var i = 0, l = this._stack.length - 1; i < l; i++) {
            result[`${i}-->${i + 1}`] = this.diff(i + 1, i);
        }
        return result;
    }

    diff(end, start, opts) {

        if (typeof end === 'number') {
            end = this._toString(end);

        } else if (typeof end !== 'string') {
            throwError.unexpectedParameters();
        }

        if (arguments.length === 2) {

            if (typeof start === 'object') {
                opts = start;
                start = this._stack[0].alias;

            } else if (typeof start === 'number') {
                start = start.toString();

            } else if (typeof start !== 'string') {
                throwError.unexpectedParameters();
            }

        } else if (arguments.length === 1) {
            start = this._stack[0].alias;

        } else if (arguments.length === 3) {

            start = this._toString(start);

            if (typeof opts === 'string') {
                opts = {format: opts}
            }
        }

        let diff = this._findMomentByAlias(end).stamp -
            this._findMomentByAlias(start).stamp;

        diff = diff < 0 ? -diff : diff;

        if (opts && opts.format) {
            switch (opts.format) {
                case 's':
                    return diff / 1000;
                case 'ms':
                    return diff;
            }
        }

        return diff / 1000;
    }
}
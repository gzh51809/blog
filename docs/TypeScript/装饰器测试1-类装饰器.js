"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
var People1 = (function () {
    function People1(name) {
        this.name = name;
    }
    People1.prototype.speak = function () {
        console.log("I am " + this.name);
    };
    return People1;
}());
var People2 = (function () {
    function People2(name) {
        this.name = name;
    }
    People2.prototype.speak = function () {
        console.log("I am " + this.name);
    };
    return People2;
}());
People2 = __decorate([
    sealed
], People2);
var people1 = new People1('ulivz');
Object.defineProperty(people1, 'name', {
    enumerable: false,
    configurable: false,
    get: function () {
        return 'ulivz';
    }
});
console.log(people1);
// ✅
Object.defineProperty(People1.prototype, 'speak', {
    get: function () {
        return 'ulivz';
    }
});
// ✅
Object.defineProperty(People1, 'speak', {
    get: function () {
        return 'ulivz';
    }
});
var people2 = new People2('ulivz');
// TypeError: Cannot define property:speak, object is not extensible
Object.defineProperty(People2.prototype, 'speak', {
    get: function () {
        return 'ulivz';
    }
});
// TypeError: Cannot define property:speak, object is not extensible
Object.defineProperty(People2, 'speak', {
    get: function () {
        return 'ulivz';
    }
});
console.log(people2);

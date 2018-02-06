var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
var People = (function () {
    function People(name) {
        this.name = name;
    }
    People.prototype.speak = function () {
    };
    People.prototype.walk = function () {
    };
    return People;
}());
__decorate([
    enumerable(false)
], People.prototype, "speak", null);
__decorate([
    enumerable(true)
], People.prototype, "walk", null);
var ulivz = new People('ulivz');
for (var key in ulivz) {
    console.log(key);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockSessionStorage = /** @class */ (function () {
    function MockSessionStorage() {
    }
    MockSessionStorage.prototype.getItem = function (name) {
        return '/name';
    };
    return MockSessionStorage;
}());
exports.MockSessionStorage = MockSessionStorage;
//# sourceMappingURL=mock-session-storage.js.map
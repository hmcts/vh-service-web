"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var ActivatedRouteMock = /** @class */ (function () {
    function ActivatedRouteMock() {
        this.paramMap = rxjs_1.of(router_1.convertToParamMap({
            mode: 'Edit'
        }));
    }
    return ActivatedRouteMock;
}());
exports.ActivatedRouteMock = ActivatedRouteMock;
var MockActivatedRoute = /** @class */ (function () {
    function MockActivatedRoute(params) {
        this.subject = new rxjs_1.BehaviorSubject(this.testParams);
        this.params = this.subject.asObservable();
        this.queryParams = this.subject.asObservable();
        if (params) {
            this.testParams = params;
        }
        else {
            this.testParams = {};
        }
    }
    Object.defineProperty(MockActivatedRoute.prototype, "testParams", {
        get: function () {
            return this.innerTestParams;
        },
        set: function (params) {
            this.innerTestParams = params;
            this.subject.next(params);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockActivatedRoute.prototype, "snapshot", {
        get: function () {
            return { params: this.testParams, queryParams: this.testParams };
        },
        enumerable: true,
        configurable: true
    });
    return MockActivatedRoute;
}());
exports.MockActivatedRoute = MockActivatedRoute;
//# sourceMappingURL=mock-activated-route.js.map
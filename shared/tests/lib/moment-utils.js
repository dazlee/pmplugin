const mocha = require("mocha");
const {assert, expect} = require("chai");
const momentUtils = require("../../lib/moment-utils");

describe("shared/lib/moment-utils.js", () => {
    describe("relativeDateTime", () => {
        it("should convert relative date time", (done) => {
            const date = "Thu Apr 21 2016 10:00:00 GMT+0800 (CST)";
            const relativeDateTime = momentUtils.relativeDateTime(date);
            expect(relativeDateTime.indexOf("at 10:00 AM")).to.not.equal(-1);
            done();
        });
    });
});

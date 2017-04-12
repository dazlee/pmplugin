const mocha = require("mocha");
const {expect} = require("chai");
const fetchUtils = require("../../lib/fetch-utils");

describe("shared/lib/fetch-utils.js", () => {
    describe("checkStatus", () => {
        it("should check pass with staus code 200 - 299", (done) => {
            const res = {
                status: 200,
            };
            expect(fetchUtils.checkStatus(res)).to.equal(res);
            done();
        });

        it("should throw error with staus code out of 200 - 299", (done) => {
            const res = {
                status: 404,
                statusText: "not found",
            };
            expect(fetchUtils.checkStatus.bind(null, res)).to.throw(Error);
            done();
        });
    });

    describe("parseJSON", () => {
        it("should parse JSON", (done) => {
            const result = {
                pass: true,
            };
            const res = {
                status: 200,
                json: () => {
                    return result;
                }
            };
            expect(fetchUtils.parseJSON(res)).to.equal(result);
            done();
        });
    });
});

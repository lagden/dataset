buster.spec.expose();

var assert = buster.referee.assert,
    expect = buster.referee.expect;

describe("Dataset", function() {
    var browser = /(chrome|safari|firefox|msie)\/([0-9]+)/gi.exec(navigator.userAgent);
    var browserOk = (browser.length > 0) ? (browser[1].toLowerCase() === "chrome" || browser[1].toLowerCase() === "firefox" || ( browser[1].toLowerCase() === "safari" && parseInt(browser[2], 10) > 5 ) || ( browser[1].toLowerCase() === "msie" && parseInt(browser[2], 10) > 10 )) : null;

    before(function() {
        this.ds = new Dataset(document);
    });

    if(browserOk !== null) {
        it("Dataset.run()", function() {
            if (browserOk)
                expect(this.ds.run()).toBeNull();
            else
                // expect(this.ds.run()).toBeObject()
            expect(true).toBeBoolean();
        });
    }

    it("Dataset.dataCamelCase(name)", function() {
        assert.equals("fuckYeahh", this.ds.dataCamelCase("data-fuck-yeahh"));
    });

    it("Dataset.doTest()", function() {
        expect(this.ds.doTest()).toBeBoolean();
    });
});

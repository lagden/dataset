/**
 * dataset.js
 * Version 1.2.1
 * Thiago Lagden | @thiagolagden | lagden@gmail.com
 * It is a plugin that allows access, both in reading and writing mode, to all the custom data attributes (data-*) set on the element
 * 
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.dataset
 */

;(function(window) {

    function Dataset(doc, isDebug) {
        if(false === (this instanceof Dataset)) {
            return new Dataset(doc, isDebug);
        }
        this.doc = doc || false;
        this.isDebug = isDebug || false;
        if(this.doc)
            this.run();
        else
            console.warn('missing document');
    }

    Dataset.prototype.run = function() {
        var test = doTest(this.doc);

        if (this.isDebug)
            console.log("[has dataset API]", test);

        // If the test fails, create the dataset
        if (test === false) {
            var all = this.doc.getElementsByTagName("*");
            for (var i = all.length - 1; i >= 0; i--) {
                all[i].dataset = {};
                if (!! all[i].attributes) {
                    for (var m = all[i].attributes.length - 1; m >= 0; m--) {
                        var currentName = String(all[i].attributes[m].name);
                        if (currentName.indexOf("data-") > -1) {
                            var s = this.dataCamelCase(currentName);
                            if (s !== "") {
                                all[i].dataset[s] = all[i].attributes[m].nodeValue;
                                if (this.isDebug)
                                    console.log("[Dataset]", currentName, s, all[i].dataset[s]);
                            }
                        }
                    }
                }
            }
            return this.doc;
        }
        return null;
    };

    // Return a data attribute in camelcase
    Dataset.prototype.dataCamelCase = function(name) {
        var r = "";
        var s = name.split("-");
        var i = 0;
        var len = s.length;
        for (i; i < len; i++) {
            if(i > 0) {
                if(i > 1)
                    r += ucfirst(s[i]);
                else
                    r += s[i];
            }
        }
        return r;
    };

    // Test support
    // https://github.com/phiggins42/has.js/blob/master/detect/dom.js#L17
    function doTest(doc) {
        var el = doc.createElement("div");
        el.setAttribute("data-a-b", "c");
        return isHostType(el, "dataset") && el.dataset.aB == "c";
    }

    // Types of object, function, or unknown.
    // https://github.com/phiggins42/has.js/blob/master/has.js#L101
    function isHostType(object, property) {
        var NON_HOST_TYPES = { "boolean": 1, "number": 1, "string": 1, "undefined": 1 };
        var type = typeof object[property];
        return type == "object" ? !!object[property] : !NON_HOST_TYPES[type];
    }

    // Return a string with first letter in uppercase
    // https://raw.github.com/kvz/phpjs/master/functions/strings/ucfirst.js
    function ucfirst(str) {
        str += "";
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }

    // AMD Support
    if (typeof define === 'function' && define.amd)
        define(function() { return Dataset; });
    else
        window.Dataset = Dataset;

}(window));

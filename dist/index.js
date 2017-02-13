var Base64DecoderApp = (function () {
    function Base64DecoderApp(inputId, outputId) {
        var _this = this;
        this.inputBox = document.getElementById(inputId);
        this.outputBox = document.getElementById(outputId);
        this.lastDecodedInput = null;
        this.inputBox.onkeyup = function (ev) { _this.decode(); };
        this.inputBox.onmouseup = function (ev) { _this.decode(); };
    }
    Base64DecoderApp.prototype.decode = function () {
        var encodedMultiPart = this.inputBox.value;
        if (this.lastDecodedInput === encodedMultiPart) {
            // nothing changed since the last decoding
            return;
        }
        var decoded = [];
        encodedMultiPart = Base64DecoderApp.sanitize(encodedMultiPart);
        encodedMultiPart.split(/[^A-Za-z0-9+/=]+/).forEach(function (encodedPart) {
            var decodedPart = Base64DecoderApp.tryJsonDecode(Base64DecoderApp.tryBase64Decode(encodedPart));
            decoded.push(decodedPart);
        });
        this.outputBox.value = decoded.join('\n------------------------------\n');
    };
    Base64DecoderApp.sanitize = function (inputStr) {
        inputStr = inputStr.replace(/\r?\n|\r/g, ''); //  remove all line breaks
        inputStr = inputStr.replace(/\s/g, ''); //  remove all whitespaces
        return inputStr;
    };
    Base64DecoderApp.tryBase64Decode = function (inputStr) {
        var result;
        try {
            result = window.atob(inputStr);
        }
        catch (e) {
            result = inputStr;
        }
        return result;
    };
    Base64DecoderApp.tryJsonDecode = function (inputStr) {
        var result;
        try {
            result = JSON.stringify(JSON.parse(inputStr), null, 2);
        }
        catch (e) {
            result = inputStr;
        }
        return result;
    };
    return Base64DecoderApp;
}());
new Base64DecoderApp('input', 'output');

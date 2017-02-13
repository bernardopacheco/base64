
class Base64DecoderApp {

    private inputBox: HTMLInputElement;
    private outputBox: HTMLInputElement;
    private lastDecodedInput: string;

    constructor (inputId: string, outputId: string) {
        this.inputBox = document.getElementById(inputId) as HTMLInputElement;
        this.outputBox = document.getElementById(outputId) as HTMLInputElement;
        this.lastDecodedInput = null;

        this.inputBox.onkeyup = (ev: KeyboardEvent) => { this.decode() };
        this.inputBox.onmouseup = (ev: MouseEvent) => { this.decode() };
    }

    private decode() {
        let encodedMultiPart = this.inputBox.value;

        if (this.lastDecodedInput === encodedMultiPart) {
            // nothing changed since the last decoding
            return;
        }

        let decoded: string[] = [];

        encodedMultiPart = Base64DecoderApp.sanitize(encodedMultiPart);

        encodedMultiPart.split(/[^A-Za-z0-9+/=]+/).forEach((encodedPart: string) => {
            let decodedPart = Base64DecoderApp.tryJsonDecode(Base64DecoderApp.tryBase64Decode(encodedPart));
            decoded.push(decodedPart);
        });

        this.outputBox.value = decoded.join('\n------------------------------\n');
    }

    private static sanitize(inputStr: string): string {
        inputStr = inputStr.replace(/\r?\n|\r/g, ''); //  remove all line breaks
        inputStr = inputStr.replace(/\s/g, ''); //  remove all whitespaces

        return inputStr;
    }

    private static tryBase64Decode(inputStr: string): string {
        let result: string;
        try {
            result = window.atob(inputStr);
        } catch (e) {
            result = inputStr;
            //if (e instanceof DOMException && e.name === 'InvalidCharacterError') {
            //    console.error('Invalid base 64 input');
            //} else {
            //    console.dir(e);
            //}
        }
        return result;
    }

    private static tryJsonDecode(inputStr: string): string {
        let result: string;
        try {
            result = JSON.stringify(JSON.parse(inputStr), null, 2);
        } catch (e) {
            result = inputStr;
        }
        return result;
    }
}

new Base64DecoderApp('input', 'output');

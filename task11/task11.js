'use strict';

class CustomJSONLib {
    /**
     * Initialize a custom JSON library with received string
     *
     * @param jsonString - string in JSON
     * @chars - array of characters
     * @index - index
     */
    constructor(jsonString) {
        this.jsonString = jsonString;
        this.chars = this.spliceChar();
        this.index = 0;
    };

    /**
     * Method that splits the string into characters
     */
    spliceChar() {
        const regex = /({|}|\[|\]|:|,|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|"(?:\\.|[^"\\])*")/g;
        return [...this.jsonString.matchAll(regex)].map(match => match[0]);
    };

    /**
     * Method that parses value
     */
    parseValue() {
        const char = this.chars[this.index++];

        switch (char) {
            case '{': return this.parseObject();
            case '[': return this.parseArray();
            case 'true': return true;
            case 'false': return false;
            case 'null': return null;
            default:
                if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(char)) return parseFloat(char);   // check whether value is number in JSON
                if (/^"(?:\\.|[^"\\])*"$/.test(char)) return char.slice(1, -1).replace(/\\(.)/g, '$1');   // check whether string is JSON
                throw new SyntaxError(`Unexpected char: ${char}`);
        }
    };

    /**
     * Method that parses object
     */
    parseObject() {
        const obj = {};
        while (this.chars[this.index] !== '}') {
            if (this.chars[this.index] === ',') {
                this.index++;
                continue;
            }
            const key = this.chars[this.index++].slice(1, -1).replace(/\\(.)/g, '$1');
            if (this.chars[this.index++] !== ':') throw new SyntaxError('Expected colon after key in object');
            obj[key] = this.parseValue();
        }
        this.index++;
        return obj;
    };

    /**
     * Method that parses array
     */
    parseArray() {
        const arr = [];
        while (this.chars[this.index] !== ']') {
            if (this.chars[this.index] === ',') {
                this.index++;
                continue;
            }
            arr.push(this.parseValue());
        }
        this.index++;
        return arr;
    };
}


const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonString = '[1, 2, 3]';
const jsonObject = new CustomJSONLib(jsonString);

console.log(jsonObject.parseValue());
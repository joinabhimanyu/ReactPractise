/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
/* eslint-disable func-names */
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as appConstants from '../../../app/constants/AppConstants';
// const jsdom=require('jsdom');
const expect = chai.expect;
chai.use(sinonChai);

// const {JSDOM}=jsdom;
let domObj;
/*
function createJSDOM(content){
  domObj=new JSDOM(content);
}
*/
function XMLSerializerWrapper() {
}

XMLSerializerWrapper.prototype.serializeToString = function () {
  let text;
  if (domObj) {
    text = domObj.serialize();
    // Fix a jsdom issue where all SVG tagNames are lowercased:
    // https://github.com/tmpvar/jsdom/issues/620
    const tagNames = ['linearGradient', 'radialGradient', 'clipPath', 'textPath'];
    for (let i = 0, l = tagNames.length; i < l; i++) {
      const tagName = tagNames[i];
      text = text.replace(
        new RegExp('(<|</)' + tagName.toLowerCase() + '\\b', 'g'),
        function (all, start) {
          return start + tagName;
        });
    }
  }

  return text;
};
export function mockIE() {
  //   Object.defineProperty(String.prototype, "SayHi", {
  //     value: function SayHi() {
  //         return "Hi " + this + "!";
  //     },
  //     writable: true,
  //     configurable: true
  // });
  global.navigator.msPointerEnabled = true;
  if (!Object.prototype.hasOwnProperty.call(Element.prototype, 'xml')) {
    Object.defineProperty(Element.prototype, "xml", {
      get: function () { return this.outerHTML; },
      configurable: true
    });
  }
  Object.defineProperty(Element.prototype, 'childNodes', {
    get: function () { const s = this.childElementCount > 0 ? this.children : (this.firstChild ? [this.firstChild] : []); return s; },
    configurable: true
  });
  if (!Object.prototype.hasOwnProperty.call(HTMLOptionElement.prototype, 'xml')) {
    Object.defineProperty(HTMLOptionElement.prototype, "xml", {
      get: function () { return this.outerHTML; },
      configurable: true
    });
  }
  Object.defineProperty(HTMLOptionElement.prototype, 'childNodes', {
    get: function () { const s = this.childElementCount > 0 ? this.children : (this.firstChild ? [this.firstChild] : []); return s; },
    configurable: true
  });
  if (!Object.prototype.hasOwnProperty.call(HTMLUnknownElement.prototype, 'xml')) {
    Object.defineProperty(HTMLUnknownElement.prototype, "xml", {
      get: function () { return this.outerHTML; },
      configurable: true
    });
  }
  Object.defineProperty(HTMLUnknownElement.prototype, 'childNodes', {
    get: function () { const s = this.childElementCount > 0 ? this.children : (this.firstChild ? [this.firstChild] : []); return s; },
    configurable: true
  });
  global.ActiveXObject = jest.fn().mockImplementation(() => new ActiveXObjectWrapper("Microsoft.XMLDOM"));
}
export class ActiveXObjectWrapper {
  mode = null;
  async = null;
  parser = null;
  doc = null;
  constructor(mode) {
    if (mode === "Microsoft.XMLDOM") {
      this.mode = mode;
      this.async = true;
      this.parser = new DOMParser();
    }
  }
  loadXML(content) {
    if (this.mode === "Microsoft.XMLDOM") {
      this.doc = this.parser.parseFromString(content, "text/xml");
    }
  }
  getElementsByTagName(tagname) {
    if (this.mode === "Microsoft.XMLDOM") {
      return this.doc.getElementsByTagName(tagname);
    }
    return null;
  }
  createElement(nodename) {
    if (this.mode === "Microsoft.XMLDOM") {
      return this.doc.createElement(nodename);
    }
    return null;
  }
  createTextNode(nodename) {
    if (this.mode === "Microsoft.XMLDOM") {
      return this.doc.createTextNode(nodename);
    }
    return null;
  }
  get xml() {
    return this.doc.documentElement.outerHTML;
  }
}

describe('AppConstants', () => {

  describe('AppConstants ON_UPDATE_TOKEN_VALUES', () => {
    it('should check ON_UPDATE_TOKEN_VALUES', () => {
      const ON_UPDATE_TOKEN_VALUES = "ON_UPDATE_TOKEN_VALUES";
      expect(appConstants.ON_UPDATE_TOKEN_VALUES).to.eq(ON_UPDATE_TOKEN_VALUES);
    });
    it('should check ON_RESET_USER_INFO', () => {
      const ON_RESET_USER_INFO = "ON_RESET_USER_INFO";
      expect(appConstants.ON_RESET_USER_INFO).to.eq(ON_RESET_USER_INFO);
    });
    it('should check LOG_ERROR', () => {
      const LOG_ERROR = "LOG_ERROR";
      expect(appConstants.LOG_ERROR).to.eq(LOG_ERROR);
    });

  });

  describe('AppConstants normalizeColors', () => {

    it('should check normalizeColors for DOMParser', () => {
      const input = "<div><span style='color:#fcba03;background-color:#fce303'></span></div>";
      const output = '<div><span style="color:rgba(252,186,3,1);background-color:rgba(252,227,3,1)"></span></div>';
      const actual = appConstants.normalizeColors(input);
      expect(actual).to.eq(output);
    });
    it('should check normalizeColors for null content', () => {
      const output = appConstants.normalizeColors(null);
      expect(output).to.eq(null);
    });
    it('should check normalizeColor for null span', () => {
      const input = "<div></div>";
      const output = appConstants.normalizeColors(input);
      expect(output).to.eq(input);
    });
    it('should check normalizeColor for null style attributes', () => {
      const input = "<div><span></span></div>";
      const actual = appConstants.normalizeColors(input);
      expect(actual).to.eq(input);
    });
    it('should check normalizeColor for style attributes seperated by commas', () => {
      const input = "<div><span style='color= #0F0F59;background-color= #3c763d'></span></div>";
      const actual = appConstants.normalizeColors(input);
      const output = '<div><span style="color= #0F0F59;background-color= #3c763d"></span></div>';
      expect(actual).to.eq(output);
    });
    it('should check normalizeColor without color or background-color of span', () => {
      const input = "<div><span style='text-align: center'></span></div>";
      const actual = appConstants.normalizeColors(input);
      const output = '<div><span style="text-align: center"></span></div>';
      expect(actual).to.eq(output);
    });
    it('should check normalizeColors for ActiveXObjecct', () => {
      const input = "<div><span style='color:#fcba03;background-color:#fce303'></span></div>";
      global.navigator.msPointerEnabled = true;
      global.ActiveXObject = jest.fn().mockImplementation(() => new ActiveXObjectWrapper("Microsoft.XMLDOM"));
      const output = '<div><span style="color:rgba(252,186,3,1);background-color:rgba(252,227,3,1)"></span></div>';
      let actual = appConstants.normalizeColors(input);
      actual = actual.replace(/(<img("[^"]*"|[^\/">])*)>/gi, "$1/>")
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });

  });

  describe('AppConstants hexToRGBA', () => {
    it('should check hexToRgbA', () => {
      const input = "#fff";
      const output = "rgba(255,255,255,1)";
      const actual = appConstants.hexToRgbA(input);
      expect(actual).to.eq(output);
    });
    it('should check hexToRgbA for failure', () => {
      const input = "Bad Hex";
      try {
        appConstants.hexToRgbA(input);
      } catch (error) {
        expect(error).to.not.equal(null);
        expect(error.message).to.eq(input);
      }
    });

  });

  describe('AppConstants setImageAltAttribute', () => {
    it('should check setImageAltAttribute for null content', () => {
      expect(appConstants.setImageAltAttribute(null, '', false)).to.eq('');
    });
    it('should check setImageAltAttribute for saveMessageCall as true for chrome with data-name', () => {

      const content = `<p><img src="http://www.google.com/filename1.jpg" data-name="filename1.jpg" data-alt="d:\\uploadedImages\\filename1.jpg"/></p>`;
      try {
        global.navigator.msPointerEnabled = false;
        const altcontent = appConstants.setImageAltAttribute(null, content, true);
        const output = `<p><img src="d:\\uploadedImages\\filename1.jpg" data-name="filename1.jpg" data-alt="http://www.google.com/filename1.jpg"/></p>`;
        expect(altcontent).to.equal(output);
      } catch (error) {
        expect(error).to.not.equal(null);
      }
    });
    it('should check setImageAltAttribute for saveMessageCall as true without imageAttributesData', () => {

      const content = `<p><img src="http://www.google.com/filename1.jpg"/></p>`;
      try {
        global.navigator.msPointerEnabled = false;
        const altcontent = appConstants.setImageAltAttribute([], content, true);
        const output = `<p><img src=undefined data-alt="http://www.google.com/filename1.jpg"/></p>`;
        expect(altcontent).to.equal(output);
      } catch (error) {
        expect(error).to.not.equal(null);
      }
    });
    it('should check setImageAltAttribute for saveMessageCall as true for chrome', () => {
      const imageAttributesData = [{
        src: 'http://www.google.com/filename1.jpg',
        name: 'filename1.jpg',
        alt: 'd:\\uploadedImages\\filename1.jpg'
      }];
      const content = `<p><img src="http://www.google.com/filename1.jpg"/></p>`;
      try {
        global.navigator.msPointerEnabled = false;
        const altcontent = appConstants.setImageAltAttribute(imageAttributesData, content, true);
        const output = `<p><img src="d:\\uploadedImages\\filename1.jpg" data-name="filename1.jpg" data-alt="http://www.google.com/filename1.jpg"/></p>`;
        expect(altcontent).to.equal(output);
      } catch (error) {
        expect(error).to.not.equal(null);
      }
    });
    it('should check setImageAltAttribute from saveMessageCall as false for chrome', () => {
      try {
        const input = `<p><img src="http://www.google.com/filename1.jpg"
      data-name="filename1.jpg" data-alt="d:\\uploadImages\\filename1.jpg"/></p>`;
        const output = `<p><img src="d:\\uploadImages\\filename1.jpg"
      data-name="filename1.jpg" data-alt="http://www.google.com/filename1.jpg"/></p>`;
        global.navigator.msPointerEnabled = false;
        const actual = appConstants.setImageAltAttribute(null, input, false);
        expect(actual).to.equal(output);
      } catch (error) {
        expect(error).to.not.equal(null);
      }
    });
    it('should check setImageAttribute for saveMessageCall as true for IE', () => {
      global.navigator.msPointerEnabled = true;
      global.ActiveXObject = jest.fn().mockImplementation(() => new ActiveXObjectWrapper("Microsoft.XMLDOM"));
      const imageAttributesData = [{
        src: 'http://www.google.com/filename1.jpg',
        name: 'filename1.jpg',
        alt: 'd:\\uploadedImages\\filename1.jpg'
      }];
      const content = `<p><img src="http://www.google.com/filename1.jpg"/></p>`;
      let altcontent = appConstants.setImageAltAttribute(imageAttributesData, content, true);
      altcontent = altcontent.replace(/(<img("[^"]*"|[^\/">])*)>/gi, "$1/>");
      altcontent = altcontent
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      const output = `<p><img src="d:\\uploadedImages\\filename1.jpg" data-name="filename1.jpg" data-alt="http://www.google.com/filename1.jpg"/></p>`;
      expect(altcontent).to.equal(output);
    });
    it('should check setImageAttribute for saveMessageCall as false for IE', () => {
      global.navigator.msPointerEnabled = true;
      global.ActiveXObject = jest.fn().mockImplementation(() => new ActiveXObjectWrapper("Microsoft.XMLDOM"));
      const content = `<p><img src="http://www.google.com/filename1.jpg" data-name="filename1.jpg" data-alt="d:\\uploadedImages\\filename1.jpg"/></p>`;
      let altcontent = appConstants.setImageAltAttribute(null, content, false);
      altcontent = altcontent.replace(/(<img("[^"]*"|[^\/">])*)>/gi, "$1/>");
      altcontent = altcontent
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      const output = `<p><img src="d:\\uploadedImages\\filename1.jpg" data-name="filename1.jpg" data-alt="http://www.google.com/filename1.jpg"/></p>`;
      expect(altcontent).to.equal(output);
    });

  });

  describe('AppConstants replaceAll', () => {
    it('should check replaceAll with actual containing vale', () => {

      const value = 'demo content';
      const replacement = 'replaced content';
      const actual = `<p>${value}</p>`;
      const output = `<p>${replacement}</p>`;
      const result = appConstants.replaceAll(value, replacement, actual);
      expect(result).to.eq(output);
    });
    it('should check replaceAll without actual containing vale', () => {

      const value = 'demo content';
      const replacement = '';
      const actual = `<p>some other content</p>`;
      const result = appConstants.replaceAll(value, replacement, actual);
      expect(result).to.eq(actual);
    });

  });

  describe('AppConstants resolveToActualCanonicalNames', () => {
    it('should check resolveToFriendlyCanonicalNames with content', () => {
      let input = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        input += `[${key}]`;
      });
      let output = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        output += `[${appConstants.CANONICAL_FRIENDLY_NAMES_MAP[key]}]`;
      });
      const result = appConstants.resolveToFriendlyCanonicalNames(input);
      expect(result).to.eq(output);
    });
    it('should check resolveToFriendlyCanonicalNames with content not index', () => {
      let input = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        input += key;
      });
      const result = appConstants.resolveToFriendlyCanonicalNames(input);
      expect(result).to.eq(input);
    });
    it('should check resolveToFriendlyCanonicalNames without content', () => {
      expect(appConstants.resolveToFriendlyCanonicalNames('')).to.eq('');
    });
    it('should check resolveToActualCanonicalNames with content', () => {
      let output = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        output += `[${key}]`;
      });
      let input = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        input += `[${appConstants.CANONICAL_FRIENDLY_NAMES_MAP[key]}]`;
      });
      const result = appConstants.resolveToActualCanonicalNames(input);
      expect(result).to.eq(output);
    });
    it('should check resolveToActualCanonicalNames with content not index', () => {
      let input = '';
      Object.keys(appConstants.CANONICAL_FRIENDLY_NAMES_MAP).forEach(key => {
        input += appConstants.CANONICAL_FRIENDLY_NAMES_MAP[key];
      });
      const result = appConstants.resolveToActualCanonicalNames(input);
      expect(result).to.eq(input);
    });
    it('should check resolveToActualCanonicalNames without content', () => {
      expect(appConstants.resolveToActualCanonicalNames('')).to.eq('');
    });

  });

  describe('AppConstants normalizeFonts', () => {
    it('should check normalizeFonts for ActiveXObjecct', () => {
      const input = "<div><span style='font-family:abcd'></span></div>";
      global.navigator.msPointerEnabled = true;
      global.ActiveXObject = jest.fn().mockImplementation(() => new ActiveXObjectWrapper("Microsoft.XMLDOM"));
      const output = '<div><span style="font-family:Arial"></span></div>';
      let actual = appConstants.normalizeFonts(input);
      actual = actual.replace(/(<img("[^"]*"|[^\/">])*)>/gi, "$1/>");
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check normalizeFonts for chrome', () => {
      const input = "<div><span style='font-family:abcd'></span></div>";
      global.navigator.msPointerEnabled = false;
      const output = '<div><span style=\"font-family:Arial\"></span></div>';
      let actual = appConstants.normalizeFonts(input);
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check normalizeFonts for null content', () => {
      expect(appConstants.normalizeFonts('')).to.eq('');
    });
    it('should check normalizeFonts for content without span', () => {
      const input = "<div><p style='font-family:abcd'></p></div>";
      global.navigator.msPointerEnabled = false;
      const output = "<div><p style=\'font-family:abcd\'></p></div>";
      let actual = appConstants.normalizeFonts(input);
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check normalizeFonts for content span without font-family', () => {
      const input = "<div><span style='background-color:red'></span></div>";
      global.navigator.msPointerEnabled = false;
      const output = '<div><span style=\"background-color:red\"></span></div>';
      let actual = appConstants.normalizeFonts(input);
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check normalizeFonts for content span with font-family and background-color', () => {
      const input = "<div><span style='background-color:red;font-family:Arial;'></span></div>";
      global.navigator.msPointerEnabled = false;
      const output = '<div><span style=\"background-color:red;font-family:Arial;\"></span></div>';
      let actual = appConstants.normalizeFonts(input);
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check normalizeFonts for chrome for content with proper font', () => {
      const input = "<div><span style='font-family:Comic Sans MS'></span></div>";
      global.navigator.msPointerEnabled = false;
      const output = '<div><span style=\"font-family:Comic Sans MS\"></span></div>';
      let actual = appConstants.normalizeFonts(input);
      actual = actual
        .replace(/<html><head ?((.|[\n\r])*)>((.|[\n\r])*)<body>/igm, "")
        .replace("</body></html>", "");
      expect(actual).to.eq(output);
    });
    it('should check makeCamelcaseString with actual containing vale', () => {
      const demoStr = 'demo';
      const output = 'Demo';
      const result = appConstants.makeCamelcaseString(demoStr);
      expect(result).to.eq(output);
    });

  });

  describe('AppConstants normalizeDefaultValuesRichText', () => {

    it('normalizeDefaultValuesRichText msPointerEnabled=false', () => {
      // global.navigator.msPointerEnabled=false;
      mockIE();
      const templateXML = `
      <request>
      <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[<html><body><p>backer terms and conditions</p></body></html>]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value>test label</value>
      </option>
      <option>
        <name>paystubVisible</name>
        <value>true</value>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>freeText</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value>true</value>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value>true</value>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value>true</value>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
      <canonical>
      </canonical>
      </request>
      `;
      const expected = `<request>
      <options><option><name>backerTermsAndConditions</name><value><![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]></value></option><option><name>amountOwedLabel</name><value>test label</value></option><option><name>paystubVisible</name><value>true</value></option><option><name>letterBody</name><value><![CDATA[<html><body><p>This is place holder for the Letter Body section of the template</p></body></html>]]></value></option><option><name>letterBodyPage2</name><value><![CDATA[]]></value></option><option><name>letterBodyPage3</name><value><![CDATA[]]></value></option><option><name>freeText</name><value><![CDATA[<html><body><p>This is the place holder for the Additional Data section of the template</p></body></html>]]></value></option><option><name>canonicalXpath</name><value><html><body><p>canonical xpath</p></body></html></value></option><option><name>vouchervisible</name><value>true</value></option><option><name>voucher</name><value>:</value></option><option><name>providervisible</name><value>true</value></option><option><name>provider</name><value>:</value></option><option><name>diagnosisvisible</name><value>true</value></option><option><name>diagnosis</name><value>:</value></option></options><canonical>
      </canonical>
      </request>
      `;
      try {
        const result = appConstants.normalizeDefaultValuesRichText(templateXML);
        expect(result).to.eql(expected);
      } catch (error) {
        expect(error).to.not.eql(null);
      }

    });

    it('normalizeDefaultValuesRichText msPointerEnabled=true', () => {
      global.navigator.msPointerEnabled = false;
      const templateXML = `
      <request>
      <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[<html><body><p>backer terms and conditions</p></body></html>]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value>test label</value>
      </option>
      <option>
        <name>paystubVisible</name>
        <value>true</value>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>freeText</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value>true</value>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value>true</value>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value>true</value>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
      <canonical>
      </canonical>
      </request>
      `;
      const expected = "<request><options><option><name>backerTermsAndConditions</name><value><![CDATA[<html><body><p>backer terms and conditions</p></body></html>]]></value></option><option><name>amountOwedLabel</name><value>test label</value></option><option><name>paystubVisible</name><value>true</value></option><option><name>letterBody</name><value><![CDATA[<html><body><p>This is place holder for the Letter Body section of the template</p></body></html>]]></value></option><option><name>letterBodyPage2</name><value><![CDATA[]]></value></option><option><name>letterBodyPage3</name><value><![CDATA[]]></value></option><option><name>freeText</name><value><![CDATA[<html><body><p>This is the place holder for the Additional Data section of the template</p></body></html>]]></value></option><option><name>canonicalXpath</name><value><p>canonical xpath</p></value></option><option><name>vouchervisible</name><value>true</value></option><option><name>voucher</name><value>:</value></option><option><name>providervisible</name><value>true</value></option><option><name>provider</name><value>:</value></option><option><name>diagnosisvisible</name><value>true</value></option><option><name>diagnosis</name><value>:</value></option></options><canonical></canonical></request>      ";
      try {
        const result = appConstants.normalizeDefaultValuesRichText(templateXML);
        const r1 = result.replace(/\n/igm, '').replace(/>(\s*)</igm, '><').trim();
        const e1 = expected.replace(/\n/igm, '').replace(/>(\s*)</igm, '><').trim();
        expect(r1).to.eql(e1);
      } catch (error) {
        expect(error).to.not.eql(null);
      }

    });

  });

});

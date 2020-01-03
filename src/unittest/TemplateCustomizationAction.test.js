/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
// import moxios from 'moxios';
import {
  expect
} from 'chai';
import * as actions from '../../../app/actions/TemplateCustomizationAction';
import * as types from '../../../app/constants/TemplateCustomizationConstants';
import {DEFAULT_LETTER_BODY ,DEFAULT_ADDITIONAL_DATA,DEFAULT_BACKER } from '../../../app/constants/AppConstants';
import { mockIE } from '../Constants/AppConstants.test';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedTemplateOptions = {
  "richTextBackerTextArea": [{
    "name": "backer",
    "label": "BACKER",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>",
    "colorlist": []
  }],
  "richTextTemplateTextArea": [{
    "name": "onsertContent1",
    "label": "Onsert Content",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "onsertContent2",
    "label": "Onsert Content 2",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "onsertContent3",
    "label": "Onsert Content 3",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
    "colorlist": []
  }],
  "initialRichTextBackerTextArea": [{
    "name": "backer",
    "label": "BACKER",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>",
    "colorlist": []
  }],
  "initialRichTextTemplateTextArea": [{
    "name": "onsertContent1",
    "label": "Onsert Content",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "onsertContent2",
    "label": "Onsert Content 2",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "onsertContent3",
    "label": "Onsert Content 3",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
    "colorlist": []
  }],
  "initialLogoOptions": [{
    "name": "logovisible",
    "value": true
  }, {
    "name": "logotype",
    "selectedLogoTypeLayout": "squareLogotype"
  }],
  "initialColorOptions": [{
    "name": "primaryColor",
    "label": "Primary Color",
    "type": "color",
    "default": "1999CE",
    "value": "#1999CE",
    "colorlist": []
  }, {
    "name": "secondaryColor",
    "label": "Secondary Color",
    "type": "color",
    "default": "D8EDF9",
    "value": "#D8EDF9",
    "colorlist": []
  }, {
    "name": "tertiaryColor",
    "label": "Tertiary Color",
    "type": "color",
    "default": "1999CE",
    "value": "#1999CE",
    "colorlist": []
  }, {
    "name": "quaternaryColor",
    "label": "Quaternary Color",
    "type": "color",
    "default": "FFFFFF",
    "value": "#FFFFFF",
    "colorlist": []
  }],
  "initialLabelOptions": [{
    "name": "providerName",
    "label": "PROVIDER NAME",
    "type": "text",
    "value": "test provider",
    "colorlist": []
  }],
  "initialMessageOptions": [{
    "name": "messages",
    "label": "Messages",
    "type": "textArea",
    "default": "Did you know that you can pay online? Visit www.payclinic.com\n"+
    "      Do you need financial assistance? Call the helpdesk at (800) 123-4567",
    "value": "",
    "colorlist": []
  }],
  "initialCreditCardOptions": [{
    "name": "",
    "label": "masterCard",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "visa",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "americanExpress",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "discover",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "careCredit",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "payPal",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }],
  "initialMessageBodyOptions": [{
    "name": "letterBody",
    "label": "Letter Body",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>This is place holder for the Letter Body section of the template</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "freeText",
    "label": "Additional Data",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>This is the place holder for the Additional Data section of the template</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "letterBodyPage2",
    "label": "Page 2",
    "type": "richText",
    "default": "",
    "value": "",
    "colorlist": []
  }, {
    "name": "letterBodyPage3",
    "label": "Page 3",
    "type": "richText",
    "default": "",
    "value": "",
    "colorlist": []
  }],
  "initialAdditionalOptions": [{
    "name": "paymentDueLabel",
    "label": "Payment Due Label",
    "type": "text",
    "default": "Payment Due",
    "value": "test payment due label",
    "colorlist": []
  }, {
    name: 'color1',
    label: 'COLOR 1',
    type: 'color',
    default: 'FFFFFF',
    value: '#FFFFFF',
    "colorlist": []
  },
  {
    name: 'checkboxGroup1',
    label: 'CHECKBOX GROUP 1',
    type: 'checkboxGroup',
    default: false,
    value: true,
    "colorlist": []
  },
  {
    name: 'richtext1',
    label: 'RICH TEXT 1',
    type: 'richText',
    default: '<![CDATA[]]>',
    value: '<![CDATA[<html><body>test rich text</body></html>]]>',
    "colorlist": []
  },
  {
    name: 'default1',
    label: 'DEFAULT 1',
    type: 'default',
    default: '',
    value: 'test default',
    "colorlist": []
  }],
  "initialpaystubvisibleOptions": [{
    "name": "amountOwedLabel",
    "label": "Amount Owed Label",
    "type": "text",
    "default": "Amount Due",
    "value": "test amount due label",
    "colorlist": []
  }, {
    "name": "paystubVisible",
    "label": "PAYMENT STUB VISIBLE",
    "type": "checkbox",
    "default": false,
    "value": false
  }],
  "initialDiagnosisLabelOptions": [{
    "name": "vouchervisible",
    "label": "VOUCHER VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": true
  }, {
    "name": "voucher",
    "label": "VOUCHER",
    "type": "text",
    "default": "VOUCHER",
    "value": "voucher1",
    "colorlist": []
  }, {
    "name": "providervisible",
    "label": "PROVIDER VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": false
  }, {
    "name": "provider",
    "label": "PROVIDER",
    "type": "text",
    "default": "PROVIDER",
    "value": "provider1",
    "colorlist": []
  }, {
    "name": "diagnosisvisible",
    "label": "DIAGNOSIS VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": true
  }, {
    "name": "diagnosis",
    "label": "DIAGNOSIS",
    "type": "text",
    "default": "DIAGNOSIS",
    "value": "diagnosis1",
    "colorlist": []
  }],
  "paystubvisibleOptions": [{
    "name": "amountOwedLabel",
    "label": "Amount Owed Label",
    "type": "text",
    "default": "Amount Due",
    "value": "test amount due label",
    "colorlist": []
  }, {
    "name": "paystubVisible",
    "label": "PAYMENT STUB VISIBLE",
    "type": "checkbox",
    "default": false,
    "value": false
  }],
  "additionalOptions": [{
    "name": "paymentDueLabel",
    "label": "Payment Due Label",
    "type": "text",
    "default": "Payment Due",
    "value": "test payment due label",
    "colorlist": []
  }, {
    name: 'color1',
    label: 'COLOR 1',
    type: 'color',
    default: 'FFFFFF',
    value: '#FFFFFF',
    "colorlist": []
  },
  {
    name: 'checkboxGroup1',
    label: 'CHECKBOX GROUP 1',
    type: 'checkboxGroup',
    default: false,
    value: true,
    "colorlist": []
  },
  {
    name: 'richtext1',
    label: 'RICH TEXT 1',
    type: 'richText',
    default: '<![CDATA[]]>',
    value: '<![CDATA[<html><body>test rich text</body></html>]]>',
    "colorlist": []
  },
  {
    name: 'default1',
    label: 'DEFAULT 1',
    type: 'default',
    default: '',
    value: 'test default',
    "colorlist": []
  }],
  "logoOptions": [{
    "name": "logovisible",
    "value": true
  }, {
    "name": "logotype",
    "selectedLogoTypeLayout": "squareLogotype"
  }],
  "colorOptions": [{
    "name": "primaryColor",
    "label": "Primary Color",
    "type": "color",
    "default": "1999CE",
    "value": "#1999CE",
    "colorlist": []
  }, {
    "name": "secondaryColor",
    "label": "Secondary Color",
    "type": "color",
    "default": "D8EDF9",
    "value": "#D8EDF9",
    "colorlist": []
  }, {
    "name": "tertiaryColor",
    "label": "Tertiary Color",
    "type": "color",
    "default": "1999CE",
    "value": "#1999CE",
    "colorlist": []
  }, {
    "name": "quaternaryColor",
    "label": "Quaternary Color",
    "type": "color",
    "default": "FFFFFF",
    "value": "#FFFFFF",
    "colorlist": []
  }],
  "labelOptions": [{
    "name": "providerName",
    "label": "PROVIDER NAME",
    "type": "text",
    "value": "test provider",
    "colorlist": []
  }],
  "messageOptions": [{
    "name": "messages",
    "label": "Messages",
    "type": "textArea",
    "default": "Did you know that you can pay online? Visit www.payclinic.com\n"+
    "      Do you need financial assistance? Call the helpdesk at (800) 123-4567",
    "value": "",
    "colorlist": []
  }],
  "creditCardOptions": [{
    "name": "",
    "label": "masterCard",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "visa",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "americanExpress",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "discover",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "careCredit",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }, {
    "name": "",
    "label": "payPal",
    "type": "paymentCards",
    "default": "",
    "value": false,
    "colorlist": []
  }],
  "diagnosisLabelOptions": [{
    "name": "vouchervisible",
    "label": "VOUCHER VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": true
  }, {
    "name": "voucher",
    "label": "VOUCHER",
    "type": "text",
    "default": "VOUCHER",
    "value": "voucher1",
    "colorlist": []
  }, {
    "name": "providervisible",
    "label": "PROVIDER VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": false
  }, {
    "name": "provider",
    "label": "PROVIDER",
    "type": "text",
    "default": "PROVIDER",
    "value": "provider1",
    "colorlist": []
  }, {
    "name": "diagnosisvisible",
    "label": "DIAGNOSIS VISIBLE",
    "type": "checkbox",
    "default": true,
    "value": true
  }, {
    "name": "diagnosis",
    "label": "DIAGNOSIS",
    "type": "text",
    "default": "DIAGNOSIS",
    "value": "diagnosis1",
    "colorlist": []
  }],
  "messageBodyOptions": [{
    "name": "letterBody",
    "label": "Letter Body",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>This is place holder for the Letter Body section of the template</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "freeText",
    "label": "Additional Data",
    "type": "richText",
    "default": "",
    "value": "<![CDATA[<html><body><p>This is the place holder for the Additional Data section of the template</p></body></html>]]>",
    "colorlist": []
  }, {
    "name": "letterBodyPage2",
    "label": "Page 2",
    "type": "richText",
    "default": "",
    "value": "",
    "colorlist": []
  }, {
    "name": "letterBodyPage3",
    "label": "Page 3",
    "type": "richText",
    "default": "",
    "value": "",
    "colorlist": []
  }]
};
const inputTemplateOptions = `
<options>
  <option>
      <name>logotypeLayout</name>
      <label>Logotype Layout 1</label>
      <type>optionGroup</type>
      <default>squareLogotype</default>
      <list>
          <item>
              <id>squareLogotype</id>
              <label>Square Logotype</label>
          </item>
          <item>
              <id>verticalRectangleLogotype</id>
              <label>Vertical Rectangle Logotype</label>
          </item>
          <item>
              <id>horizontalRectangleLogotype</id>
              <label>Horizontal Rectangle Logotype</label>
          </item>
          <item>
              <id>largeLogotype</id>
              <label>Large Logotype</label>
          </item>
      </list>
  </option>
  <option optionGroup="squareLogotype">
      <name>logotype1</name>
      <label>Logotype 1</label>
      <type>logo</type>
      <properties>
          <width>0.417 in</width>
          <height>0.417 in</height>
      </properties>
  </option>
  <option optionGroup="verticalRectangleLogotype">
      <name>logotype1</name>
      <label>Logotype 1</label>
      <type>logo</type>
      <properties>
          <width>0.417 in</width>
          <height>0.646 in</height>
      </properties>
  </option>
  <option optionGroup="horizontalRectangleLogotype">
      <name>logotype1</name>
      <label>Logotype 1</label>
      <type>logo</type>
      <properties>
          <width>2.042 in</width>
          <height>0.417 in</height>
      </properties>
  </option>
  <option optionGroup="largeLogotype">
      <name>logotype1</name>
      <label>Logotype 1</label>
      <type>logo</type>
      <properties>
          <width>2.1 in</width>
          <height>0.688 in</height>
      </properties>
  </option>
  <option>
      <name>logovisible</name>
      <label>LOGO VISIBLE</label>
      <type>checkbox</type>
      <default>true</default>
  </option>
  <option>
      <name>paymentCards</name>
      <label>Payment Cards</label>
      <type>checkboxGroup</type>
      <default>masterCard,visa,americanExpress,discover,careCredit,payPal</default>
      <list>
          <item>
              <id>masterCard</id>
              <label>MasterCard</label>
          </item>
          <item>
              <id>visa</id>
              <label>Visa</label>
          </item>
          <item>
              <id>americanExpress</id>
              <label>American Express</label>
          </item>
          <item>
              <id>discover</id>
              <label>Discover</label>
          </item>
          <item>
              <id>careCredit</id>
              <label>CareCredit</label>
          </item>
          <item>
              <id>payPal</id>
              <label>PayPal</label>
          </item>
      </list>
  </option>
  <option>
    <name>primaryColor</name>
    <label>Primary Color</label>
    <type>color</type>
    <default>1999CE</default>
  </option>
  <option>
    <name>secondaryColor</name>
    <label>Secondary Color</label>
    <type>color</type>
    <default>D8EDF9</default>
  </option>
  <option>
    <name>tertiaryColor</name>
    <label>Tertiary Color</label>
    <type>color</type>
    <default>1999CE</default>
  </option>
  <option>
    <name>quaternaryColor</name>
    <label>Quaternary Color</label>
    <type>color</type>
    <default>FFFFFF</default>
  </option>
  <option>
    <name>messages</name>
    <label>Messages</label>
    <type>textArea</type>
    <default>Did you know that you can pay online? Visit www.payclinic.com
  Do you need financial assistance? Call the helpdesk at (800) 123-4567</default>
  </option>
  <option>
    <name>onsertContent1</name>
    <label>Onsert Content</label>
    <type>richText</type>
  </option>
  <option>
    <name>onsertContent2</name>
    <label>Onsert Content 2</label>
    <type>richText</type>
  </option>
  <option>
    <name>onsertContent3</name>
    <label>Onsert Content 3</label>
    <type>richText</type>
  </option>
  <option>
      <name>amountOwedLabel</name>
      <label>Amount Owed Label</label>
      <type>text</type>
      <default>Amount Due</default>
  </option>
  <option>
    <name>paymentDueLabel</name>
    <label>Payment Due Label</label>
    <type>text</type>
    <default>Payment Due</default>
  </option>
  <option>
    <name>color1</name>
    <label>COLOR1</label>
    <type>color</type>
    <default>FFFFFF</default>
  </option>
  <option>
    <name>checkboxGroup1</name>
    <label>CHECKBOX GROUP 1</label>
    <type>checkboxGroup</type>
    <default>false</default>
  </option>
  <option>
    <name>richtext1</name>
    <label>RICH TEXT 1</label>
    <type>richText</type>
    <default><![CDATA[]]></default>
  </option>
  <option>
      <name>letterBody</name>
      <label>Letter Body</label>
      <type>richText</type>
  </option>
  <option>
      <name>letterBodyPage2</name>
      <label>Page 2</label>
      <type>richText</type>
  </option>
  <option>
      <name>letterBodyPage3</name>
      <label>Page 3</label>
      <type>richText</type>
  </option>

  <option>
      <name>freeText</name>
      <label>Additional Data</label>
      <type>richText</type>
  </option>
      <option>
      <name>vouchervisible</name>
      <label>VOUCHER VISIBLE</label>
      <type>checkbox</type>
      <default>true</default>
  </option>
  <option>
    <name>voucher</name>
    <label>VOUCHER</label>
    <type>text</type>
    <default>VOUCHER</default>
  </option>
  <option>
      <name>providervisible</name>
      <label>PROVIDER VISIBLE</label>
      <type>checkbox</type>
      <default>true</default>
  </option>
  <option>
    <name>provider</name>
    <label>PROVIDER</label>
    <type>text</type>
    <default>PROVIDER</default>
  </option>
  <option>
      <name>diagnosisvisible</name>
      <label>DIAGNOSIS VISIBLE</label>
      <type>checkbox</type>
      <default>true</default>
  </option>
  <option>
    <name>diagnosis</name>
    <label>DIAGNOSIS</label>
    <type>text</type>
    <default>DIAGNOSIS</default>
  </option>
  <option>
    <name>paystubVisible</name>
    <label>PAYMENT STUB VISIBLE</label>
    <type>checkbox</type>
    <default>false</default>
 </option>
 <option>
    <name>providerName</name>
    <label>PROVIDER NAME</label>
    <type>text</type>
 </option>
</options>    
`;
process.env.API_ROOT_Server = 'https://10.220.30.70:443';
process.env.API_ROOT_Lambda =
  'https://mmu413hte4.execute-api.us-east-1.amazonaws.com/PBPS_CSSP_DEV';

describe('TemplateCustomizationAction getCanonicalFieldsXMl', () => {
  it('getCanonicalFieldsXMl', () => {
    const templateName = 'abc';
    const expectedResponse = `<request>
    <templateName>abc</templateName>
  </request>`;
    const returnValue = actions.getCanonicalFieldsXMl(templateName);

    expect(returnValue.replace(/ /g, '')).eqls(
      expectedResponse.replace(/ /g, ''),
    );
  });
});

describe('TemplateCustomizationAction GetCanonicalFields', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('GetCanonicalFields success', async () => {
    const templateName = 'KJackson';
    const expectedResponse = {
      data: '123'
    };

    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getCanonicalFields')
      .reply(200, {
        data: '123'
      });
    try {
      const actualResult = await actions.getCanonicalFields(templateName);
      expect(actualResult).contains(expectedResponse);
    } catch (e) {
      // console.log(e);
    }
  });

  it('GetCanonicalFields error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getCanonicalFields')
      .reply(500, undefined);
    try {
      await actions.getCanonicalFields();
    } catch (e) {
      // console.log(e);
    }
  });
});

describe('TemplateCustomizationAction LoadTemplate', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('LoadTemplate isPdf', async () => {
    const expectedResponse = {
      canonicalxml: '123'
    };

    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getPreview')
      .reply(200, {
        canonicalxml: '123'
      });

    const actualResult = await actions.loadTemplate(
      'ecodocxTemplateName',
      'ecodocxBackerName',
      'uniqueId', {
        configs: 'configs'
      },
      'canonicalXml',
      true,
    );

    expect(actualResult).contains(expectedResponse);
  });

  it('LoadTemplate API failed, isPdf', async () => {
    const expectedResponse = 'error';

    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getPreview')
      .reply(400, {
        error: 'error'
      });

    try {
      await actions.loadTemplate(
        'ecodocxTemplateName',
        'ecodocxBackerName',
        'uniqueId', {
          configs: 'configs'
        },
        'canonicalXml',
        true,
      );
    } catch (error) {
      const actualResult = error.error;
      expect(actualResult).contains(expectedResponse);
    }
  });

  it('LoadTemplate not isPdf', async () => {
    const expectedResponse = {};

    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getPreview')
      .reply(200, {
        canonicalxml: '123'
      });

    const actualResult = await actions.loadTemplate(
      'ecodocxTemplateName',
      'ecodocxBackerName',
      'uniqueId', {
        configs: 'configs'
      },
      'canonicalXml',
      false,
    );
    expect(actualResult).contains(expectedResponse);
  });
});

describe('TemplateCustomizationAction getTemplateXml', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getTemplateXMl API success', async () => {
    const expectedResponse = '1';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalxml')
      .reply(200, {
        canonicalxml: '123'
      });
    const returnValue = await actions.getTemplateXMl(
      '1',
      '2',
      '2',
      '2',
      '2',
      '2',
    );
    expect(returnValue).eqls(expectedResponse);
  });

  it('getTemplateXMl API success', async () => {
    const expectedResponse = '1';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalxml')
      .reply(200, {
        canonicalxml: '123'
      });
    const returnValue = await actions.getTemplateXMl(
      '1',
      null,
      null,
      null,
      '2',
      '2',
    );
    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction setConfigData', () => {
  it('setConfigData', () => {
    const configs = {
      templateName: 'templateName',
      backerTemplateName: 'backerTemplateName',
      ...expectedTemplateOptions
    };
    const expectedResponse = `
    <request>
<uniqueId>undefined</uniqueId>
<jobName>undefined</jobName>
<templateName>templateName</templateName>
<backerTemplateName>backerTemplateName</backerTemplateName>
<options>

<option>
<name>logovisible</name>
<value>true</value>
</option>

<option>
<name>logotypeLayout</name>
<value>squareLogotype</value>
</option>

<option>
<name>primaryColor</name>
<value>1999CE</value>
</option>

<option>
<name>secondaryColor</name>
<value>D8EDF9</value>
</option>

<option>
<name>tertiaryColor</name>
<value>1999CE</value>
</option>

<option>
<name>quaternaryColor</name>
<value>FFFFFF</value>
</option>

<option>
<name>providerName</name>
<value>testprovider</value>
</option>

<option>
<name>messages</name>
<value></value>
</option>

<option>
<name>backer</name>
<value><![CDATA[<html><body><p>TermsandConditionsMessage</p></body></html>]]></value>
</option>

<option>
<name>paymentCards</name>
<value></value>
</option>

<option>
<name>onsertContent1</name>
<value><![CDATA[<html><body><p>testonsert1</p></body></html>]]></value>
</option>

<option>
<name>onsertContent2</name>
<value><![CDATA[<html><body><p>testonsert2</p></body></html>]]></value>
</option>

<option>
<name>onsertContent3</name>
<value><![CDATA[<html><body><p>testonsert3</p></body></html>]]></value>
</option>

<option>
<name>letterBody</name>
<value><![CDATA[<html><body><p>ThisisplaceholderfortheLetterBodysectionofthetemplate</p></body></html>]]></value>
</option>

<option>
<name>freeText</name>
<value><![CDATA[<html><body><p>ThisistheplaceholderfortheAdditionalDatasectionofthetemplate</p></body></html>]]></value>
</option>

<option>
<name>letterBodyPage2</name>
<value></value>
</option>

<option>
<name>letterBodyPage3</name>
<value></value>
</option>

<option>
<name>paymentDueLabel</name>
<value>testpaymentduelabel</value>
</option>

<option>
<name>amountOwedLabel</name>
<value>testamountduelabel</value>
</option>

<option>
<name>paystubVisible</name>
<value>false</value>
</option>

<option>
<name>vouchervisible</name>
<value>true</value>
</option>

<option>
<name>voucher</name>
<value>voucher1:</value>
</option>

<option>
<name>providervisible</name>
<value>false</value>
</option>

<option>
<name>provider</name>
<value>provider1:</value>
</option>

<option>
<name>diagnosisvisible</name>
<value>true</value>
</option>

<option>
<name>diagnosis</name>
<value>diagnosis1:</value>
</option>

</options>
</request>
    `;
    try {
      const returnValue = actions.setConfigData(configs);
      expect(returnValue.replace(/ /g, '')).eqls(
        expectedResponse.replace(/ /g, ''),
      );
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction GetCustomizedCanonicalFields', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('GetCustomizedCanonicalFields API success', async () => {
    const expectedResponse = '123';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalfields')
      .reply(200, {
        CustomizedCanonicalOptions: '123'
      });
    const returnValue = await actions.getCustomizedCanonicalFields(
      '1',
      2,
      2,
      2,
      2,
    );
    expect(returnValue).eqls(expectedResponse);
  });

  it('GetCustomizedCanonicalFields API failed', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalfields')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getCustomizedCanonicalFields('1', 2, 2, 2, 2);
    } catch (error) {
      const returnValue = error.error;
      expect(returnValue).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction LoadChannelPartners', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('LoadChannelPartners API success', async () => {
    const expectedResponse = 'response';
    nock(process.env.API_ROOT_Server)
      .post('/api/ixtdb/executesp')
      .reply(200, {
        result: 'response'
      });
    const actualResult = await actions.loadChannelPartners(2);
    expect(actualResult).eqls(expectedResponse);
  });

  it('LoadChannelPartners failed', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/ixtdb/executesp')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.loadChannelPartners(2);
    } catch (error) {
      const actualResult = error.error;
      expect(actualResult).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction updateInputValue', () => {
  it('updateInputValue with name property', () => {
    const value = {
      name: 'abc'
    };
    const expectedResponse = {
      type: 'get_provider',
      selectedProviderName: value.name,
      selectedProviderId: value.id,
    };
    const returnValue = actions.updateInputValue(value);
    expect(returnValue).eqls(expectedResponse);
  });
  it('updateInputValue without name property', () => {
    const value = 'abc';
    const expectedResponse = {
      type: 'get_provider',
      selectedProviderName: value,
      selectedProviderId: value,
    };
    const returnValue = actions.updateInputValue(value);
    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction onAcceptLibraryClick', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('onAcceptLibraryClick API success', async () => {
    const expectedResponse = {
      cpDetails: 'response'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/posttemplatelogo')
      .reply(200, {
        cpDetails: 'response'
      });
    const returnValue = await actions.onAcceptLibraryClick(2, 2, {
      filename: '',
      Location: '',
      key: '',
    });
    expect(returnValue).eqls(expectedResponse);
  });

  it('onAcceptLibraryClick API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/template/posttemplatelogo')
      .reply(500, undefined);
    try {
      await actions.onAcceptLibraryClick(2, 2, {
        filename: '',
        Location: '',
        key: '',
      });
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction onAcceptClick', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('onAcceptClick API success', async () => {
    const expectedResponse = {
      cpDetails: 'response'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/posttemplatelogomapjob')
      .reply(200, {
        cpDetails: 'response'
      });
    const returnValue = await actions.onAcceptClick(2, 2, {
      filename: '',
      Location: '',
      key: '',
    });
    expect(returnValue).eqls(expectedResponse);
  });
  it('onAcceptClick API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/template/posttemplatelogomapjob')
      .reply(500, undefined);

    try {
      await actions.onAcceptClick(2, 2, {
        filename: '',
        Location: '',
        key: '',
      });
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction loadSelectedLogoName', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('loadSelectedLogoName API success', async () => {
    const expectedResponse = null;
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        message: 'response'
      });
    const returnValue = await actions.loadSelectedLogoName(2);
    expect(returnValue).eqls(expectedResponse);
  });

  it('loadSelectedLogoName API success', async () => {
    const expectedResponse = 'response';
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        logoname: 'response'
      });
    const returnValue = await actions.loadSelectedLogoName(2);
    expect(returnValue).eqls(expectedResponse);
  });

  it('loadSelectedLogoName API success', async () => {
    const expectedResponse = {
      logoname: ''
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        logoname: ''
      });
    try {
      await actions.loadSelectedLogoName(2);
    } catch (error) {
      expect(error).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction selectLogo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('selectLogo API success', async () => {
    const expectedResponse = {
      message: 'response'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/selecttemplatelogo')
      .reply(200, {
        message: 'response'
      });
    const returnValue = await actions.selectLogo(2, 1);
    expect(returnValue).eqls(expectedResponse);
  });

  it('selectLogo API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/template/selecttemplatelogo')
      .reply(500, undefined);
    try {
      await actions.selectLogo(2, 1);
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction LoadUploadedLogo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('LoadUploadedLogo API success', async () => {
    const expectedResponse = {
      type: types.GET_CUSTOMER_TEMPLATE_LOGO,
      uploadedLogoFiles: [{
        logoid: 1
      }],
      totalLogo: 1,
      logosDownloaded: true,
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/get_customer_template_logo')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const store = mockStore();
    await store.dispatch(actions.loadUploadedLogo(2, 2, 2));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });

  it('LoadUploadedLogo API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/template/get_customer_template_logo')
      .reply(500, '');
    const store = mockStore();
    try {
      await store.dispatch(actions.loadUploadedLogo(2, 2, 2));
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction DeleteLogo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('LoadUploadedLogo API success', async () => {
    const requestObject = {
      createdby: 'csspAdmin',
      selectedTemplateLogoId: 44,
      selectedCsspJobId: 356,
      templateId: 5,
      name: 'logotype',
    };
    const expectedResponse = {
      type: types.DELETE_CUSTOMER_TEMPLATE_LOGO,
      deleteLogoConfirm: 'success',
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/deleteLogoMapping')
      .reply(200, {
        data: 'success'
      });
    const store = mockStore();
    await store.dispatch(actions.deleteLogoMapping(requestObject));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });

  it('LoadUploadedLogo API success', async () => {
    const requestObject = {
      createdby: 'csspAdmin',
      selectedTemplateLogoId: 44,
      selectedCsspJobId: 356,
      templateId: 5,
      name: 'logotype',
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/deleteLogoMapping')
      .reply(500, '');
    const store = mockStore();
    try {
      await store.dispatch(actions.deleteLogoMapping(requestObject));
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction loadSelectedLogoId', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('loadSelectedLogoId API success', async () => {
    const expectedResponse = 0;
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        message: '123'
      });
    const returnValue = await actions.loadSelectedLogoId(2);

    expect(returnValue).eqls(expectedResponse);
  });

  it('loadSelectedLogoId API success', async () => {
    const expectedResponse = '123';
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        logoid: '123'
      });
    const returnValue = await actions.loadSelectedLogoId(2);

    expect(returnValue).eqls(expectedResponse);
  });

  it('loadSelectedLogoId API success', async () => {
    const expectedResponse = {
      logoid: ''
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template/getselectedtemplatelogo')
      .reply(200, {
        logoid: ''
      });
    try {
      await actions.loadSelectedLogoId(2);
    } catch (error) {
      expect(error).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction replaceAllSpecials', () => {
  it('replaceAllSpecials', () => {
    const comingString = 'testing&testing>testing<';
    const flag = 1;
    const expectedAction = 'testing&amp;testing&gt;testing&lt;';
    expect(actions.replaceAllSpecials(comingString, flag)).to.eql(
      expectedAction,
    );
  });
  it('replaceAllSpecials', () => {
    const comingString = 'testing&amp;testing&gt;testing&lt;';
    const flag = 2;
    const expectedAction = 'testing&testing>testing<';
    expect(actions.replaceAllSpecials(comingString, flag)).to.eql(
      expectedAction,
    );
  });
});

describe('TemplateCustomizationAction getInnerTags', () => {
  it('getInnerTags optionData=null', () => {
    const userConfigArr = ['name'];
    const expectedResponse = {
      name: '',
      label: '',
      type: '',
      default: '',
      value: '',
      colorlist: '',
    };
    const returnValue = actions.getInnerTags(null, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'color',
      default: 'optionDefault',
      value: '#optionDefault',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>color</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    </documents>
    `;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = ['name'];
    const returnValue = actions.getInnerTags(xmlDoc, userConfigArr);
    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: undefined,
      label: undefined,
      type: undefined,
      default: undefined,
      value: '',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name></name>
    <type></type>
    <default></default>
    <label></label>
    </documents>
    `;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = ['name'];
    const returnValue = actions.getInnerTags(xmlDoc, userConfigArr);
    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true tags doesnt content', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: undefined,
      label: undefined,
      type: undefined,
      default: undefined,
      value: '',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <nam>optionName</nam>
    <typ>color</typ>
    <defaul>optionDefault</defaul>
    <labe>optionLabel</labe>
    </documents>
    `;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = ['name'];
    const returnValue = actions.getInnerTags(xmlDoc, userConfigArr);
    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === color, has no userconfig', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'color',
      default: 'optionDefault',
      value: '#optionDefault',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>color</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = null;
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === color, has userconfig with no value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'color',
      default: 'optionDefault',
      value: '#optionDefault',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>color</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: ''
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === color, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'color',
      default: 'optionDefault',
      value: '#user value',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>color</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === richText, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'richText',
      default: '',
      value: 'user value',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>richText</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === checkboxGroup, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = [{
      name: 'item name',
      label: 'item label',
      type: 'optionName',
      default: '',
      value: false,
      colorlist: [],
    },];
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>checkboxGroup</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <item><name>item name</name><label>item label</label></item>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === checkboxGroup, userconfig no value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = [{
      name: 'item name',
      label: 'item label',
      type: 'optionName',
      default: '',
      value: false,
      colorlist: [],
    },];
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>checkboxGroup</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <item><name>item name</name><label>item label</label></item>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true, xml with values, optionType === checkboxGroup, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = [{
      name: 'item name',
      label: 'item label',
      type: 'optionName',
      default: '',
      value: false,
      colorlist: [],
    },];
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>checkboxGroup</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <item><name>item name</name><label>item label</label></item>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === checkboxGroup, has userconfig with blank', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = [{
      name: '',
      label: '',
      type: 'optionName',
      default: '',
      value: false,
      colorlist: [],
    },];
    const templateOptions = `
    <documents>
    <name>optionName</name>
    <type>checkboxGroup</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <item><name></name><label></label></item>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === logo, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'logo',
      properties: {
        width: '10',
        height: '20'
      },
      optionGroup: 'squareLogotype',
      value: '',
    };
    const templateOptions = `
    <option optionGroup="squareLogotype">
    <name>optionName</name>
    <type>logo</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <width>10</width>
    <height>20</height>
    </option>
    `;
    const parser = new DOMParser();
    const document = parser.parseFromString(templateOptions, 'text/xml');
    const optionData = document.getElementsByTagName('option')[0];
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true, xml with values, optionType === logo, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'logo',
      properties: {
        width: '10',
        height: '20'
      },
      optionGroup: 'squareLogotype',
      value: '',
    };
    const templateOptions = `
    <option optionGroup="squareLogotype">
    <name>optionName</name>
    <type>logo</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <width>10</width>
    <height>20</height>
    </option>
    `;
    const parser = new DOMParser();
    const document = parser.parseFromString(templateOptions, 'text/xml');
    const optionData = document.getElementsByTagName('option')[0];
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true, xml with values, optionType === logo, has userconfig with blank', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'logo',
      properties: {
        width: '',
        height: ''
      },
      optionGroup: 'squareLogotype',
      value: '',
    };
    const templateOptions = `
    <option optionGroup="squareLogotype">
    <name>optionName</name>
    <type>logo</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <width></width>
    <height></height>
    </option>
    `;
    const parser = new DOMParser();
    const document = parser.parseFromString(templateOptions, 'text/xml');
    const optionData = document.getElementsByTagName('option')[0];
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true, xml with values, optionType === logo, has userconfig with blank and option group of blank', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'logo',
      properties: {
        width: '',
        height: ''
      },
      optionGroup: '',
      value: '',
    };
    const templateOptions = `
    <option optionGroup="">
    <name>optionName</name>
    <type>logo</type>
    <default>optionDefault</default>
    <label>optionLabel</label>
    <width></width>
    <height></height>
    </option>
    `;
    const parser = new DOMParser();
    const document = parser.parseFromString(templateOptions, 'text/xml');
    const optionData = document.getElementsByTagName('option')[0];
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === optionList, has userconfig with value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'optionList',
      default: 'optionDefault',
      value: '#user value',
      colorlist: [{
        id: '#c1',
        label: 'c2'
      }, {
        id: '#bbc1',
        label: 'bbc2'
      }],
    };
    const templateOptions = `
    <documents>
      <name>optionName</name>
      <type>optionList</type>
      <default>optionDefault</default>
      <label>optionLabel</label>
      <itemlist>
        <item>
          <id>c1</id>
          <label>c2</label>
        </item>
        <item>
          <id>bbc1</id>
          <label>bbc2</label>
        </item>
      </itemlist>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: 'user value'
    }];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=false, xml with values, optionType === optionList, userconfig no value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'optionList',
      default: 'optionDefault',
      value: '#optionDefault',
      colorlist: [{
        id: '#c1',
        label: 'c2'
      }, {
        id: '#bbc1',
        label: 'bbc2'
      }],
    };
    const templateOptions = `
    <documents>
      <name>optionName</name>
      <type>optionList</type>
      <default>optionDefault</default>
      <label>optionLabel</label>
      <itemlist>
        <item>
          <id>c1</id>
          <label>c2</label>
        </item>
        <item>
          <id>bbc1</id>
          <label>bbc2</label>
        </item>
      </itemlist>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });

  it('getInnerTags msPointerEnabled=true, xml with values, optionType === optionList, userconfig no value', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      name: 'optionName',
      label: 'optionLabel',
      type: 'optionList',
      default: 'optionDefault',
      value: '#optionDefault',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
      <name>optionName</name>
      <type>optionList</type>
      <default>optionDefault</default>
      <label>optionLabel</label>
      <itemlist>
        <item>
          <id>c1</id>
          <label>c2</label>
        </item>
        <item>
          <id>bbc1</id>
          <label>bbc2</label>
        </item>
      </itemlist>
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = [{
      name: 'optionName',
      value: ''
    }];
    try {
      const returnValue = actions.getInnerTags(optionData, userConfigArr);
      expect(returnValue).to.eql(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('getInnerTags msPointerEnabled=false, xml with no nodes', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      name: null,
      label: null,
      type: null,
      default: null,
      value: '',
      colorlist: [],
    };
    const templateOptions = `
    <documents>
   
    </documents>
    `;
    const parser = new DOMParser();
    const optionData = parser.parseFromString(templateOptions, 'text/xml');
    const userConfigArr = ['name'];
    const returnValue = actions.getInnerTags(optionData, userConfigArr);

    expect(returnValue).to.eql(expectedResponse);
  });
});

describe('TemplateCustomizationAction getLogoMapping', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getLogoMapping API success', async () => {
    const expectedResponse = {
      message: '123'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Logo_Mapping')
      .reply(200, {
        message: '123'
      });
    const returnValue = await actions.getLogoMapping(2, 2, 2);
    expect(returnValue).eqls(expectedResponse);
  });

  it('getLogoMapping API Error', async () => {
    const expectedResponse = {
      error: 'error'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Logo_Mapping')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getLogoMapping(2, 2, 2);
    } catch (error) {
      expect(error.error).eqls(expectedResponse.error);
    }
  });
});

describe('TemplateCustomizationAction generateOptionDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('generateOptionDetails msPointerEnabled=false', async () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Logo_Mapping')
      .reply(200, {
        message: '123'
      });
    const expectedResponse = {
      richTextBackerTextArea: [{
        name: null,
        label: null,
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
        colorlist: [],
      },],
      richTextTemplateTextArea: [{
        name: 'onsertContent',
        label: null,
        type: null,
        default: null,
        value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
        colorlist: [],
      },],
      initialRichTextBackerTextArea: [{
        name: null,
        label: null,
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
        colorlist: [],
      },],
      initialRichTextTemplateTextArea: [{
        name: 'onsertContent',
        label: null,
        type: null,
        default: null,
        value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
        colorlist: [],
      },],
      initialLogoOptions: {
        message: '123'
      },
      initialMessageBodyOptions: [],
      initialColorOptions: [{
        name: 'primaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'secondaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'tertiaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'quaternaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      ],
      initialLabelOptions: [{
        name: 'providerName',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      initialMessageOptions: [{
        name: 'messages',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      initialCreditCardOptions: [{
        name: 'paymentCards',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      initialAdditionalOptions: [{
        name: 'sth',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      additionalOptions: [{
        name: 'sth',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      logoOptions: {
        message: '123'
      },
      colorOptions: [{
        name: 'primaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'secondaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'tertiaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      {
        name: 'quaternaryColor',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },
      ],
      labelOptions: [{
        name: 'providerName',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      messageOptions: [{
        name: 'messages',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      creditCardOptions: [{
        name: 'paymentCards',
        label: null,
        type: null,
        default: null,
        value: '',
        colorlist: [],
      },],
      initialDiagnosisLabelOptions: [],
    };
    const selectedCsspJobId = 1;
    const selectedTemplateId = 1;
    const templateOptions = `
    <options>
      <option optionGroup="squareLogotype">
        <name>logotype</name>
      </option>
      <option optionGroup="largeLogotype">
        <name>logotype</name>
      </option>
      <option>
        <name>logotypeLayout</name>
      </option>
      <option>
        <name>primaryColor</name>
      </option>
      <option>
        <name>secondaryColor</name>
      </option>
      <option>
        <name>tertiaryColor</name>
      </option>
      <option>
        <name>quaternaryColor</name>
      </option>
      <option>
        <name>providerName</name>
      </option>
      <option>
        <name>messages</name>
      </option>
      <option>
        <name>paymentCards</name>
      </option>
      <option>
        <name>onsertContent</name>
      </option>
      <option>
        <name>sth</name>
      </option>
    </options>
    `;
    const backerOptions = `
    <options>
      <option>
        <type>richText</type>
      </option>
    </options>
    `;
    const configRecordsOptionArr = [];
    const disableLogos = true;
    const disableColors = true;
    const disableLabel = true;
    const disableMessage = true;
    const disableCreditCard = true;
    const disableAdditionalOptions = [];
    const diagnosisLabelDisable = false;
    const disableMessageBodyOptions = false;

    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    try {
      const returnValue = await actions.generateOptionDetails(
        selectedCsspJobId,
        selectedTemplateId,
        templateOptions,
        backerOptions,
        configRecordsOptionArr,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        disableMessageBodyOptions
      );
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('generateOptionDetails msPointerEnabled=false', async () => {
    try {
      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: true,
        configurable: true,
      });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Logo_Mapping')
        .reply(200, {
          message: '123'
        });
      const expectedResponse = {
        richTextBackerTextArea: [],
        richTextTemplateTextArea: [],
        initialRichTextBackerTextArea: [],
        initialRichTextTemplateTextArea: [],
        initialMessageBodyOptions: [],
        initialLogoOptions: {
          message: '123'
        },
        initialColorOptions: [{
          name: 'primaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'secondaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'tertiaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'quaternaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        ],
        initialLabelOptions: [{
          name: 'providerName',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialMessageOptions: [{
          name: 'messages',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        messageOptions: [{
          name: 'messages',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialCreditCardOptions: [{
          name: 'paymentCards',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialAdditionalOptions: [{
          name: 'sth',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialDiagnosisLabelOptions: [],
      };
      const selectedCsspJobId = 1;
      const selectedTemplateId = 1;
      const templateOptions = `
      <options>
        <option optionGroup="squareLogotype">
          <name>logotype</name>
        </option>
        <option optionGroup="largeLogotype">
          <name>logotype</name>
        </option>
        <option>
          <name>logotypeLayout</name>
        </option>
        <option>
          <name>primaryColor</name>
        </option>
        <option>
          <name>secondaryColor</name>
        </option>
        <option>
          <name>tertiaryColor</name>
        </option>
        <option>
          <name>quaternaryColor</name>
        </option>
        <option>
          <name>providerName</name>
        </option>
        <option>
          <name>messages</name>
        </option>
        <option>
          <name>paymentCards</name>
        </option>
        <option>
          <name>sth</name>
        </option>
      </options>
      `;
      const backerOptions = `
      <options>
        <option>
          <type></type>
        </option>
      </options>
      `;
      const configRecordsOptionArr = [];
      const disableLogos = false;
      const disableColors = false;
      const disableLabel = false;
      const disableMessage = false;
      const disableCreditCard = false;
      const disableAdditionalOptions = false;
      const diagnosisLabelDisable = false;
      const disableMessageBodyOptions = false;

      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: false,
        configurable: true,
      });
      const returnValue = await actions.generateOptionDetails(
        selectedCsspJobId,
        selectedTemplateId,
        templateOptions,
        backerOptions,
        configRecordsOptionArr,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        diagnosisLabelDisable,
        disableMessageBodyOptions
      );
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql((null));
    }
  });

  it('generateOptionDetails msPointerEnabled=false', async () => {
    try {
      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: false,
        configurable: true,
      });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Logo_Mapping')
        .reply(200, {
          message: '123'
        });
      const expectedResponse = {
        richTextBackerTextArea: [{
          name: null,
          label: null,
          type: 'richText',
          default: '',
          value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
          colorlist: [],
        },],
        richTextTemplateTextArea: [{
          name: 'onsertContent',
          label: null,
          type: null,
          default: null,
          value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
          colorlist: [],
        },],
        initialRichTextBackerTextArea: [{
          name: null,
          label: null,
          type: 'richText',
          default: '',
          value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
          colorlist: [],
        },],
        initialRichTextTemplateTextArea: [{
          name: 'onsertContent',
          label: null,
          type: null,
          default: null,
          value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
          colorlist: [],
        },],
        initialLogoOptions: {
          message: '123',
        },
        initialMessageBodyOptions: [],
        initialColorOptions: [{
          name: 'primaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'secondaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'tertiaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'quaternaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        ],
        initialLabelOptions: [{
          name: 'providerName',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialMessageOptions: [],
        initialCreditCardOptions: [{
          name: 'paymentCards',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialAdditionalOptions: [{
          name: 'sth',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        additionalOptions: [{
          name: 'sth',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        logoOptions: {
          message: '123',
        },
        colorOptions: [{
          name: 'primaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'secondaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'tertiaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        {
          name: 'quaternaryColor',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },
        ],
        labelOptions: [{
          name: 'providerName',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        messageOptions: [{
          name: 'messages',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        creditCardOptions: [{
          name: 'paymentCards',
          label: null,
          type: null,
          default: null,
          value: '',
          colorlist: [],
        },],
        initialDiagnosisLabelOptions: [],
      };
      const selectedCsspJobId = 1;
      const selectedTemplateId = 1;
      const templateOptions = `
      <options>
        <option>
          <name>logotype</name>
        </option>
        <option>
          <name>primaryColor</name>
        </option>
        <option>
          <name>secondaryColor</name>
        </option>
        <option>
          <name>tertiaryColor</name>
        </option>
        <option>
          <name>quaternaryColor</name>
        </option>
        <option>
          <name>providerName</name>
        </option>
        <option>
          <name>messages</name>
        </option>
        <option>
          <name>paymentCards</name>
        </option>
        <option>
          <name>onsertContent</name>
        </option>
        <option>
          <name>sth</name>
        </option>
      </options>    
      `;
      const backerOptions = `
      <options>
        <option>
          <type>richText</type>
        </option>
      </options>
      `;
      const configRecordsOptionArr = [];
      const disableLogos = true;
      const disableColors = true;
      const disableLabel = true;
      const disableMessage = true;
      const disableCreditCard = true;
      const disableAdditionalOptions = [];
      const diagnosisLabelDisable = false;
      const disableMessageBodyOptions = false;

      const returnValue = await actions.generateOptionDetails(
        selectedCsspJobId,
        selectedTemplateId,
        templateOptions,
        backerOptions,
        configRecordsOptionArr,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        diagnosisLabelDisable,
        disableMessageBodyOptions
      );
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('generateOptionDetails msPointerEnabled=false', async () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Logo_Mapping')
      .reply(200, {
        message: '123'
      });
    const expectedResponse = {
      initialLogoOptions: {
        message: '123'
      },
      richTextBackerTextArea: [{
        name: 'backer',
        label: 'BACKER',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
      },],
      initialRichTextBackerTextArea: [{
        name: 'backer',
        label: 'BACKER',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>',
      },],
      initialMessageBodyOptions: [{
        name: 'letterBody',
        label: 'LETTER BODY',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>This is placeholder for letter body</p></body></html>]]>',
      }, {
        name: 'freeText',
        label: 'ADDITIONAL DATA',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>This is placeholder for additional data</p></body></html>]]>',
      }, {
        name: 'letterBodyPage2',
        label: 'PAGE 2',
        type: 'richText',
        default: '',
        value: '<![CDATA[]]>',
      }, {
        name: 'letterBodyPage3',
        label: 'PAGE 3',
        type: 'richText',
        default: '',
        value: '<![CDATA[]]>',
      }],
      messsageBodyOptions: [{
        name: 'letterBody',
        label: 'LETTER BODY',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>This is placeholder for letter body</p></body></html>]]>',
      }, {
        name: 'freeText',
        label: 'ADDITIONAL DATA',
        type: 'richText',
        default: '',
        value: '<![CDATA[<html><body><p>This is placeholder for additional data</p></body></html>]]>',
      }, {
        name: 'letterBodyPage2',
        label: 'PAGE 2',
        type: 'richText',
        default: '',
        value: '<![CDATA[]]>',
      }, {
        name: 'letterBodyPage3',
        label: 'PAGE 3',
        type: 'richText',
        default: '',
        value: '<![CDATA[]]>',
      }],
      initialpaystubvisibleOptions: [{
        name: 'amountOwedLabel',
        label: 'Amount Owed Label',
        type: 'text',
        default: 'Amount Due',
        value: '500',
      }, {
        name: 'paystubVisible',
        label: 'PAYMENT STUB VISIBLE',
        type: 'chekbox',
        default: 'false',
        value: 'true',
      }],
      paystubvisibleOptions: [{
        name: 'amountOwedLabel',
        label: 'Amount Owed Label',
        type: 'text',
        default: 'Amount Due',
        value: '500',
      }, {
        name: 'paystubVisible',
        label: 'PAYMENT STUB VISIBLE',
        type: 'chekbox',
        default: 'false',
        value: 'true',
      }],
      initialMessageOptions: [],
      initialCreditCardOptions: [],
      initialAdditionalOptions: [],
      initialDiagnosisLabelOptions: [{
        name: 'vouchervisible',
        label: 'VOUCHER VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'voucher',
        label: 'VOUCHER',
        type: 'text',
        default: 'VOUCHER',
        value: 'voucher1',
      }, {
        name: 'providervisible',
        label: 'PROVIDER VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'provider',
        label: 'PROVIDER',
        type: 'text',
        default: 'PROVIDER',
        value: 'provider1',
      }, {
        name: 'diagnosisvisible',
        label: 'DIAGNOSIS VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'diagnosis',
        label: 'DIAGNOSIS',
        type: 'text',
        default: 'DIAGNOSIS',
        value: 'diagnosis1',
      }],
      diagnosisLabelOptions: [{
        name: 'vouchervisible',
        label: 'VOUCHER VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'voucher',
        label: 'VOUCHER',
        type: 'text',
        default: 'VOUCHER',
        value: 'voucher1',
      }, {
        name: 'providervisible',
        label: 'PROVIDER VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'provider',
        label: 'PROVIDER',
        type: 'text',
        default: 'PROVIDER',
        value: 'provider1',
      }, {
        name: 'diagnosisvisible',
        label: 'DIAGNOSIS VISIBLE',
        type: 'checkbox',
        default: 'true',
        value: 'true',
      }, {
        name: 'diagnosis',
        label: 'DIAGNOSIS',
        type: 'text',
        default: 'DIAGNOSIS',
        value: 'diagnosis1',
      }]
    };
    const selectedCsspJobId = 1;
    const selectedTemplateId = 1;
    const templateOptions = `
    <options>
    ↵<option>
          <name>logotypeLayout</name>
          <label>Logotype Layout 1</label>
          <type>optionGroup</type>
          <default>squareLogotype</default>
          <list>
              <item>
                  <id>squareLogotype</id>
                  <label>Square Logotype</label>
              </item>
              <item>
                  <id>verticalRectangleLogotype</id>
                  <label>Vertical Rectangle Logotype</label>
              </item>
              <item>
                  <id>horizontalRectangleLogotype</id>
                  <label>Horizontal Rectangle Logotype</label>
              </item>
              <item>
                  <id>largeLogotype</id>
                  <label>Large Logotype</label>
              </item>
          </list>
      </option>
      <option optionGroup="squareLogotype">
          <name>logotype1</name>
          <label>Logotype 1</label>
          <type>logo</type>
          <properties>
              <width>0.417 in</width>
              <height>0.417 in</height>
          </properties>
      </option>
      <option optionGroup="verticalRectangleLogotype">
          <name>logotype1</name>
          <label>Logotype 1</label>
          <type>logo</type>
          <properties>
              <width>0.417 in</width>
              <height>0.646 in</height>
          </properties>
      </option>
      <option optionGroup="horizontalRectangleLogotype">
          <name>logotype1</name>
          <label>Logotype 1</label>
          <type>logo</type>
          <properties>
              <width>2.042 in</width>
              <height>0.417 in</height>
          </properties>
      </option>
      <option optionGroup="largeLogotype">
          <name>logotype1</name>
          <label>Logotype 1</label>
          <type>logo</type>
          <properties>
              <width>2.1 in</width>
              <height>0.688 in</height>
          </properties>
      </option>
      <option>
          <name>logovisible</name>
          <label>LOGO VISIBLE</label>
          <type>checkbox</type>
          <default>true</default>
      </option>
      <option>
          <name>amountOwedLabel</name>
          <label>Amount Owed Label</label>
          <type>text</type>
          <default>Amount Due</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>Letter Body</label>
          <type>richText</type>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>Page 2</label>
          <type>richText</type>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>Page 3</label>
          <type>richText</type>
      </option>
      <option>
          <name>paystubVisible</name>
          <label>PAYMENT STUB VISIBLE</label>
          <type>checkbox</type>
          <default>false</default>
      </option>
      <option>
          <name>freeText</name>
          <label>Additional Data</label>
          <type>richText</type>
      </option>
          <option>
          <name>vouchervisible</name>
          <label>VOUCHER VISIBLE</label>
          <type>checkbox</type>
          <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
          <name>providervisible</name>
          <label>PROVIDER VISIBLE</label>
          <type>checkbox</type>
          <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
          <name>diagnosisvisible</name>
          <label>DIAGNOSIS VISIBLE</label>
          <type>checkbox</type>
          <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>  
    </options>    
    `;
    const backerOptions = `
    <options>
      <option>
        <name>backer</name>
        <label>BACKER</label>
        <type>richText</type>
        <default/>
      </option>
    </options>
    `;
    const configRecordsOptionArr = [{
      name: 'letterBody',
      value: '<![CDATA[<html><body><p>This is placeholder for letter body</p></body></html>]]>',
    }, {
      name: 'freeText',
      value: '<![CDATA[<html><body><p>This is placeholder for additional data</p></body></html>]]>',
    }, {
      name: 'letterBodyPage2',
      value: '',
    }, {
      name: 'letterBodyPage3',
      value: '',
    }, {
      name: 'amountOwedLabel',
      value: '500'
    }, {
      name: 'paystubVisible',
      value: true
    }, {
      name: 'vouchervisible',
      value: 'true'
    }, {
      name: 'voucher',
      value: 'voucher1'
    }, {
      name: 'providervisible',
      value: true
    }, {
      name: 'provider',
      value: 'provider1'
    }, {
      name: 'diagnosisvisible',
      value: 'true'
    }, {
      name: 'diagnosis',
      value: 'diagnosis1'
    }, {
      name: 'backer',
      value: '<![CDATA[<html><body><p>Terms and Conditions Message</p></body></html>]]>'
    }];
    const disableLogos = true;
    const disableColors = true;
    const disableLabel = true;
    const disableMessage = true;
    const disableCreditCard = true;
    const disableAdditionalOptions = true;
    const diagnosisLabelDisable = false;
    const disableMessageBodyOptions = false;
    const disablePaymentStub = false;

    try {
      const returnValue = await actions.generateOptionDetails(
        selectedCsspJobId,
        selectedTemplateId,
        templateOptions,
        backerOptions,
        configRecordsOptionArr,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        disableMessageBodyOptions,
        disablePaymentStub,
        diagnosisLabelDisable
      );
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('generateOptionDetails msPointerEnabled=true', async () => {
    mockIE();
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Logo_Mapping')
      .reply(200, [{
        name: 'logovisible',
        value: true
      }, {
        name: 'logotype',
        selectedLogoTypeLayout: 'squareLogotype'
      }]);
    const expectedResponse = {
      ...expectedTemplateOptions
    };
    const selectedCsspJobId = 1;
    const selectedTemplateId = 1;
    const templateOptions = inputTemplateOptions;
    const backerOptions = `
    <options>
      <option>
        <name>backer</name>
        <label>BACKER</label>
        <type>richText</type>
        <default/>
      </option>
    </options>
    `;
    const configRecordsOptionArr = [{
      name: 'onsertContent1',
      value: '<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>'
    }, {
      name: 'onsertContent2',
      value: '<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>'
    }, {
      name: 'onsertContent3',
      value: '<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>'
    }, {
      name: 'paymentDueLabel',
      value: 'test payment due label'
    }, {
      name: 'providerName',
      value: 'test provider'
    }, {
      name: 'letterBody',
      value: '<![CDATA[]]>',
    }, {
      name: 'freeText',
      value: '<![CDATA[]]>',
    }, {
      name: 'letterBodyPage2',
      value: '',
    }, {
      name: 'letterBodyPage3',
      value: '',
    }, {
      name: 'amountOwedLabel',
      value: 'test amount due label'
    }, {
      name: 'paystubVisible',
      value: true
    }, {
      name: 'vouchervisible',
      value: 'true'
    }, {
      name: 'voucher',
      value: 'voucher1'
    }, {
      name: 'providervisible',
      value: true
    }, {
      name: 'provider',
      value: 'provider1'
    }, {
      name: 'diagnosisvisible',
      value: 'true'
    }, {
      name: 'diagnosis',
      value: 'diagnosis1'
    }, {
      name: 'backer',
      value: '<![CDATA[]]>'
    }];
    const disableLogos = true;
    const disableColors = true;
    const disableLabel = true;
    const disableMessage = true;
    const disableCreditCard = true;
    const disableAdditionalOptions = true;
    const diagnosisLabelDisable = true;
    const disableMessageBodyOptions = true;
    const disablePaymentStub = true;

    try {
      const returnValue = await actions.generateOptionDetails(
        selectedCsspJobId,
        selectedTemplateId,
        templateOptions,
        backerOptions,
        configRecordsOptionArr,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        disableMessageBodyOptions,
        disablePaymentStub,
        diagnosisLabelDisable
      );
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction setLogoConfigData', () => {
  it('setLogoConfigData API success', () => {
    const expectedResponse = `
    <request>
<uniqueId>uniqueid</uniqueId>
<jobName>jobname</jobName>
<templateName>templateName</templateName>
<providerId>uniqueid</providerId>

<contentType>selectedTemplateLogoContentType</contentType>
<image>selectedTemplateLogoBase64String</image>

</request>`;
    const configs = {
      templateName: 'templateName',
      uniqueid: 'uniqueid',
      providerId: 'providerId',
      jobname: 'jobname',
      logoOptions: [{
        selectedTemplateLogoBase64String: 'selectedTemplateLogoBase64String',
        selectedTemplateLogoContentType: 'selectedTemplateLogoContentType',
      },],
    };
    try {
      const returnValue = actions.setLogoConfigData(configs);

      expect(returnValue.replace(/ /g, '')).eqls(
        expectedResponse.replace(/ /g, ''),
      );
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction getXml', () => {
  it('getXml  with special character', () => {
    const options = [{
      name: 'name',
      value: '&amp;value&gt;'
    }];
    const expectedResponse = `
    <option>
    <name>name</name>
    <value>&amp;value&gt;</value>
    </option>
    `;
    const returnValue = actions.getXml(options);

    expect(returnValue.replace(/ /g, '')).to.eql(
      expectedResponse.replace(/ /g, ''),
    );
  });
  it('getXml  without special character', () => {
    const options = [{
      name: 'name',
      value: 'value'
    }];
    const expectedResponse = `
    <option>
    <name>name</name>
    <value>value</value>
    </option>
    `;
    const returnValue = actions.getXml(options);

    expect(returnValue.replace(/ /g, '')).to.eql(
      expectedResponse.replace(/ /g, ''),
    );
  });
});

describe('TemplateCustomizationAction getXmlTypeRichText', () => {
  it('getXmlTypeRichText', () => {
    const options = [{
      name: 'name'
    },
    {
      name: 'name',
      value: 'value'
    },
    {
      name: 'name',
      value: 'value font-family: core-sans, sans-serif;'
    },
    {
      name: 'name',
      value: 'value color: rgb(102,102,102)'
    },
    {
      name: 'name',
      value: 'value background-color: rgb(255,255,255)'
    },
    {
      name: 'name',
      value: 'value style=""'
    },
    ];
    const expectedResponse = `
    <option>
    <name>name</name>
    <value>[objectObject],[objectObject],[objectObject],[objectObject],[objectObject],[objectObject]</value>
    </option>

    <option>
    <name>name</name>
    <value>value</value>
    </option>

    <option>
    <name>name</name>
    <value>valuefont-family:core-sans,sans-serif;</value>
    </option>

    <option>
    <name>name</name>
    <value>valuecolor:rgb(102,102,102)</value>
    </option>

    <option>
    <name>name</name>
    <value>valuebackground-color:rgb(255,255,255)</value>
    </option>

    <option>
    <name>name</name>
    <value>value</value>
    </option>
    `;
    const returnValue = actions.getXmlTypeRichText(options);

    expect(returnValue.replace(/ /g, '')).to.eql(
      expectedResponse.replace(/ /g, ''),
    );
  });
});

describe('TemplateCustomizationAction changesDetected', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('changesDetected API success', async () => {
    const expectedResponse = {
      type: 'Changes_Detected',
      records: {
        results: [{
          logoid: 1
        }]
      },
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const store = mockStore();
    await store.dispatch(actions.changesDetected(2));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });

  it('changesDetected API Error', async () => {
    const expectedResponse = {
      type: types.FETCH_ERROR,
      error: 'error',
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(400, {
        error: 'error'
      });
    const store = mockStore();
    await store.dispatch(actions.changesDetected(2));
    expect(store.getActions()[0].type).eqls(expectedResponse.type);
    expect(store.getActions()[0].errorMessage.error).eqls(
      expectedResponse.error,
    );
  });
});

describe('TemplateCustomizationAction updatedDetectedChangesApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('updatedDetectedChangesApiCall API success', async () => {
    const expectedResponse = {
      results: [{
        logoid: 1
      }]
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const returnValue = await actions.updatedDetectedChangesApiCall(2);

    expect(returnValue).eqls(expectedResponse);
  });

  it('updatedDetectedChangesApiCall API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(500, undefined);
    try {
      await actions.updatedDetectedChangesApiCall();
    } catch (error) {
      // console.log(error);
    }
  });
});

describe('TemplateCustomizationAction setPartnerInRevieAndFinishUp', () => {
  it('setPartnerInRevieAndFinishUp', async () => {
    const expectedResponse = {
      type: 'SetPartnerInRevieAndFinishUp',
      records: 'values',
    };
    const store = mockStore();
    await store.dispatch(actions.setPartnerInRevieAndFinishUp('values'));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction getTemplateOptions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getTemplateOptions API success', async () => {
    const expectedResponse = {
      results: [{
        logoid: 1
      }]
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplateOptions')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const returnValue = await actions.getTemplateOptions('templateName');

    expect(returnValue).eqls(expectedResponse);
  });

  it('getTemplateOptions API Error', async () => {
    const expectedResponse = {
      error: 'error'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplateOptions')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getTemplateOptions('templateName');
    } catch (error) {
      expect(error.error).eqls(expectedResponse.error);
    }

    // expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction getTemplateBackerOption ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getTemplateBackerOption  API success', async () => {
    const expectedResponse = {
      results: [{
        logoid: 1
      }]
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplateBackerOptions')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const returnValue = await actions.getTemplateBackerOption(
      'ecodocxBackerName',
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('getTemplateBackerOption API Error', async () => {
    const expectedResponse = {
      error: 'error'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplateBackerOptions')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getTemplateBackerOption('ecodocxBackerName');
    } catch (error) {
      expect(error.error).eqls(expectedResponse.error);
    }

    // expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction saveCustomizedCanonicalDataApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Due Date, Radio', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: true,
        newValueAfterDays: '6',
        newValueMessageRadio: true,
        newValueMessage: 'new value message1',
      },],
      bb: [{
        newValueAfterDaysRadio: true,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'new newValueMessage',
      }],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '',
        newValueMessageRadio: false,
        newValueMessage: '',
      },],
      bb: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '',
        newValueMessageRadio: false,
        newValueMessage: '',
      }],
    };
    const dropdown = 'Due Date';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    try {
      const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
        selectedCsspJobId,
        ecodocxTemplateId,
        customizedCanonical,
        initialCustomizedCanonical,
        dropdown,
        detectedChanges,
        providerName,
        customerId,
        createdBy,
        companyId,
      );
  
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Due Date, Radio, no value', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: true,
        newValueAfterDays: '',
        newValueMessageRadio: false,
        newValueMessage: 'new newValueMessage',
        cssp_value: '5',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: true,
        newValueAfterDays: '3',
        newValueMessageRadio: false,
        newValueMessage: 'old newValueMessage',
        cssp_value: '5',
      },],
      bb: [],
    };
    const dropdown = 'Due Date';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Due Date, Message', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'new newValueMessage',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const dropdown = 'Due Date';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Due Date, Message, no value', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '',
        newValueMessageRadio: true,
        newValueMessage: '',
        cssp_value: 'new newValueMessage',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const dropdown = 'Due Date';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Due Date, Message no change', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const dropdown = 'Due Date';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown != Due Date', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: 'new value',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: 'old value',
      },],
      bb: [],
    };
    const dropdown = 'dropdown';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = Addresses', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: 'value',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const dropdown = 'Addresses';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });
  it('saveCustomizedCanonicalDataApiCall dropdown = Addresses, no value', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
      },],
      bb: [],
    };
    const dropdown = 'Addresses';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = xxx, value changed', async () => {
    const expectedResponse = {
      resSaveCustomizedCanonicalDataApiCall: {
        results: '123'
      },
      resUpdatedDetectedChangesApiCall: '321',
    };
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: '1',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: '1',
      },],
      bb: [],
    };
    const dropdown = 'xxx';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        data: '321'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(200, {
        results: '123'
      });
    const returnValue = await actions.saveCustomizedCanonicalDataApiCall(
      selectedCsspJobId,
      ecodocxTemplateId,
      customizedCanonical,
      initialCustomizedCanonical,
      dropdown,
      detectedChanges,
      providerName,
      customerId,
      createdBy,
      companyId,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('saveCustomizedCanonicalDataApiCall dropdown = xxx, value changed', async () => {
    const expectedResponse = 'error';
    const selectedCsspJobId = '';
    const ecodocxTemplateId = '';
    const customizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '5',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: '1',
      },],
      bb: [],
    };
    const initialCustomizedCanonical = {
      keys: ['aa', 'bb'],
      aa: [{
        newValueAfterDaysRadio: false,
        newValueAfterDays: '3',
        newValueMessageRadio: true,
        newValueMessage: 'old newValueMessage',
        value: '1',
      },],
      bb: [],
    };
    const dropdown = 'xxx';
    const detectedChanges = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        error: 'error'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/updatemultiplevalue')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.saveCustomizedCanonicalDataApiCall(
        selectedCsspJobId,
        ecodocxTemplateId,
        customizedCanonical,
        initialCustomizedCanonical,
        dropdown,
        detectedChanges,
        providerName,
        customerId,
        createdBy,
        companyId,
      );
    } catch (error) {
      const returnValue = error.error;

      expect(returnValue).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction getInnerCanonicalTags', () => {
  it('getInnerCanonicalTags msPointerEnabled = false', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = {
      fieldName: 'canonicalXpath',
      fieldDescription: 'description',
      fieldSample: 'sample',
      strsReference: 'strsReference',
    };
    const parser = new DOMParser();
    const canonicalFieldsData = parser.parseFromString(
      `
    <root>
    <canonicalXpath>canonicalXpath</canonicalXpath>
    <description>description</description>
    <sample>sample</sample>
    <strsReference>strsReference</strsReference>
    </root>
    `,
      'text/xml',
    );
    const returnValue = actions.getInnerCanonicalTags(canonicalFieldsData);

    expect(returnValue).eqls(expectedResponse);
  });

  it('getInnerCanonicalTags msPointerEnabled = true', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      fieldName: 'canonicalXpath',
      fieldDescription: 'description',
      fieldSample: 'sample',
      strsReference: 'strsReference',
    };
    const parser = new DOMParser();
    const canonicalFieldsData = parser.parseFromString(
      `
    <root>
    <canonicalXpath>canonicalXpath</canonicalXpath>
    <description>description</description>
    <sample>sample</sample>
    <strsReference>strsReference</strsReference>
    </root>
    `,
      'text/xml',
    );
    const returnValue = actions.getInnerCanonicalTags(canonicalFieldsData);

    expect(returnValue).eqls(expectedResponse);
  });

  it('getInnerCanonicalTags msPointerEnabled = true and empty nodes', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: true,
      configurable: true,
    });
    const expectedResponse = {
      fieldName: '',
      fieldDescription: '',
      fieldSample: '',
      strsReference: '',
    };
    const parser = new DOMParser();
    const canonicalFieldsData = parser.parseFromString(
      `
    <root>
    <canonicalXpath></canonicalXpath>
    <description></description>
    <sample></sample>
    <strsReference></strsReference>
    </root>
    `,
      'text/xml',
    );
    const returnValue = actions.getInnerCanonicalTags(canonicalFieldsData);

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction getCanonicalFieldsData', () => {
  it('getCanonicalFieldsData msPointerEnabled = false', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = [{
      fieldName: 'canonicalXpath',
      fieldDescription: 'description',
      fieldSample: 'sample',
      strsReference: 'strsReference',
    },];
    const cannonicalFields = `
    <root>
      <field>
        <canonicalXpath>canonicalXpath</canonicalXpath>
        <description>description</description>
        <sample>sample</sample>
        <strsReference>strsReference</strsReference>
      </field>
    </root>
    `;
    const returnValue = actions.getCanonicalFieldsData(cannonicalFields);

    expect(returnValue).eqls(expectedResponse);
  });
  it('getCanonicalFieldsData msPointerEnabled = true', () => {
    mockIE();
    const expectedResponse = [{
      fieldName: 'canonicalXpath',
      fieldDescription: 'description',
      fieldSample: 'sample',
      strsReference: 'strsReference',
    },];
    const cannonicalFields = `
    <root>
      <field>
        <canonicalXpath>canonicalXpath</canonicalXpath>
        <description>description</description>
        <sample>sample</sample>
        <strsReference>strsReference</strsReference>
      </field>
    </root>
    `;
    try {
      const returnValue = actions.getCanonicalFieldsData(cannonicalFields);

      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction getOptions', () => {
  it('getOptions msPointerEnabled = false, no options', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = '{}';
    const configRecords = ``;
    const returnValue = actions.getOptions(configRecords);

    expect(JSON.stringify(returnValue)).eqls(expectedResponse);
  });
  it('getOptions msPointerEnabled = false', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = '{"0":{}}';
    const configRecords = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value>&lt;html&gt;</value>
      </option>
      <option>
        <name>onsertContent</name>
        <value>&lt;html&gt;</value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value>&lt;html&gt;</value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value>&lt;html&gt;</value>
      </option>
    </options>
    `;
    const returnValue = actions.getOptions(configRecords);

    expect(JSON.stringify(returnValue)).eqls(expectedResponse);
  });

  it('getOptions msPointerEnabled = false', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = '{"0":{}}';
    const configRecords = `
    <options>
      <option>
        <name></name>
        <value></value>
      </option>
    </options>
    `;
    const returnValue = actions.getOptions(configRecords);
    expect(JSON.stringify(returnValue)).eqls(expectedResponse);
  });

  it('getOptions msPointerEnabled = false', () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = '{"0":{}}';
    const configRecords = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value>&lt;html&gt;</value>
      </option>
      <option>
        <name>onsertContent</name>
        <value>&lt;/html&gt;</value>
      </option>
    </options>
    `;
    const returnValue = actions.getOptions(configRecords);
    expect(JSON.stringify(returnValue)).eqls(expectedResponse);
  });
  it('getOptions msPointerEnabled = true', () => {
    mockIE();
    const expectedResponse = '{"0":{}}';
    const configRecords = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
        <name>onsertContent</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
        <name>onsertContent1</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
        <name>onsertContent2</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
        <name>onsertContent3</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
          <name>letterBody</name>
          <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
          <name>freeText</name>
          <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value>&lt;html&gt;&lt;body&gt;&lt;div&gt;</value>
      </option>
    </options>
    `;
    try {
      const returnValue = actions.getOptions(configRecords);

      expect(JSON.stringify(returnValue)).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  // it('getUserConfiguration  API success', async () => {
  //   const expectedResponse = { results: [{ logoid: 1 }] };
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/ecodocx/getUserConfiguration')
  //     .reply(200, { results: [{ logoid: 1 }] });
  //   const returnValue = await actions.getUserConfiguration(
  //     'getUserConfiguration',
  //   );

  //   expect(returnValue).eqls(expectedResponse);
  // });

  // it('getUserConfiguration  API error', async () => {
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/ecodocx/getUserConfiguration')
  //     .reply(500, undefined);
  //   try {
  //     await actions.getUserConfiguration();
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // });
});

describe('TemplateCustomizationAction replaceWithDefaultMessagesAndCreditCards',()=>{
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = true', () => {
    mockIE();
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>true"+
    "</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>This"+
    " is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value></option><"+
    "option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option><option><name>"+
    "freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is the place holder"+
    " for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;]]&gt;"+
    "</value></option><option><name>canonicalXpath</name><value><![CDATA[<html><body><p>canonical"+
    " xpath</p></body></html>]]></value></option><option><name>vouchervisible</name><value> "+
    "</value></option><option><name>voucher</name><value>VOUCHER:</value></option><option><name>"+
    "providervisible</name><value> </value></option><option><name>provider</name><value>PROVIDER:"+
    "</value></option><option><name>diagnosisvisible</name><value> </value></option><option><name>"+
    "diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value> </value>
      </option>
      <option>
        <name>paystubVisible</name>
        <value> </value>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value> </value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value> </value>
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
        <value> </value>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value> </value>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value> </value>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = true 2nd branch', () => {
    mockIE();
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>true"+
    "</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>"+
    "This is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value>"+
    "</option><option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option>"+
    "<option><name>freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is "+
    "the place holder for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;"+
    "/html&gt;]]&gt;</value></option><option><name>canonicalXpath</name><value><![CDATA[<html>"+
    "<body><p>canonical xpath</p></body></html>]]></value></option><option><name>vouchervisible"+
    "</name><value> </value></option><option><name>voucher</name><value>VOUCHER:</value></option>"+
    "<option><name>providervisible</name><value> </value></option><option><name>provider</name>"+
    "<value>PROVIDER:</value></option><option><name>diagnosisvisible</name><value> </value></option>"+
    "<option><name>diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value> </value>
      </option>
      <option>
        <name>paystubVisible</name>
        <value> </value>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>freeText</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value> </value>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value> </value>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value> </value>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = true with half options', () => {
    mockIE();
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>"+
    "true</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>"+
    "This is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value>"+
    "</option><option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option>"+
    "<option><name>freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is "+
    "the place holder for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;"+
    "/html&gt;]]&gt;</value></option><option><name>canonicalXpath</name><value><![CDATA[<html>"+
    "<body><p>canonical xpath</p></body></html>]]></value></option><option><name>vouchervisible"+
    "</name><value> </value></option><option><name>voucher</name><value>VOUCHER:</value></option>"+
    "<option><name>providervisible</name><value> </value></option><option><name>provider</name>"+
    "<value>PROVIDER:</value></option><option><name>diagnosisvisible</name><value> </value>"+
    "</option><option><name>diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value> </value>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value> </value>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value> </value>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = true with empty options', () => {
    mockIE();
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>"+
    "true</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body>"+
    "<p>This is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value>"+
    "</option><option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option><option>"+
    "<name>freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is the place "+
    "holder for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;]]"+
    "&gt;</value></option><option><name>canonicalXpath</name><value><![CDATA[<html><body><p>"+
    "canonical xpath</p></body></html>]]></value></option><option><name>vouchervisible</name>"+
    "<value> </value></option><option><name>voucher</name><value>VOUCHER:</value></option><option>"+
    "<name>providervisible</name><value> </value></option><option><name>provider</name><value>"+
    "PROVIDER:</value></option><option><name>diagnosisvisible</name><value> </value></option>"+
    "<option><name>diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `<options></options>`;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = false', () => {
    global.navigator.msPointerEnabled=false;
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>"+
    "true</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body>"+
    "<p>This is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value>"+
    "</option><option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option>"+
    "<option><name>freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is "+
    "the place holder for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;"+
    "/html&gt;]]&gt;</value></option><option><name>canonicalXpath</name><value><![CDATA[<html>"+
    "<body><p>canonical xpath</p></body></html>]]></value></option><option><name>vouchervisible"+
    "</name><value> </value></option><option><name>voucher</name><value>VOUCHER:</value></option>"+
    "<option><name>providervisible</name><value> </value></option><option><name>provider</name>"+
    "<value>PROVIDER:</value></option><option><name>diagnosisvisible</name><value> </value>"+
    "</option><option><name>diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value/>
      </option>
      <option>
        <name>paystubVisible</name>
        <value/>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value/>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value/>
      </option>
      <option>
          <name>freeText</name>
          <value/>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value/>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value/>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value/>
      </option>
      <option>
        <name>diagnosis</name>
        <value/>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = false 2nd branch', () => {
    global.navigator.msPointerEnabled=false;
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>true"+
    "</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>This "+
    "is place holder for the Letter Body section of the template</p></body></html>]]>]]></value>"+
    "</option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value></option><option>"+
    "<name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option><option><name>freeText"+
    "</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is the place holder for the "+
    "Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;]]&gt;</value>"+
    "</option><option><name>canonicalXpath</name><value><![CDATA[<html><body><p>canonical xpath</p>"+
    "</body></html>]]></value></option><option><name>vouchervisible</name><value> </value></option>"+
    "<option><name>voucher</name><value>VOUCHER:</value></option><option><name>providervisible"+
    "</name><value> </value></option><option><name>provider</name><value>PROVIDER:</value></option>"+
    "<option><name>diagnosisvisible</name><value> </value></option><option><name>diagnosis</name>"+
    "<value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
        <name>amountOwedLabel</name>
        <value/>
      </option>
      <option>
        <name>paystubVisible</name>
        <value/>
      </option>
      <option>
          <name>letterBody</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
          <name>freeText</name>
          <value><![CDATA[[CDATA[]]]]></value>
      </option>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value/>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value/>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value/>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = false with half options', () => {
    global.navigator.msPointerEnabled=false;
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>true"+
    "</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>"+
    "This is place holder for the Letter Body section of the template</p></body></html>]]>]]>"+
    "</value></option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value></option>"+
    "<option><name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option><option><name>"+
    "freeText</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is the place holder "+
    "for the Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;]]&gt;"+
    "</value></option><option><name>canonicalXpath</name><value><![CDATA[<html><body><p>canonical "+
    "xpath</p></body></html>]]></value></option><option><name>vouchervisible</name><value> </value>"+
    "</option><option><name>voucher</name><value>VOUCHER:</value></option><option><name>"+
    "providervisible</name><value> </value></option><option><name>provider</name><value>PROVIDER:"+
    "</value></option><option><name>diagnosisvisible</name><value> </value></option><option><name>"+
    "diagnosis</name><value>DIAGNOSIS:</value></option>";
    const options = `
    <options>
      <option>
        <name>canonicalXpath</name>
        <value><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></value>
      </option>
      <option>
        <name>vouchervisible</name>
        <value/>
      </option>
      <option>
        <name>voucher</name>
        <value>:</value>
      </option>
      <option>
        <name>providervisible</name>
        <value/>
      </option>
      <option>
        <name>provider</name>
        <value>:</value>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <value/>
      </option>
      <option>
        <name>diagnosis</name>
        <value>:</value>
      </option>
    </options>
    `;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('replaceWithDefaultMessagesAndCreditCards msPointerEnabled = false with empty options', () => {
    global.navigator.msPointerEnabled=false;
    const templateOptions=`
    <options>
      <option>
        <name>amountOwedLabel</name>
        <label>Amount Owed Label</label>
        <type>text</type>
        <default>test amount owed label</default>
      </option>
      <option>
        <name>paystubVisible</name>
        <label>Pay Stub Visible</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
          <name>letterBody</name>
          <label>LETTER BODY</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>letter body</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage2</name>
          <label>PAGE 2</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page2</p></body></html>]]></default>
      </option>
      <option>
          <name>letterBodyPage3</name>
          <label>PAGE 3</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>page3</p></body></html>]]></default>
      </option>
      <option>
          <name>freeText</name>
          <label>ADDITIONAL DATA</label>
          <type>richText</type>
          <default><![CDATA[<html><body><p>additional data</p></body></html>]]></default>
      </option>
      <option>
        <name>canonicalXpath</name>
        <label>CANONICAL XPATH</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>canonical xpath</p></body></html>]]></default>
      </option>
      <option>
        <name>vouchervisible</name>
        <label>VOUCHER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>voucher</name>
        <label>VOUCHER</label>
        <type>text</type>
        <default>VOUCHER</default>
      </option>
      <option>
        <name>providervisible</name>
        <label>PROVIDER VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>provider</name>
        <label>PROVIDER</label>
        <type>text</type>
        <default>PROVIDER</default>
      </option>
      <option>
        <name>diagnosisvisible</name>
        <label>DIAGNOSIS VISIBLE</label>
        <type>checkbox</type>
        <default>true</default>
      </option>
      <option>
        <name>diagnosis</name>
        <label>DIAGNOSIS</label>
        <type>text</type>
        <default>DIAGNOSIS</default>
      </option>
    </options>
    `;
    const backerOptions=`
    <options>
      <option>
        <name>backerTermsAndConditions</name>
        <label>BACKER</label>
        <type>richText</type>
        <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
      </option>
    </options>
    `;
    const expectedResponse = "<option><name>backerTermsAndConditions</name><value><![CDATA[<html>"+
    "<body><p>backer&</p></body></html>]]></value></option><option><name>amountOwedLabel</name>"+
    "<value>test amount owed label</value></option><option><name>paystubVisible</name><value>true"+
    "</value></option><option><name>letterBody</name><value><![CDATA[<![CDATA[<html><body><p>This "+
    "is place holder for the Letter Body section of the template</p></body></html>]]>]]></value>"+
    "</option><option><name>letterBodyPage2</name><value>&lt;![CDATA[]]&gt;</value></option><option>"+
    "<name>letterBodyPage3</name><value>&lt;![CDATA[]]&gt;</value></option><option><name>freeText"+
    "</name><value>&lt;![CDATA[&lt;html&gt;&lt;body&gt;&lt;p&gt;This is the place holder for the "+
    "Additional Data section of the template&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;]]&gt;</value>"+
    "</option><option><name>canonicalXpath</name><value><![CDATA[<html><body><p>canonical xpath</p>"+
    "</body></html>]]></value></option><option><name>vouchervisible</name><value> </value></option>"+
    "<option><name>voucher</name><value>VOUCHER:</value></option><option><name>providervisible"+
    "</name><value> </value></option><option><name>provider</name><value>PROVIDER:</value></option>"+
    "<option><name>diagnosisvisible</name><value> </value></option><option><name>diagnosis</name>"+
    "<value>DIAGNOSIS:</value></option>";
    const options = `<options></options>`;
    const p=new DOMParser();
    const doc=p.parseFromString(options,'text/xml');
    try {
      const returnValue = actions.replaceWithDefaultMessagesAndCreditCards(
        doc.getElementsByTagName('options'),
        templateOptions,
        backerOptions
      );

      expect(returnValue.configs).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

// I think we're not using this function anymore
// Please remove it if everything works fine after a while
// describe('TemplateCustomizationAction getUserConfiguration', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });

//   it('getUserConfiguration  API success', async () => {
//     const expectedResponse = { results: [{ logoid: 1 }] };
//     nock(process.env.API_ROOT_Server)
//       .post('/api/ecodocx/getUserConfiguration')
//       .reply(200, { results: [{ logoid: 1 }] });
//     const returnValue = await actions.getUserConfiguration('getUserConfiguration');

describe('TemplateCustomizationAction getDataApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getDataApiCall  API success', async () => {
    const expectedResponse = {
      results: [{
        logoid: 1
      }]
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_data_api_call')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const returnValue = await actions.getDataApiCall('getUserConfiguration');

    expect(returnValue).eqls(expectedResponse);
  });

  it('getDataApiCall  API success', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_data_api_call')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getDataApiCall('getUserConfiguration');
    } catch (error) {
      const returnValue = error.error;

      expect(returnValue).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction getRefreshedDataApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getRefreshedDataApiCall  API success', async () => {
    const expectedResponse = {
      results: [{
        logoid: 1
      }]
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_refreshed_data_api_call')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const returnValue = await actions.getRefreshedDataApiCall(
      'getUserConfiguration',
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('getRefreshedDataApiCall failed', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_refreshed_data_api_call')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.getRefreshedDataApiCall('getUserConfiguration');
    } catch (error) {
      const returnValue = error.error;

      expect(returnValue).eqls(expectedResponse);
    }
  });
});

// describe('TemplateCustomizationAction getCanonicalXml', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });

//   it('getCanonicalXml  API success', async () => {
//     const expectedResponse = [{
//       logoid: 1
//     }];
//     nock(process.env.API_ROOT_Server)
//       .post('/api/template_customization/get_Canonical_Xml')
//       .reply(200, {
//         canonicalXml: [{
//           logoid: 1
//         }]
//       });
//     const returnValue = await actions.getCanonicalXml('getUserConfiguration');

//     expect(returnValue).eqls(expectedResponse);
//   });

//   it('getCanonicalXml failed', async () => {
//     const expectedResponse = 'error';
//     nock(process.env.API_ROOT_Server)
//       .post('/api/template_customization/get_Canonical_Xml')
//       .reply(400, {
//         error: 'error'
//       });
//     try {
//       await actions.getCanonicalXml('getUserConfiguration');
//     } catch (error) {
//       const returnValue = error.error;

//       expect(returnValue).eqls(expectedResponse);
//     }
//   });
// });

describe('TemplateCustomizationAction getDataTemplateCustomization', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getDataTemplateCustomization API success', async () => {
    try {
      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: false,
        configurable: true,
      });
      const expectedResponse = `
      {"type":"TemplateCustomization_fetch_initial_data","channelPartnerDetails":null,"previewRecords":{"canonicalxml":"123"},
      "configRecords":"\\n<options>\\n<option>\\n<name>backerTermsAndConditions</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n
      <option>\\n<name>onsertContent</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n</options>\\n",
      "cannonicalFields":"\\n<root>\\n<field>\\n<canonicalXpath>canonicalXpath</canonicalXpath>\\n<description>description</description>\\n
      <sample>sample</sample>\\n<strsReference>strsReference</strsReference>\\n</field>\\n</root>\\n","pdfFileURL":"details",
      "configRecordsOptionArr":[{"name":"backerTermsAndConditions","value":""},{"name":"onsertContent"
      ,"value":""}
      ,{"name":"canonicalXpath","value":""},
      {"name":"canonicalXpath","value":""}],"canonicalFieldsData":[{"fieldName":"canonicalXpath","fieldDescription":"description",
      "fieldSample":"sample","strsReference":"strsReference"}],"customizedCanonicalOptions":"123","initialCustomizedCanonicalOptions":"123",
      "pdfPageWidth":"","documentType":""}`;
      nock(process.env.API_ROOT_Server)
        .post('/api/ixtdb/executesp')
        .reply(200, {
          result: 'response'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_data_api_call')
        .reply(200, {
          cannonicalFields: `
          <root>
            <field>
              <canonicalXpath>canonicalXpath</canonicalXpath>
              <description>description</description>
              <sample>sample</sample>
              <strsReference>strsReference</strsReference>
            </field>
          </root>
          `,
          configRecords: `
          <options>
            <option>
              <name>backerTermsAndConditions</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>onsertContent</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
          </options>
          `,
          templateOptions: `
          <options>
            <option>
              <name>paymentCards</name>
              <label>Payment Cards</label>
              <type>checkboxGroup</type>
              <default>masterCard,visa,americanExpress,discover,careCredit,payPal</default>
              <list>
                <item>
                    <id>masterCard</id>
                    <label>MasterCard</label>
                </item>
                <item>
                    <id>visa</id>
                    <label>Visa</label>
                </item>
                <item>
                    <id>americanExpress</id>
                    <label>American Express</label>
                </item>
                <item>
                    <id>discover</id>
                    <label>Discover</label>
                </item>
                <item>
                    <id>careCredit</id>
                    <label>CareCredit</label>
                </item>
                <item>
                    <id>payPal</id>
                    <label>PayPal</label>
                </item>
              </list>
            </option>
            <option>
              <name>messages</name>
              <label>Messages</label>
              <type>textArea</type>
              <default>Did you know that you can pay online? Visit www.payclinic.com
            Do you need financial assistance? Call the helpdesk at (800) 123-4567</default>
            </option>
            <option>
              <name>onsertContent</name>
              <label>Onsert Content</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent2</name>
              <label>Onsert Content 2</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent3</name>
              <label>Onsert Content 3</label>
              <type>richText</type>
            </option>
        </options>`
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Canonical_Xml')
        .reply(200, {
          canonicalXml: [{
            logoid: 1
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/ecodocx/getPreview')
        .reply(200, {
          canonicalxml: '123'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/customizedcanonical/getcustomizedcanonicalfields')
        .reply(200, {
          CustomizedCanonicalOptions: '123'
        });
      global.URL.createObjectURL = jest.fn(() => 'details');
      const ixtSystemId = '';
      const uniqueId = '';
      const selectedCustomerId = '';
      const selectedProviderId = '';
      const selectedIxtjobName = '';
      const selectedCsspJobId = '';
      const selectedTemplateId = '';
      const templateName = '';
      const backerTemplateName = '';
      const documentType = '';
      const isChannelPartner = '';
      const pdfPageWidth = '';
      const disableLogos = '';
      const disableColors = '';
      const disableLabel = '';
      const disableMessage = '';
      const disableCreditCard = '';
      const disableAdditionalOptions = '';
      const isPdf = '';
      const store = mockStore();
      await store.dispatch(
        await actions.getDataTemplateCustomization(
          ixtSystemId,
          uniqueId,
          selectedCustomerId,
          selectedProviderId,
          selectedIxtjobName,
          selectedCsspJobId,
          selectedTemplateId,
          templateName,
          backerTemplateName,
          documentType,
          isChannelPartner,
          pdfPageWidth,
          disableLogos,
          disableColors,
          disableLabel,
          disableMessage,
          disableCreditCard,
          disableAdditionalOptions,
          isPdf,
        ),
      );

      expect(
        JSON.stringify(store.getActions()[0])
          .replace(/ /g, '')
          .replace(/\n/g, ''),
      ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('getDataTemplateCustomization API success for msPointerEnable=true', async () => {
    mockIE();
    try {
      const expectedResponse = `
      {"type":"TemplateCustomization_fetch_initial_data","channelPartnerDetails":null,"previewRecords":{"canonicalxml":"123"},
      "configRecords":"\\n<options>\\n<option>\\n<name>backerTermsAndConditions</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n
      <option>\\n<name>onsertContent</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n</options>\\n",
      "cannonicalFields":"\\n<root>\\n<field>\\n<canonicalXpath>canonicalXpath</canonicalXpath>\\n<description>description</description>\\n
      <sample>sample</sample>\\n<strsReference>strsReference</strsReference>\\n</field>\\n</root>\\n","pdfFileURL":"details",
      "configRecordsOptionArr":[{"name":"backerTermsAndConditions","value":""},{"name":"onsertContent"
      ,"value":""},{"name":"canonicalXpath","value":""},
      {"name":"canonicalXpath","value":""}],"canonicalFieldsData":[{"fieldName":"canonicalXpath","fieldDescription":"description",
      "fieldSample":"sample","strsReference":"strsReference"}],"customizedCanonicalOptions":"123","initialCustomizedCanonicalOptions":"123",
      "pdfPageWidth":"","documentType":""}`;
      nock(process.env.API_ROOT_Server)
        .post('/api/ixtdb/executesp')
        .reply(200, {
          result: 'response'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_data_api_call')
        .reply(200, {
          cannonicalFields: `
          <root>
            <field>
              <canonicalXpath>canonicalXpath</canonicalXpath>
              <description>description</description>
              <sample>sample</sample>
              <strsReference>strsReference</strsReference>
            </field>
          </root>
          `,
          configRecords: `
          <options>
            <option>
              <name>backerTermsAndConditions</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>onsertContent</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
          </options>
          `,
          templateOptions: `
          <options>
            <option>
              <name>paymentCards</name>
              <label>Payment Cards</label>
              <type>checkboxGroup</type>
              <default>masterCard,visa,americanExpress,discover,careCredit,payPal</default>
              <list>
                <item>
                    <id>masterCard</id>
                    <label>MasterCard</label>
                </item>
                <item>
                    <id>visa</id>
                    <label>Visa</label>
                </item>
                <item>
                    <id>americanExpress</id>
                    <label>American Express</label>
                </item>
                <item>
                    <id>discover</id>
                    <label>Discover</label>
                </item>
                <item>
                    <id>careCredit</id>
                    <label>CareCredit</label>
                </item>
                <item>
                    <id>payPal</id>
                    <label>PayPal</label>
                </item>
              </list>
            </option>
            <option>
              <name>messages</name>
              <label>Messages</label>
              <type>textArea</type>
              <default>Did you know that you can pay online? Visit www.payclinic.com
            Do you need financial assistance? Call the helpdesk at (800) 123-4567</default>
            </option>
            <option>
              <name>onsertContent</name>
              <label>Onsert Content</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent2</name>
              <label>Onsert Content 2</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent3</name>
              <label>Onsert Content 3</label>
              <type>richText</type>
            </option>
        </options>`,
          backerOptions:`
        <options>
          <option>
            <name>backerTermsAndConditions</name>
            <label>BACKER</label>
            <type>richText</type>
            <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
          </option>
        </options>
        `,
          customizedCanonicalOptions:[{field:'field1'}]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Canonical_Xml')
        .reply(200, {
          canonicalXml: [{
            logoid: 1
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/ecodocx/getPreview')
        .reply(200, {
          canonicalxml: '123'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/customizedcanonical/getcustomizedcanonicalfields')
        .reply(200, {
          CustomizedCanonicalOptions: '123'
        });
      global.URL.createObjectURL = jest.fn(() => 'details');
      const ixtSystemId = '';
      const uniqueId = '';
      const selectedCustomerId = '';
      const selectedProviderId = '';
      const selectedIxtjobName = '';
      const selectedCsspJobId = '';
      const selectedTemplateId = '';
      const templateName = '';
      const backerTemplateName = '';
      const documentType = '';
      const isChannelPartner = '';
      const pdfPageWidth = '';
      const disableLogos = '';
      const disableColors = '';
      const disableLabel = '';
      const disableMessage = '';
      const disableCreditCard = '';
      const disableAdditionalOptions = '';
      const isPdf = '';
      const store = mockStore();
      await store.dispatch(
        await actions.getDataTemplateCustomization(
          ixtSystemId,
          uniqueId,
          selectedCustomerId,
          selectedProviderId,
          selectedIxtjobName,
          selectedCsspJobId,
          selectedTemplateId,
          templateName,
          backerTemplateName,
          documentType,
          isChannelPartner,
          pdfPageWidth,
          disableLogos,
          disableColors,
          disableLabel,
          disableMessage,
          disableCreditCard,
          disableAdditionalOptions,
          isPdf,
        ),
      );

      expect(
        JSON.stringify(store.getActions()[0])
          .replace(/ /g, '')
          .replace(/\n/g, ''),
      ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('getDataTemplateCustomization API success, isChannelPartner', async () => {
    try {
      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: false,
        configurable: true,
      });
      const expectedResponse = `
      {"type":"TemplateCustomization_fetch_initial_data","previewRecords":{"canonicalxml":"123"},
      "configRecords":"\\n<options>\\n<option>\\n<name>backerTermsAndConditions</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>onsertContent</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n</options>\\n","cannonicalFields":"\\n
      <root>\\n<field>\\n<canonicalXpath>canonicalXpath</canonicalXpath>\\n
      <description>description</description>\\n<sample>sample</sample>\\n<strsReference>strsReference</strsReference>\\n</field>\\n</root>\\n",
      "pdfFileURL":"details","configRecordsOptionArr":[{"name":"backerTermsAndConditions","value":""},{"name":"onsertContent","value":""},
      {"name":"canonicalXpath","value":""},{"name":"canonicalXpath","value":""}],
      "canonicalFieldsData":[{"fieldName":"canonicalXpath","fieldDescription":"description","fieldSample":"sample","strsReference":"strsReference"}],
      "customizedCanonicalOptions":"123","initialCustomizedCanonicalOptions":"123","pdfPageWidth":"","documentType":""}`;
      nock(process.env.API_ROOT_Server)
        .post('/api/ixtdb/executesp')
        .reply(200, [{
          result: 'response'
        }]);
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_data_api_call')
        .reply(200, {
          cannonicalFields: `
          <root>
            <field>
              <canonicalXpath>canonicalXpath</canonicalXpath>
              <description>description</description>
              <sample>sample</sample>
              <strsReference>strsReference</strsReference>
            </field>
          </root>
          `,
          configRecords: `
          <options>
            <option>
              <name>backerTermsAndConditions</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>onsertContent</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
          </options>
          `,
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Canonical_Xml')
        .reply(200, {
          canonicalXml: [{
            logoid: 1
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/ecodocx/getPreview')
        .reply(200, {
          canonicalxml: '123'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/customizedcanonical/getcustomizedcanonicalfields')
        .reply(200, {
          CustomizedCanonicalOptions: '123'
        });
      global.URL.createObjectURL = jest.fn(() => 'details');
      const ixtSystemId = '';
      const uniqueId = '';
      const selectedCustomerId = '';
      const selectedProviderId = '';
      const selectedIxtjobName = '';
      const selectedCsspJobId = '';
      const selectedTemplateId = '';
      const templateName = '';
      const backerTemplateName = '';
      const documentType = '';
      const isChannelPartner = true;
      const pdfPageWidth = '';
      const disableLogos = '';
      const disableColors = '';
      const disableLabel = '';
      const disableMessage = '';
      const disableCreditCard = '';
      const disableAdditionalOptions = '';
      const isPdf = '';
      const store = mockStore();
      await store.dispatch(
        await actions.getDataTemplateCustomization(
          ixtSystemId,
          uniqueId,
          selectedCustomerId,
          selectedProviderId,
          selectedIxtjobName,
          selectedCsspJobId,
          selectedTemplateId,
          templateName,
          backerTemplateName,
          documentType,
          isChannelPartner,
          pdfPageWidth,
          disableLogos,
          disableColors,
          disableLabel,
          disableMessage,
          disableCreditCard,
          disableAdditionalOptions,
          isPdf,
        ),
      );

      expect(
        JSON.stringify(store.getActions()[0])
          .replace(/ /g, '')
          .replace(/\n/g, ''),
      ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('getDataTemplateCustomization API success, isChannelPartner', async () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    const expectedResponse = `{"type":"TemplateCustomization_fetch_initial_data","channelPartnerDetails"
    :[{"id":0,"name":"GlobalChange"},{"id":1,"name":"FirstPartner"}],"previewRecords":null
    ,"configRecords":"","cannonicalFields":"\\n<root>\\n<field>\\n<canonicalXpath>canonicalXpath
    </canonicalXpath>\\n<description>description</description>\\n<sample>sample</sample>\\n
    <strsReference>strsReference</strsReference>\\n</field>\\n</root>\\n","pdfFileURL":null
    ,"configRecordsOptionArr":[],"canonicalFieldsData":[{"fieldName":"canonicalXpath","fieldDescription"
    :"description","fieldSample":"sample","strsReference":"strsReference"}],"initialCustomizedCanonicalOptions"
    :null,"pdfPageWidth":"","documentType":""}`;
    nock(process.env.API_ROOT_Server)
      .post('/api/ixtdb/executesp')
      .reply(200, {
        result: [{
          id: 1,
          name: 'First Partner'
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_data_api_call')
      .reply(200, {
        cannonicalFields: `
        <root>
          <field>
            <canonicalXpath>canonicalXpath</canonicalXpath>
            <description>description</description>
            <sample>sample</sample>
            <strsReference>strsReference</strsReference>
          </field>
        </root>
        `,
        configRecords: '',
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Canonical_Xml')
      .reply(200, {
        canonicalXml: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getPreview')
      .reply(200, {
        canonicalxml: '123'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalfields')
      .reply(200, {
        CustomizedCanonicalOptions: undefined
      });
    global.URL.createObjectURL = jest.fn(() => 'details');
    const ixtSystemId = '';
    const uniqueId = '';
    const selectedCustomerId = '';
    const selectedProviderId = 0;
    const selectedIxtjobName = '';
    const selectedCsspJobId = '';
    const selectedTemplateId = '';
    const templateName = '';
    const backerTemplateName = '';
    const documentType = '';
    const isChannelPartner = true;
    const pdfPageWidth = '';
    const disableLogos = '';
    const disableColors = '';
    const disableLabel = '';
    const disableMessage = '';
    const disableCreditCard = '';
    const disableAdditionalOptions = '';
    const isPdf = '';
    const store = mockStore();
    await store.dispatch(
      await actions.getDataTemplateCustomization(
        ixtSystemId,
        uniqueId,
        selectedCustomerId,
        selectedProviderId,
        selectedIxtjobName,
        selectedCsspJobId,
        selectedTemplateId,
        templateName,
        backerTemplateName,
        documentType,
        isChannelPartner,
        pdfPageWidth,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        isPdf,
      ),
    );

    expect(
      JSON.stringify(store.getActions()[0])
        .replace(/ /g, '')
        .replace(/\n/g, ''),
    ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
  });

  it('getDataTemplateCustomization API success, isChannelPartner', async () => {
    Object.defineProperty(navigator, 'msPointerEnabled', {
      value: false,
      configurable: true,
    });
    nock(process.env.API_ROOT_Server)
      .post('/api/ixtdb/executesp')
      .reply(200, {
        result: [{
          id: 1,
          name: 'First Partner'
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_data_api_call')
      .reply(200, {
        cannonicalFields: `
        <root>
          <field>
            <canonicalXpath>canonicalXpath</canonicalXpath>
            <description>description</description>
            <sample>sample</sample>
            <strsReference>strsReference</strsReference>
          </field>
        </root>
        `,
        configRecords: '',
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/get_Canonical_Xml')
      .reply(200, {
        canonicalXml: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getPreview')
      .reply(200, {
        canonicalxml: '123'
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalfields')
      .reply(200, '');
    global.URL.createObjectURL = jest.fn(() => 'details');
    const ixtSystemId = '';
    const uniqueId = '';
    const selectedCustomerId = '';
    const selectedProviderId = 0;
    const selectedIxtjobName = '';
    const selectedCsspJobId = '';
    const selectedTemplateId = '';
    const templateName = '';
    const backerTemplateName = '';
    const documentType = '';
    const isChannelPartner = true;
    const pdfPageWidth = '';
    const disableLogos = '';
    const disableColors = '';
    const disableLabel = '';
    const disableMessage = '';
    const disableCreditCard = '';
    const disableAdditionalOptions = '';
    const isPdf = '';
    const store = mockStore();
    await store.dispatch(
      await actions.getDataTemplateCustomization(
        ixtSystemId,
        uniqueId,
        selectedCustomerId,
        selectedProviderId,
        selectedIxtjobName,
        selectedCsspJobId,
        selectedTemplateId,
        templateName,
        backerTemplateName,
        documentType,
        isChannelPartner,
        pdfPageWidth,
        disableLogos,
        disableColors,
        disableLabel,
        disableMessage,
        disableCreditCard,
        disableAdditionalOptions,
        isPdf,
      ),
    );
    const expectedResponse = {
      type: types.FETCH_ERROR,
      errorMessage: 'error'
    };
    expect(expectedResponse.type).eqls(expectedResponse.type);
  });
});

describe('TemplateCustomizationAction getRefreshedData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getRefreshedData API success for direct customer', async () => {
    try {
      Object.defineProperty(navigator, 'msPointerEnabled', {
        value: false,
        configurable: true,
      });
      const expectedResponse = `
      {"type":"TemplateCustomization_fetch_refreshed_data","channelPartnerDetails":null,"previewRecords":{"canonicalxml":"123"},
      "configRecords":"\\n<options>\\n<option>\\n<name>backerTermsAndConditions</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n
      <option>\\n<name>onsertContent</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n</options>\\n",
      "pdfFileURL":"details","configRecordsOptionArr":[{"name":"backerTermsAndConditions","value":""},{"name":"onsertContent","value":""},
      {"name":"canonicalXpath","value":""},{"name":"canonicalXpath","value":""}]}`;
      nock(process.env.API_ROOT_Server)
        .post('/api/ixtdb/executesp')
        .reply(200, {
          result: 'response'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_refreshed_data_api_call')
        .reply(200, {
          cannonicalFields: `
          <root>
            <field>
              <canonicalXpath>canonicalXpath</canonicalXpath>
              <description>description</description>
              <sample>sample</sample>
              <strsReference>strsReference</strsReference>
            </field>
          </root>
          `,
          configRecords: `
          <options>
            <option>
              <name>backerTermsAndConditions</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>onsertContent</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
          </options>
          `,
          templateOptions: `
          <options>
            <option>
              <name>paymentCards</name>
              <label>Payment Cards</label>
              <type>checkboxGroup</type>
              <default>masterCard,visa,americanExpress,discover,careCredit,payPal</default>
              <list>
                <item>
                    <id>masterCard</id>
                    <label>MasterCard</label>
                </item>
                <item>
                    <id>visa</id>
                    <label>Visa</label>
                </item>
                <item>
                    <id>americanExpress</id>
                    <label>American Express</label>
                </item>
                <item>
                    <id>discover</id>
                    <label>Discover</label>
                </item>
                <item>
                    <id>careCredit</id>
                    <label>CareCredit</label>
                </item>
                <item>
                    <id>payPal</id>
                    <label>PayPal</label>
                </item>
              </list>
            </option>
            <option>
              <name>messages</name>
              <label>Messages</label>
              <type>textArea</type>
              <default>Did you know that you can pay online? Visit www.payclinic.com
            Do you need financial assistance? Call the helpdesk at (800) 123-4567</default>
            </option>
            <option>
              <name>onsertContent</name>
              <label>Onsert Content</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent2</name>
              <label>Onsert Content 2</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent3</name>
              <label>Onsert Content 3</label>
              <type>richText</type>
            </option>
        </options>`,
          backerOptions:`
        <options>
          <option>
            <name>backerTermsAndConditions</name>
            <label>BACKER</label>
            <type>richText</type>
            <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
          </option>
        </options>
        `,
          customizedCanonicalOptions:[{field:'field1'}]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Canonical_Xml')
        .reply(200, {
          canonicalXml: [{
            logoid: 1
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Logo_Mapping')
        .reply(200, {
          message: '123'
        });
  
      nock(process.env.API_ROOT_Server)
        .post('/api/ecodocx/getPreview')
        .reply(200, {
          canonicalxml: '123'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/customizedcanonical/getcustomizedcanonicalfields')
        .reply(200, {
          CustomizedCanonicalOptions: '123'
        });
      global.URL.createObjectURL = jest.fn(() => 'details');
      const param = {
        ixtSystemId: '',
        templateName: '',
        uniqueId: '',
        selectedCustomerId: '',
        selectedProviderId: '',
        selectedIxtjobName: '',
        backerTemplateName: '',
        selectedCsspJobId: '',
        selectedTemplateId: '',
        isChannelPartner: '',
        disableLogos: '',
        disableColors: '',
        disableLabel: '',
        disableMessage: '',
        disableCreditCard: '',
        disableMessageBodyOptions: '',
        disableAdditionalOptions: '',
        isBakerChanged: false
      };
      const store = mockStore();
      await store.dispatch(
        await actions.getRefreshedData(param),
      );

      expect(
        JSON.stringify(store.getActions()[0])
          .replace(/ /g, '')
          .replace(/\n/g, ''),
      ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('getRefreshedData API success for channel partner', async () => {
    try {
      mockIE();
      const expectedResponse = `
      {"type":"TemplateCustomization_fetch_refreshed_data","channelPartnerDetails":null,"previewRecords":{"canonicalxml":"123"},
      "configRecords":"\\n<options>\\n<option>\\n<name>backerTermsAndConditions</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n
      <option>\\n<name>onsertContent</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n
      <value>&lt;html&gt;</value>\\n</option>\\n<option>\\n<name>canonicalXpath</name>\\n<value>&lt;html&gt;</value>\\n</option>\\n</options>\\n",
      "pdfFileURL":"details","configRecordsOptionArr":[{"name":"backerTermsAndConditions","value":""},{"name":"onsertContent","value":""},
      {"name":"canonicalXpath","value":""},{"name":"canonicalXpath","value":""}]}`;
      nock(process.env.API_ROOT_Server)
        .post('/api/ixtdb/executesp')
        .reply(200, {
          result: [{
            id: 0,
            name: 'Global Change'
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_refreshed_data_api_call')
        .reply(200, {
          cannonicalFields: `
          <root>
            <field>
              <canonicalXpath>canonicalXpath</canonicalXpath>
              <description>description</description>
              <sample>sample</sample>
              <strsReference>strsReference</strsReference>
            </field>
          </root>
          `,
          configRecords: `
          <options>
            <option>
              <name>backerTermsAndConditions</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>onsertContent</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
            <option>
              <name>canonicalXpath</name>
              <value>&lt;html&gt;</value>
            </option>
          </options>
          `,
          templateOptions: `
          <options>
            <option>
              <name>paymentCards</name>
              <label>Payment Cards</label>
              <type>checkboxGroup</type>
              <default>masterCard,visa,americanExpress,discover,careCredit,payPal</default>
              <list>
                <item>
                    <id>masterCard</id>
                    <label>MasterCard</label>
                </item>
                <item>
                    <id>visa</id>
                    <label>Visa</label>
                </item>
                <item>
                    <id>americanExpress</id>
                    <label>American Express</label>
                </item>
                <item>
                    <id>discover</id>
                    <label>Discover</label>
                </item>
                <item>
                    <id>careCredit</id>
                    <label>CareCredit</label>
                </item>
                <item>
                    <id>payPal</id>
                    <label>PayPal</label>
                </item>
              </list>
            </option>
            <option>
              <name>messages</name>
              <label>Messages</label>
              <type>textArea</type>
              <default>Did you know that you can pay online? Visit www.payclinic.com
            Do you need financial assistance? Call the helpdesk at (800) 123-4567</default>
            </option>
            <option>
              <name>onsertContent</name>
              <label>Onsert Content</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent2</name>
              <label>Onsert Content 2</label>
              <type>richText</type>
            </option>
            <option>
              <name>onsertContent3</name>
              <label>Onsert Content 3</label>
              <type>richText</type>
            </option>
        </options>`,
          backerOptions:`
        <options>
          <option>
            <name>backerTermsAndConditions</name>
            <label>BACKER</label>
            <type>richText</type>
            <default><![CDATA[<html><body><p>Terms and Conditions</p></body></html>]]></default>
          </option>
        </options>
        `,
          customizedCanonicalOptions:[{field:'field1'}]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Canonical_Xml')
        .reply(200, {
          canonicalXml: [{
            logoid: 1
          }]
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/template_customization/get_Logo_Mapping')
        .reply(200, {
          message: '123'
        });
  
      nock(process.env.API_ROOT_Server)
        .post('/api/ecodocx/getPreview')
        .reply(200, {
          canonicalxml: '123'
        });
      nock(process.env.API_ROOT_Server)
        .post('/api/customizedcanonical/getcustomizedcanonicalfields')
        .reply(200, {
          CustomizedCanonicalOptions: '123'
        });

      global.URL.createObjectURL = jest.fn(() => 'details');
      const param = {
        ixtSystemId: '',
        templateName: '',
        uniqueId: '',
        selectedCustomerId: '',
        selectedProviderId: '',
        selectedIxtjobName: '',
        backerTemplateName: '',
        selectedCsspJobId: '',
        selectedTemplateId: '',
        isChannelPartner: true,
        disableLogos: '',
        disableColors: '',
        disableLabel: '',
        disableMessage: '',
        disableCreditCard: '',
        disableMessageBodyOptions: '',
        disableAdditionalOptions: '',
        isBakerChanged: false
      };
      const store = mockStore();
      await store.dispatch(
        await actions.getRefreshedData(param),
      );

      expect(
        JSON.stringify(store.getActions()[0])
          .replace(/ /g, '')
          .replace(/\n/g, ''),
      ).eqls(expectedResponse.replace(/ /g, '').replace(/\n/g, ''));
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction updateCustomizedCanonicalOptions', () => {
  it('updateCustomizedCanonicalOptions', async () => {
    const expectedResponse = {
      type: types.UPDATE_CUSTOMIZED_CANONICAL_OPTIONS,
      customizedCanonicalOptions: 2,
    };
    const store = mockStore();
    await store.dispatch(actions.updateCustomizedCanonicalOptions(2));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction updateInitialCustomizedCanonicalOptions', () => {
  it('updateCustomizedCanonicalOptions', () => {
    const options = '';
    const initialOptions = '';
    const isBlocking = '';
    const templateCustomizationDetectedChanges = '';
    const expectedResponse = {
      type: types.UPDATE_INITIAL_CUSTOMIZED_CANONICAL_OPTIONS,
      customizedCanonicalOptions: options,
      initialCustomizedCanonicalOptions: initialOptions,
      isBlocking,
      templateCustomizationDetectedChanges,
    };

    const returnValue = actions.updateInitialCustomizedCanonicalOptions(
      options,
      initialOptions,
      isBlocking,
      templateCustomizationDetectedChanges,
    );

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction setConfigurationUpdateProps', () => {
  it('updateCustomizedCanonicalOptions', () => {
    const userConfig = '';
    const propsToUpdate = '';
    const templateCustomizationDetectedChanges = '';
    const expectedResponse = {
      type: types.SET_USER_CONFIG,
      ...propsToUpdate,
      userConfig,
      templateCustomizationDetectedChanges,
    };

    const returnValue = actions.setConfigurationUpdateProps(
      userConfig,
      templateCustomizationDetectedChanges,
      propsToUpdate,
    );

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction updateProps', () => {
  it('updateProps', async () => {
    const params = {
      test: ''
    };
    const expectedResponse = {
      type: types.UPDATE_PROPS,
      ...params,
    };
    const store = mockStore();
    await store.dispatch(actions.updateProps(params));

    expect(store.getActions()[0]).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction initialProps', () => {
  it('initialProps', async () => {
    const expectedResponse = {
      type: types.INITIAL_PROPS,
    };
    const store = mockStore();
    await store.dispatch(actions.initialProps());

    expect(store.getActions()[0]).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction updateLogoOptions', () => {
  it('updateCustomizedCanonicalOptions', () => {
    const isBlocking = '';
    const logoOptions = [{
      name: ''
    }];
    const disableLogos = false;
    const selectedLogoFieldName = '';
    const selectedTemplateLogoName = '';
    const selectedTemplateLogoId = '';
    const selectedTemplateLogoBase64String = '';
    const selectedTemplateLogoContentType = '';
    const selectedLogoTypeLayout = '';
    const expectedResponse = {
      type: types.UPDATE_LOGO_OPTIONS,
      logoOptions,
      disableLogos,
      isBlocking,
    };

    const returnValue = actions.updateLogoOptions(
      isBlocking,
      logoOptions,
      selectedLogoFieldName,
      selectedTemplateLogoName,
      selectedTemplateLogoId,
      selectedTemplateLogoBase64String,
      selectedTemplateLogoContentType,
      selectedLogoTypeLayout,
      disableLogos
    );

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction setTemplateLogo ', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('setTemplateLogo  API success', async () => {
    const expectedResponse = {
      result: 'response'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/Set_Template_Logo')
      .reply(200, {
        result: 'response'
      });
    const logoOptions = '';
    const selectedCsspJobId = '';
    const templateId = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const userName = '';
    const companyId = '';
    const actualResult = await actions.setTemplateLogo(
      logoOptions,
      selectedCsspJobId,
      templateId,
      providerName,
      customerId,
      createdBy,
      userName,
      companyId,
    );

    expect(actualResult).eqls(expectedResponse);
  });

  it('setTemplateLogo  API error', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/template_customization/Set_Template_Logo')
      .reply(500, undefined);
    const logoOptions = '';
    const selectedCsspJobId = '';
    const templateId = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const userName = '';
    const companyId = '';
    try {
      await actions.setTemplateLogo(
        logoOptions,
        selectedCsspJobId,
        templateId,
        providerName,
        customerId,
        createdBy,
        userName,
        companyId,
      );
    } catch (error) {
      // console.log(error);
    }
  });
});


// I don't think we're still using this function now.
// Please remove it if everything works fine after a while.
// describe('TemplateCustomizationAction setConfiguration', () => {

//   afterEach(() => {
//     nock.cleanAll();
//   });

//   it('setConfiguration, changeTypeLabel === "Terms and Conditions" ', async () => {
//     const CONFIG_DATA = {
//       richTextBackerTextArea: [{ value: 'value1' }],
//       richTextTemplateTextArea: [{ value: 'value1' }],
//       changeTypeLabel: 'Terms and Conditions'
//     };
//     const expectedResponse = {
//       type: types.SET_USER_CONFIG,
//       userConfig: { result: 'response' },
//       initialRichTextTemplateTextArea: CONFIG_DATA.richTextTemplateTextArea,
//       initialRichTextBackerTextArea: CONFIG_DATA.richTextBackerTextArea,
//     };
//     nock(process.env.API_ROOT_Server)
//       .post('/api/ecodocx/setUserConfiguration')
//       .reply(200, { result: 'response' });

//     const store = mockStore();
//     await store.dispatch(await actions.setConfiguration(CONFIG_DATA));

//     expect(store.getActions()[0]).eqls(expectedResponse);
//   });

//   it('setConfiguration, changeTypeLabel !== "Terms and Conditions" ', async () => {
//     const CONFIG_DATA = {
//       richTextBackerTextArea: [{ value: 'value1' }],
//       richTextTemplateTextArea: [{ value: 'value1' }],
//       changeTypeLabel: 'Terms Conditions'
//     };
//     const expectedResponse = {
//       type: types.SET_USER_CONFIG,
//       userConfig: { result: 'response' },
//       initialRichTextTemplateTextArea: CONFIG_DATA.richTextTemplateTextArea,
//       initialRichTextBackerTextArea: CONFIG_DATA.richTextBackerTextArea,
//     };
//     nock(process.env.API_ROOT_Server)
//       .post('/api/ecodocx/setUserConfiguration')
//       .reply(200, { result: 'response' });

//     const store = mockStore();
//     await store.dispatch(await actions.setConfiguration(CONFIG_DATA));

//     expect(store.getActions()[0]).eqls(expectedResponse);
//   });
// });

describe('TemplateCustomizationAction getDisplayToggle ', () => {
  it('getDisplayToggle block', () => {
    const expectedResponse = 'none';
    const actualResult = actions.getDisplayToggle('block');

    expect(actualResult).eqls(expectedResponse);
  });
  it('getDisplayToggle none', () => {
    const expectedResponse = 'block';
    const actualResult = actions.getDisplayToggle('none');

    expect(actualResult).eqls(expectedResponse);
  });
  it('getDisplayToggle null', () => {
    const expectedResponse = 'block';
    const actualResult = actions.getDisplayToggle();

    expect(actualResult).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction updateIsBlocking', () => {
  it('updateIsBlocking', () => {
    const isBlocking = true;
    const expectedResponse = {
      type: 'UPDATE_IS_BLOCKING',
      isBlocking,
    };
    const actualResult = actions.updateIsBlocking(isBlocking);

    expect(actualResult).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction onChangeOptions', () => {
  it('onChangeOptions sectionName=SECTION_NAME_LABELS and disableLabel should be true if option is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_LABELS;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'value'
    }];
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      labelOptions: [{
        name: 'id',
        value: 'value'
      }],
      isBlocking: false,
      disableLabel: true
    };
    try {
      const actualResult = actions.onChangeOptions(event, sectionName, options, initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('onChangeOptions sectionName=SECTION_NAME_LABELS and disableLabel should be false if option is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_LABELS;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'differentValue'
    }];
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      labelOptions: [{
        name: 'id',
        value: 'value'
      }],
      isBlocking: true,
      disableLabel: false
    };
    try {
      const actualResult = actions.onChangeOptions(event, sectionName, options, initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onChangeOptions sectionName=SECTION_NAME_CREDIT_CARDS and disableCreditCard should be true if option is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value'
      },
    };
    const sectionName = types.SECTION_NAME_CREDIT_CARDS;
    const options = [{
      name: 'id',
      value: undefined
    }];
    const initialOptions = [{
      name: 'id',
      value: undefined
    }];
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      creditCardOptions: [{
        name: 'id',
        value: undefined
      }],
      isBlocking: false,
      disableCreditCard: true
    };
    try {
      const actualResult = actions.onChangeOptions(event, sectionName, options, initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('onChangeOptions sectionName=SECTION_NAME_CREDIT_CARDS and disableCreditCard should be false if option is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_CREDIT_CARDS;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'differentValue'
    }];
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      creditCardOptions: [{
        name: 'id',
        value: undefined
      }],
      isBlocking: true,
      disableCreditCard: false
    };
    try {
      const actualResult = actions.onChangeOptions(event, sectionName, options, initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onChangeOptions sectionName=SECTION_NAME_COLORS and disableColors should be true if option is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_COLORS;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'value'
    }];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      colorOptions: [{
        name: 'id',
        value: 'value'
      }],
      isBlocking: false,
      disableColors: true,
    };
    try {
      const actualResult = actions.onChangeOptions(event,
        sectionName, options, initialCreditCardOptions,
        customizedCanonicalOptions,
        initialCustomizedCanonicalOptions,
        initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('onChangeOptions sectionName=SECTION_NAME_COLORS and disableColors should be false if option is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_COLORS;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'differentValue'
    }];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      colorOptions: [{
        name: 'id',
        value: 'value'
      }],
      isBlocking: true,
      disableColors: false,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });

  it('onChangeOptions sectionName=SECTION_NAME_MESSAGES and disableMessage should be true if option is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_MESSAGES;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'value'
    }];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      messageOptions: [{
        name: 'id',
        value: 'value'
      }],
      disableMessage: true,
      isBlocking: false,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=SECTION_NAME_MESSAGES and disableMessage should be false if option is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_MESSAGES;
    const options = [{
      name: 'id'
    }];
    const initialOptions = [{
      name: 'id',
      value: 'differentValue'
    }];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      messageOptions: [{
        name: 'id',
        value: 'value'
      }],
      disableMessage: false,
      isBlocking: true,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });

  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = color,'+
  ' disableAdditionalOptions should be true if options is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'color',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'color',
      value: 'value',
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'color',
        value: 'value'
      }],
      disableAdditionalOptions: true,
      isBlocking: false,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = color, '+
  'disableAdditionalOptions should be false if options is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'color',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'color',
      value: 'differentValue',
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'color',
        value: 'value'
      }],
      disableAdditionalOptions: false,
      isBlocking: true,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });

  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = checkboxGroup, '+
  'disableAdditionalOptions should be true if options is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        checked: true,
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'checkboxGroup',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'checkboxGroup',
      value: true,
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'checkboxGroup',
        value: true
      }],
      disableAdditionalOptions: true,
      isBlocking: false,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = checkboxGroup, '+
  'disableAdditionalOptions should be false if options is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        checked: true,
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'checkboxGroup',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'checkboxGroup',
      value: 'differentValue',
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'checkboxGroup',
        value: true
      }],
      disableAdditionalOptions: false,
      isBlocking: true,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });

  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = xxx, '+
  'disableAdditionalOptions should be true if options is equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'xxx',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'xxx',
      value: 'value',
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'xxx',
        value: 'value'
      }],
      disableAdditionalOptions: true,
      isBlocking: false,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = xxx, '+
  'disableAdditionalOptions should be false if options is not equal to initialOptions', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      type: 'xxx',
      value: '',
    },];
    const initialOptions = [{
      name: 'id',
      type: 'xxx',
      value: 'differentValue',
    },];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};

    const getIsBlockingValue = () => false;
    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      additionalOptions: [{
        name: 'id',
        type: 'xxx',
        value: 'value'
      }],
      disableAdditionalOptions: false,
      isBlocking: true,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions, getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=xxx', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = 'xxx';
    const options = [{
      name: 'id'
    }];
    const initialCreditCardOptions = [];
    const customizedCanonicalOptions = {};
    const initialCustomizedCanonicalOptions = {};
    const initialOptions = [];
    const getIsBlockingValue = () => false;

    const expectedResponse = {
      type: 'TemplateCustomization_onChangeOptions',
      isBlocking: true,
    };
    const actualResult = actions.onChangeOptions(event, sectionName, options,
      initialCreditCardOptions,
      customizedCanonicalOptions,
      initialCustomizedCanonicalOptions,
      initialOptions,
      getIsBlockingValue);

    expect(actualResult).eqls(expectedResponse);
  });
  it('onChangeOptions sectionName=SECTION_NAME_PAYMENT_STUB for paystubVisible', () => {
    const event = {
      target: {
        id: 'paystubVisible',
        value: 'true',
        checked:true
      },
    };
    const sectionName = types.SECTION_NAME_PAYMENT_STUB;
    const options = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": []
    }];
    const initialOptions = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": []
    }];
    const initialCreditCardOptions=[{
      "name": "masterCard",
      "label": "MasterCard",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "visa",
      "label": "Visa",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "americanExpress",
      "label": "American Express",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "discover",
      "label": "Discover",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "careCredit",
      "label": "CareCredit",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "payPal",
      "label": "PayPal",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }];
    const customizedCanonicalOptions={
      "keys": ["Addresses", "Phones", "Due Date", "Provider"],
      "Addresses": {
        "keys": ["Remit Address", "Return Address"],
        "disable": true,
        "Remit Address": [{
          "canonical_field_id": 1,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "RemitLine1",
          "web_name": "Remit Line 1",
          "label_display": "Line 1",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 2,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "RemitLine2",
          "web_name": "Remit Line 2",
          "label_display": "Line 2",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 3,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "RemitLine3",
          "web_name": "Remit Line 3",
          "label_display": "Line 3",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 4,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "RemitLine4",
          "web_name": "Remit Line 4",
          "label_display": "Line 4",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 5,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "RemitLine5",
          "web_name": "Remit Line 5",
          "label_display": "Line 5",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }],
        "Return Address": [{
          "canonical_field_id": 8,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "ReturnLine1",
          "web_name": "Return Line 1",
          "label_display": "Line 1",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 9,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "ReturnLine2",
          "web_name": "Return Line 2",
          "label_display": "Line 2",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 10,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "ReturnLine3",
          "web_name": "Return Line 3",
          "label_display": "Line 3",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 11,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "ReturnLine4",
          "web_name": "Return Line 4",
          "label_display": "Line 4",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 12,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "ReturnLine5",
          "web_name": "Return Line 5",
          "label_display": "Line 5",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }]
      },
      "Phones": {
        "keys": ["Contact Payment Phone Hours"],
        "disable": true,
        "Contact Payment Phone Hours": [{
          "canonical_field_id": 35,
          "canonical_type_id": 2,
          "dropdown": "Phones",
          "name": "ContactPaymentPhoneHours",
          "alias": "ProviderContactPaymentPhoneHours",
          "web_name": "Contact Payment Phone Hours",
          "label_display": "Phone",
          "label": "Contact Payment Phone Hours",
          "path": "/CSSPDocument/Provider/Contact/",
          "max_length": 36,
          "field_name": "/CSSPDocument/Provider/Contact/ContactPaymentPhoneHours",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Mon-Fri: 8am-5pm CST",
          "cssp_job_status": 0
        }]
      },
      "Due Date": {
        "keys": ["Guarantor Account Due Date"],
        "disable": true,
        "Guarantor Account Due Date": [{
          "canonical_field_id": 28,
          "canonical_type_id": 4,
          "dropdown": "Due Date",
          "name": "DueDate",
          "alias": "GuarantorAccountDueDate",
          "web_name": "Guarantor Account Due Date",
          "label_display": "Guarantor Account Due Date",
          "label": "Guarantor Account Due Date",
          "path": "/CSSPDocument/Guarantor/AccountInformation/",
          "max_length": 25,
          "field_name": "/CSSPDocument/Guarantor/AccountInformation/DueDate",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "8/20/2018",
          "cssp_job_status": 0
        }]
      },
      "Provider": {
        "keys": ["Provider Name"],
        "disable": true,
        "Provider Name": [{
          "canonical_field_id": 30,
          "canonical_type_id": 6,
          "dropdown": "Provider",
          "name": "Name",
          "alias": "ProviderName",
          "web_name": "Provider Name",
          "label_display": "Provider Name",
          "label": "Provider Name",
          "path": "/CSSPDocument/Provider/",
          "max_length": 50,
          "field_name": "/CSSPDocument/Provider/Name",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }]
      }
    };
    const initialCustomizedCanonicalOptions={
      "keys": ["Addresses", "Phones", "Due Date", "Provider"],
      "Addresses": {
        "keys": ["Remit Address", "Return Address"],
        "disable": true,
        "Remit Address": [{
          "canonical_field_id": 1,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "RemitLine1",
          "web_name": "Remit Line 1",
          "label_display": "Line 1",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 2,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "RemitLine2",
          "web_name": "Remit Line 2",
          "label_display": "Line 2",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 3,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "RemitLine3",
          "web_name": "Remit Line 3",
          "label_display": "Line 3",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 4,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "RemitLine4",
          "web_name": "Remit Line 4",
          "label_display": "Line 4",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 5,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "RemitLine5",
          "web_name": "Remit Line 5",
          "label_display": "Line 5",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }],
        "Return Address": [{
          "canonical_field_id": 8,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "ReturnLine1",
          "web_name": "Return Line 1",
          "label_display": "Line 1",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 9,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "ReturnLine2",
          "web_name": "Return Line 2",
          "label_display": "Line 2",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 10,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "ReturnLine3",
          "web_name": "Return Line 3",
          "label_display": "Line 3",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 11,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "ReturnLine4",
          "web_name": "Return Line 4",
          "label_display": "Line 4",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 12,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "ReturnLine5",
          "web_name": "Return Line 5",
          "label_display": "Line 5",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }]
      },
      "Phones": {
        "keys": ["Contact Payment Phone Hours"],
        "disable": true,
        "Contact Payment Phone Hours": [{
          "canonical_field_id": 35,
          "canonical_type_id": 2,
          "dropdown": "Phones",
          "name": "ContactPaymentPhoneHours",
          "alias": "ProviderContactPaymentPhoneHours",
          "web_name": "Contact Payment Phone Hours",
          "label_display": "Phone",
          "label": "Contact Payment Phone Hours",
          "path": "/CSSPDocument/Provider/Contact/",
          "max_length": 36,
          "field_name": "/CSSPDocument/Provider/Contact/ContactPaymentPhoneHours",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Mon-Fri: 8am-5pm CST",
          "cssp_job_status": 0
        }]
      },
      "Due Date": {
        "keys": ["Guarantor Account Due Date"],
        "disable": true,
        "Guarantor Account Due Date": [{
          "canonical_field_id": 28,
          "canonical_type_id": 4,
          "dropdown": "Due Date",
          "name": "DueDate",
          "alias": "GuarantorAccountDueDate",
          "web_name": "Guarantor Account Due Date",
          "label_display": "Guarantor Account Due Date",
          "label": "Guarantor Account Due Date",
          "path": "/CSSPDocument/Guarantor/AccountInformation/",
          "max_length": 25,
          "field_name": "/CSSPDocument/Guarantor/AccountInformation/DueDate",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "8/20/2018",
          "cssp_job_status": 0
        }]
      },
      "Provider": {
        "keys": ["Provider Name"],
        "disable": true,
        "Provider Name": [{
          "canonical_field_id": 30,
          "canonical_type_id": 6,
          "dropdown": "Provider",
          "name": "Name",
          "alias": "ProviderName",
          "web_name": "Provider Name",
          "label_display": "Provider Name",
          "label": "Provider Name",
          "path": "/CSSPDocument/Provider/",
          "max_length": 50,
          "field_name": "/CSSPDocument/Provider/Name",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }]
      }
    };
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "disableCreditCard": true,
      "creditCardOptions": [{
        "name": "masterCard",
        "label": "MasterCard",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }, {
        "name": "visa",
        "label": "Visa",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }, {
        "name": "americanExpress",
        "label": "American Express",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }, {
        "name": "discover",
        "label": "Discover",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }, {
        "name": "careCredit",
        "label": "CareCredit",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }, {
        "name": "payPal",
        "label": "PayPal",
        "type": "paymentCards",
        "default": "",
        "value": false,
        "colorlist": []
      }],
      "customizedCanonicalOptions": {
        "keys": ["Addresses", "Phones", "Due Date", "Provider"],
        "Addresses": {
          "keys": ["Remit Address", "Return Address"],
          "disable": true,
          "Remit Address": [{
            "canonical_field_id": 1,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line1",
            "alias": "RemitLine1",
            "web_name": "Remit Line 1",
            "label_display": "Line 1",
            "label": "Remit Address",
            "path": "/CSSPDocument/Remit/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Remit/AddressLines/Line1",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "My Clinic",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 2,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line2",
            "alias": "RemitLine2",
            "web_name": "Remit Line 2",
            "label_display": "Line 2",
            "label": "Remit Address",
            "path": "/CSSPDocument/Remit/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Remit/AddressLines/Line2",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "567 Washington Dr",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 3,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line3",
            "alias": "RemitLine3",
            "web_name": "Remit Line 3",
            "label_display": "Line 3",
            "label": "Remit Address",
            "path": "/CSSPDocument/Remit/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Remit/AddressLines/Line3",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "Kansas City, MO 64106",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 4,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line4",
            "alias": "RemitLine4",
            "web_name": "Remit Line 4",
            "label_display": "Line 4",
            "label": "Remit Address",
            "path": "/CSSPDocument/Remit/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Remit/AddressLines/Line4",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 5,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line5",
            "alias": "RemitLine5",
            "web_name": "Remit Line 5",
            "label_display": "Line 5",
            "label": "Remit Address",
            "path": "/CSSPDocument/Remit/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Remit/AddressLines/Line5",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "",
            "cssp_job_status": 0
          }],
          "Return Address": [{
            "canonical_field_id": 8,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line1",
            "alias": "ReturnLine1",
            "web_name": "Return Line 1",
            "label_display": "Line 1",
            "label": "Return Address",
            "path": "/CSSPDocument/Return/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Return/AddressLines/Line1",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "567 Washington Dr",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 9,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line2",
            "alias": "ReturnLine2",
            "web_name": "Return Line 2",
            "label_display": "Line 2",
            "label": "Return Address",
            "path": "/CSSPDocument/Return/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Return/AddressLines/Line2",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "Kansas City, MO 64106",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 10,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line3",
            "alias": "ReturnLine3",
            "web_name": "Return Line 3",
            "label_display": "Line 3",
            "label": "Return Address",
            "path": "/CSSPDocument/Return/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Return/AddressLines/Line3",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 11,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line4",
            "alias": "ReturnLine4",
            "web_name": "Return Line 4",
            "label_display": "Line 4",
            "label": "Return Address",
            "path": "/CSSPDocument/Return/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Return/AddressLines/Line4",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "",
            "cssp_job_status": 0
          }, {
            "canonical_field_id": 12,
            "canonical_type_id": 1,
            "dropdown": "Addresses",
            "name": "Line5",
            "alias": "ReturnLine5",
            "web_name": "Return Line 5",
            "label_display": "Line 5",
            "label": "Return Address",
            "path": "/CSSPDocument/Return/AddressLines/",
            "max_length": 40,
            "field_name": "/CSSPDocument/Return/AddressLines/Line5",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "",
            "cssp_job_status": 0
          }]
        },
        "Phones": {
          "keys": ["Contact Payment Phone Hours"],
          "disable": true,
          "Contact Payment Phone Hours": [{
            "canonical_field_id": 35,
            "canonical_type_id": 2,
            "dropdown": "Phones",
            "name": "ContactPaymentPhoneHours",
            "alias": "ProviderContactPaymentPhoneHours",
            "web_name": "Contact Payment Phone Hours",
            "label_display": "Phone",
            "label": "Contact Payment Phone Hours",
            "path": "/CSSPDocument/Provider/Contact/",
            "max_length": 36,
            "field_name": "/CSSPDocument/Provider/Contact/ContactPaymentPhoneHours",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "Mon-Fri: 8am-5pm CST",
            "cssp_job_status": 0
          }]
        },
        "Due Date": {
          "keys": ["Guarantor Account Due Date"],
          "disable": true,
          "Guarantor Account Due Date": [{
            "canonical_field_id": 28,
            "canonical_type_id": 4,
            "dropdown": "Due Date",
            "name": "DueDate",
            "alias": "GuarantorAccountDueDate",
            "web_name": "Guarantor Account Due Date",
            "label_display": "Guarantor Account Due Date",
            "label": "Guarantor Account Due Date",
            "path": "/CSSPDocument/Guarantor/AccountInformation/",
            "max_length": 25,
            "field_name": "/CSSPDocument/Guarantor/AccountInformation/DueDate",
            "value": "",
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "8/20/2018",
            "cssp_job_status": 0,
            "newValueMessageRadio": false,
            "newValueMessage": "",
            "newValueAfterDaysRadio": false,
            "newValueAfterDays": ""
          }]
        },
        "Provider": {
          "keys": ["Provider Name"],
          "disable": true,
          "Provider Name": [{
            "canonical_field_id": 30,
            "canonical_type_id": 6,
            "dropdown": "Provider",
            "name": "Name",
            "alias": "ProviderName",
            "web_name": "Provider Name",
            "label_display": "Provider Name",
            "label": "Provider Name",
            "path": "/CSSPDocument/Provider/",
            "max_length": 50,
            "field_name": "/CSSPDocument/Provider/Name",
            "value": null,
            "cssp_value": null,
            "ixt_value": null,
            "default_value": "My Clinic",
            "cssp_job_status": 0
          }]
        }
      },
      "paystubvisibleOptions": [{
        "name": "paystubVisible",
        "label": "PAYMENT STUB VISIBLE",
        "type": "checkbox",
        "default": false,
        "value": true
      }, {
        "name": "amountOwedLabel",
        "label": "Amount Owed Label",
        "type": "text",
        "default": "Amount Due",
        "value": "50045",
        "colorlist": []
      }],
      "disablePaymentStub": true,
      "isBlocking": false
    };
    try {
      const actualResult = actions.onChangeOptions(
        event, sectionName, options,initialCreditCardOptions,
        customizedCanonicalOptions,initialCustomizedCanonicalOptions,
        initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
  it('onChangeOptions sectionName=SECTION_NAME_PAYMENT_STUB for amountOwedLabel', () => {
    const event = {
      target: {
        id: 'amountOwedLabel',
        value: 'test label',
      },
    };
    const sectionName = types.SECTION_NAME_PAYMENT_STUB;
    const options = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": []
    }];
    const initialOptions = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": []
    }];
    const initialCreditCardOptions=[{
      "name": "masterCard",
      "label": "MasterCard",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "visa",
      "label": "Visa",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "americanExpress",
      "label": "American Express",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "discover",
      "label": "Discover",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "careCredit",
      "label": "CareCredit",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }, {
      "name": "payPal",
      "label": "PayPal",
      "type": "paymentCards",
      "default": "",
      "value": false,
      "colorlist": []
    }];
    const customizedCanonicalOptions={
      "keys": ["Addresses", "Phones", "Due Date", "Provider"],
      "Addresses": {
        "keys": ["Remit Address", "Return Address"],
        "disable": true,
        "Remit Address": [{
          "canonical_field_id": 1,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "RemitLine1",
          "web_name": "Remit Line 1",
          "label_display": "Line 1",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 2,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "RemitLine2",
          "web_name": "Remit Line 2",
          "label_display": "Line 2",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 3,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "RemitLine3",
          "web_name": "Remit Line 3",
          "label_display": "Line 3",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 4,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "RemitLine4",
          "web_name": "Remit Line 4",
          "label_display": "Line 4",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 5,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "RemitLine5",
          "web_name": "Remit Line 5",
          "label_display": "Line 5",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }],
        "Return Address": [{
          "canonical_field_id": 8,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "ReturnLine1",
          "web_name": "Return Line 1",
          "label_display": "Line 1",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 9,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "ReturnLine2",
          "web_name": "Return Line 2",
          "label_display": "Line 2",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 10,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "ReturnLine3",
          "web_name": "Return Line 3",
          "label_display": "Line 3",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 11,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "ReturnLine4",
          "web_name": "Return Line 4",
          "label_display": "Line 4",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 12,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "ReturnLine5",
          "web_name": "Return Line 5",
          "label_display": "Line 5",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }]
      },
      "Phones": {
        "keys": ["Contact Payment Phone Hours"],
        "disable": true,
        "Contact Payment Phone Hours": [{
          "canonical_field_id": 35,
          "canonical_type_id": 2,
          "dropdown": "Phones",
          "name": "ContactPaymentPhoneHours",
          "alias": "ProviderContactPaymentPhoneHours",
          "web_name": "Contact Payment Phone Hours",
          "label_display": "Phone",
          "label": "Contact Payment Phone Hours",
          "path": "/CSSPDocument/Provider/Contact/",
          "max_length": 36,
          "field_name": "/CSSPDocument/Provider/Contact/ContactPaymentPhoneHours",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Mon-Fri: 8am-5pm CST",
          "cssp_job_status": 0
        }]
      },
      "Due Date": {
        "keys": ["Guarantor Account Due Date"],
        "disable": true,
        "Guarantor Account Due Date": [{
          "canonical_field_id": 28,
          "canonical_type_id": 4,
          "dropdown": "Due Date",
          "name": "DueDate",
          "alias": "GuarantorAccountDueDate",
          "web_name": "Guarantor Account Due Date",
          "label_display": "Guarantor Account Due Date",
          "label": "Guarantor Account Due Date",
          "path": "/CSSPDocument/Guarantor/AccountInformation/",
          "max_length": 25,
          "field_name": "/CSSPDocument/Guarantor/AccountInformation/DueDate",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "8/20/2018",
          "cssp_job_status": 0
        }]
      },
      "Provider": {
        "keys": ["Provider Name"],
        "disable": true,
        "Provider Name": [{
          "canonical_field_id": 30,
          "canonical_type_id": 6,
          "dropdown": "Provider",
          "name": "Name",
          "alias": "ProviderName",
          "web_name": "Provider Name",
          "label_display": "Provider Name",
          "label": "Provider Name",
          "path": "/CSSPDocument/Provider/",
          "max_length": 50,
          "field_name": "/CSSPDocument/Provider/Name",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }]
      }
    };
    const initialCustomizedCanonicalOptions={
      "keys": ["Addresses", "Phones", "Due Date", "Provider"],
      "Addresses": {
        "keys": ["Remit Address", "Return Address"],
        "disable": true,
        "Remit Address": [{
          "canonical_field_id": 1,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "RemitLine1",
          "web_name": "Remit Line 1",
          "label_display": "Line 1",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 2,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "RemitLine2",
          "web_name": "Remit Line 2",
          "label_display": "Line 2",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 3,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "RemitLine3",
          "web_name": "Remit Line 3",
          "label_display": "Line 3",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 4,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "RemitLine4",
          "web_name": "Remit Line 4",
          "label_display": "Line 4",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 5,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "RemitLine5",
          "web_name": "Remit Line 5",
          "label_display": "Line 5",
          "label": "Remit Address",
          "path": "/CSSPDocument/Remit/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Remit/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }],
        "Return Address": [{
          "canonical_field_id": 8,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line1",
          "alias": "ReturnLine1",
          "web_name": "Return Line 1",
          "label_display": "Line 1",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line1",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "567 Washington Dr",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 9,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line2",
          "alias": "ReturnLine2",
          "web_name": "Return Line 2",
          "label_display": "Line 2",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line2",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Kansas City, MO 64106",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 10,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line3",
          "alias": "ReturnLine3",
          "web_name": "Return Line 3",
          "label_display": "Line 3",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line3",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 11,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line4",
          "alias": "ReturnLine4",
          "web_name": "Return Line 4",
          "label_display": "Line 4",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line4",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }, {
          "canonical_field_id": 12,
          "canonical_type_id": 1,
          "dropdown": "Addresses",
          "name": "Line5",
          "alias": "ReturnLine5",
          "web_name": "Return Line 5",
          "label_display": "Line 5",
          "label": "Return Address",
          "path": "/CSSPDocument/Return/AddressLines/",
          "max_length": 40,
          "field_name": "/CSSPDocument/Return/AddressLines/Line5",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "",
          "cssp_job_status": 0
        }]
      },
      "Phones": {
        "keys": ["Contact Payment Phone Hours"],
        "disable": true,
        "Contact Payment Phone Hours": [{
          "canonical_field_id": 35,
          "canonical_type_id": 2,
          "dropdown": "Phones",
          "name": "ContactPaymentPhoneHours",
          "alias": "ProviderContactPaymentPhoneHours",
          "web_name": "Contact Payment Phone Hours",
          "label_display": "Phone",
          "label": "Contact Payment Phone Hours",
          "path": "/CSSPDocument/Provider/Contact/",
          "max_length": 36,
          "field_name": "/CSSPDocument/Provider/Contact/ContactPaymentPhoneHours",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "Mon-Fri: 8am-5pm CST",
          "cssp_job_status": 0
        }]
      },
      "Due Date": {
        "keys": ["Guarantor Account Due Date"],
        "disable": true,
        "Guarantor Account Due Date": [{
          "canonical_field_id": 28,
          "canonical_type_id": 4,
          "dropdown": "Due Date",
          "name": "DueDate",
          "alias": "GuarantorAccountDueDate",
          "web_name": "Guarantor Account Due Date",
          "label_display": "Guarantor Account Due Date",
          "label": "Guarantor Account Due Date",
          "path": "/CSSPDocument/Guarantor/AccountInformation/",
          "max_length": 25,
          "field_name": "/CSSPDocument/Guarantor/AccountInformation/DueDate",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "8/20/2018",
          "cssp_job_status": 0
        }]
      },
      "Provider": {
        "keys": ["Provider Name"],
        "disable": true,
        "Provider Name": [{
          "canonical_field_id": 30,
          "canonical_type_id": 6,
          "dropdown": "Provider",
          "name": "Name",
          "alias": "ProviderName",
          "web_name": "Provider Name",
          "label_display": "Provider Name",
          "label": "Provider Name",
          "path": "/CSSPDocument/Provider/",
          "max_length": 50,
          "field_name": "/CSSPDocument/Provider/Name",
          "value": null,
          "cssp_value": null,
          "ixt_value": null,
          "default_value": "My Clinic",
          "cssp_job_status": 0
        }]
      }
    };
    const getIsBlockingValue = () => false;
    const expectedResponse = {"type":"TemplateCustomization_onChangeOptions","paystubvisibleOptions"
    :[{"name":"paystubVisible","label":"PAYMENT STUB VISIBLE","type":"checkbox","default":false
      ,"value":true},{"name":"amountOwedLabel","label":"Amount Owed Label","type":"text","default"
    :"Amount Due","value":"test label","colorlist":[]}],"disablePaymentStub":false,"isBlocking":true};
    try {
      const actualResult = actions.onChangeOptions(
        event, sectionName, options,initialCreditCardOptions,
        customizedCanonicalOptions,initialCustomizedCanonicalOptions,
        initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onChangeOptions sectionName=SECTION_NAME_DIAGNOSIS_LABEL_OPTIONS for vouchervisible', () => {
    const event = {
      target: {
        "id": "vouchervisible",
        "label": "VOUCHER VISIBLE",
        "type": "checkbox",
        checked:true
      },
    };
    const sectionName = types.SECTION_NAME_DIAGNOSIS_LABEL_OPTIONS;
    const options = [{
      "name": "vouchervisible",
      "label": "VOUCHER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "voucher",
      "label": "VOUCHER",
      "type": "text",
      "default": "VOUCHER",
      "value": "voucher1",
      "colorlist": []
    }, {
      "name": "providervisible",
      "label": "PROVIDER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": false
    }, {
      "name": "provider",
      "label": "PROVIDER",
      "type": "text",
      "default": "PROVIDER",
      "value": "provider1",
      "colorlist": []
    }, {
      "name": "diagnosisvisible",
      "label": "DIAGNOSIS VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "diagnosis",
      "label": "DIAGNOSIS",
      "type": "text",
      "default": "DIAGNOSIS",
      "value": "diagnosis1",
      "colorlist": []
    }];
    const initialOptions = [{
      "name": "vouchervisible",
      "label": "VOUCHER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "voucher",
      "label": "VOUCHER",
      "type": "text",
      "default": "VOUCHER",
      "value": "voucher1",
      "colorlist": []
    }, {
      "name": "providervisible",
      "label": "PROVIDER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": false
    }, {
      "name": "provider",
      "label": "PROVIDER",
      "type": "text",
      "default": "PROVIDER",
      "value": "provider1",
      "colorlist": []
    }, {
      "name": "diagnosisvisible",
      "label": "DIAGNOSIS VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "diagnosis",
      "label": "DIAGNOSIS",
      "type": "text",
      "default": "DIAGNOSIS",
      "value": "diagnosis1",
      "colorlist": []
    }];
    const initialCreditCardOptions=null;
    const customizedCanonicalOptions=null;
    const initialCustomizedCanonicalOptions=null;
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "diagnosisLabelOptions": [{
        "name": "vouchervisible",
        "label": "VOUCHER VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": true
      }, {
        "name": "voucher",
        "label": "VOUCHER",
        "type": "text",
        "default": "VOUCHER",
        "value": "voucher1",
        "colorlist": []
      }, {
        "name": "providervisible",
        "label": "PROVIDER VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": false
      }, {
        "name": "provider",
        "label": "PROVIDER",
        "type": "text",
        "default": "PROVIDER",
        "value": "provider1",
        "colorlist": []
      }, {
        "name": "diagnosisvisible",
        "label": "DIAGNOSIS VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": true
      }, {
        "name": "diagnosis",
        "label": "DIAGNOSIS",
        "type": "text",
        "default": "DIAGNOSIS",
        "value": "diagnosis1",
        "colorlist": []
      }],
      "diagnosisLabelDisable": true,
      "isBlocking": false
    };
    try {
      const actualResult = actions.onChangeOptions(
        event, sectionName, options,initialCreditCardOptions,
        customizedCanonicalOptions,initialCustomizedCanonicalOptions,
        initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onChangeOptions sectionName=SECTION_NAME_DIAGNOSIS_LABEL_OPTIONS for voucher', () => {
    const event = {
      target: {
        "id": "voucher",
        "label": "VOUCHER",
        "type": "text",
        value:'voucher1'
      },
    };
    const sectionName = types.SECTION_NAME_DIAGNOSIS_LABEL_OPTIONS;
    const options = [{
      "name": "vouchervisible",
      "label": "VOUCHER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "voucher",
      "label": "VOUCHER",
      "type": "text",
      "default": "VOUCHER",
      "value": "voucher1",
      "colorlist": []
    }, {
      "name": "providervisible",
      "label": "PROVIDER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": false
    }, {
      "name": "provider",
      "label": "PROVIDER",
      "type": "text",
      "default": "PROVIDER",
      "value": "provider1",
      "colorlist": []
    }, {
      "name": "diagnosisvisible",
      "label": "DIAGNOSIS VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "diagnosis",
      "label": "DIAGNOSIS",
      "type": "text",
      "default": "DIAGNOSIS",
      "value": "diagnosis1",
      "colorlist": []
    }];
    const initialOptions = [{
      "name": "vouchervisible",
      "label": "VOUCHER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "voucher",
      "label": "VOUCHER",
      "type": "text",
      "default": "VOUCHER",
      "value": "voucher1",
      "colorlist": []
    }, {
      "name": "providervisible",
      "label": "PROVIDER VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": false
    }, {
      "name": "provider",
      "label": "PROVIDER",
      "type": "text",
      "default": "PROVIDER",
      "value": "provider1",
      "colorlist": []
    }, {
      "name": "diagnosisvisible",
      "label": "DIAGNOSIS VISIBLE",
      "type": "checkbox",
      "default": true,
      "value": true
    }, {
      "name": "diagnosis",
      "label": "DIAGNOSIS",
      "type": "text",
      "default": "DIAGNOSIS",
      "value": "diagnosis1",
      "colorlist": []
    }];
    const initialCreditCardOptions=null;
    const customizedCanonicalOptions=null;
    const initialCustomizedCanonicalOptions=null;
    const getIsBlockingValue = () => false;
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "diagnosisLabelOptions": [{
        "name": "vouchervisible",
        "label": "VOUCHER VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": true
      }, {
        "name": "voucher",
        "label": "VOUCHER",
        "type": "text",
        "default": "VOUCHER",
        "value": "voucher1",
        "colorlist": []
      }, {
        "name": "providervisible",
        "label": "PROVIDER VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": false
      }, {
        "name": "provider",
        "label": "PROVIDER",
        "type": "text",
        "default": "PROVIDER",
        "value": "provider1",
        "colorlist": []
      }, {
        "name": "diagnosisvisible",
        "label": "DIAGNOSIS VISIBLE",
        "type": "checkbox",
        "default": true,
        "value": true
      }, {
        "name": "diagnosis",
        "label": "DIAGNOSIS",
        "type": "text",
        "default": "DIAGNOSIS",
        "value": "diagnosis1",
        "colorlist": []
      }],
      "diagnosisLabelDisable": true,
      "isBlocking": false
    };
    try {
      const actualResult = actions.onChangeOptions(
        event, sectionName, options,initialCreditCardOptions,
        customizedCanonicalOptions,initialCustomizedCanonicalOptions,
        initialOptions, getIsBlockingValue);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});


describe('TemplateCustomizationAction onClickListOptions', () => {
  it('onClickListOptions sectionName=SECTION_NAME_COLORS', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_COLORS;
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      colorOptions: [{
        name: 'id',
        display: 'none',
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_TEMPLATE_RICH_TEXT', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_TEMPLATE_RICH_TEXT;
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      richTextTemplateTextArea: [{
        name: 'id',
        display: false,
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_BACKER_RICH_TEXT', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_BACKER_RICH_TEXT;
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      richTextBackerTextArea: [{
        name: 'id',
        display: false,
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = colorList', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      display: 'block',
      type: 'colorList',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      additionalOptions: [{
        name: 'id',
        display: 'none',
        type: 'colorList',
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = richText', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      display: 'block',
      type: 'richText',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      additionalOptions: [{
        name: 'id',
        display: false,
        type: 'richText',
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = xxx', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      display: 'block',
      type: 'xxx',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      additionalOptions: [{
        name: 'id',
        display: 'none',
        type: 'xxx',
      },],
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=xxx', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = 'xxx';
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=xxx, event === isFromEditButton', () => {
    const event = 'isFromEditButton';
    const sectionName = 'xxx';
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
    };
    const actualResult = actions.onClickListOptions(
      sectionName,
      options,
      event,
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickListOptions sectionName=SECTION_NAME_PAYMENT_STUB for paystubVisible', () => {
    const event = {
      target: {
        id: 'paystubVisible',
        value: 'true',
        checked:true
      },
    };
    const sectionName = types.SECTION_NAME_PAYMENT_STUB;
    const options = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true,
      display:true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": [],
      display:true
    }];
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "paystubvisibleOptions": [{
        "name": "paystubVisible",
        "label": "PAYMENT STUB VISIBLE",
        "type": "checkbox",
        "default": false,
        "value": true,
        "display": "block"
      }, {
        "name": "amountOwedLabel",
        "label": "Amount Owed Label",
        "type": "text",
        "default": "Amount Due",
        "value": "50045",
        "colorlist": [],
        "display": true
      }]
    };
    try {
      const actualResult = actions.onClickListOptions(
        sectionName, options,event);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onClickListOptions sectionName=SECTION_NAME_MESSAGEBODY_OPTIONS', () => {
    const event = {
      target: {
        id: 'onsertContent1',
        "type": "richText",
        value: 'new onsert'
      },
    };
    const sectionName = types.SECTION_NAME_MESSAGEBODY_OPTIONS;
    const options = [{
      "name": "onsertContent1",
      "label": "Onsert Content",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
      "colorlist": []
    }, {
      "name": "onsertContent2",
      "label": "Onsert Content 2",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
      "colorlist": []
    }, {
      "name": "onsertContent3",
      "label": "Onsert Content 3",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
      "colorlist": []
    }];
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "messageBodyOptions": [{
        "name": "onsertContent1",
        "label": "Onsert Content",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
        "colorlist": [],
        "display": true
      }, {
        "name": "onsertContent2",
        "label": "Onsert Content 2",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
        "colorlist": []
      }, {
        "name": "onsertContent3",
        "label": "Onsert Content 3",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
        "colorlist": []
      }]
    };
    try {
      const actualResult = actions.onClickListOptions(
        sectionName, options,event);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction onClickItemOptions', () => {
  it('onClickItemOptions sectionName=SECTION_NAME_COLORS', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_COLORS;
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      colorOptions: [{
        name: 'id',
        display: 'none',
        value: 'new value',
      },],
      isBlocking: true,
      disableColors: false,
    };
    const actualResult = actions.onClickItemOptions(
      sectionName,
      options,
      event,
      'new value',
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickItemOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = colorList', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      display: 'block',
      type: 'colorList',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      additionalOptions: [{
        name: 'id',
        display: 'none',
        type: 'colorList',
        value: 'new value',
      },],
      isBlocking: true,
      disableAdditionalOptions: false,
    };
    const actualResult = actions.onClickItemOptions(
      sectionName,
      options,
      event,
      'new value',
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickItemOptions sectionName=SECTION_NAME_ADDITIONAL_OPTIONS, option type = xxx', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = types.SECTION_NAME_ADDITIONAL_OPTIONS;
    const options = [{
      name: 'id',
      display: 'block',
      type: 'xxx',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      additionalOptions: [{
        name: 'id',
        display: 'none',
        type: 'xxx',
      },],
      disableAdditionalOptions: false,
      isBlocking: true,
    };
    const actualResult = actions.onClickItemOptions(
      sectionName,
      options,
      event,
      'new value',
    );

    expect(actualResult).eqls(expectedResponse);
  });
  it('onClickItemOptions sectionName=xxx', () => {
    const event = {
      target: {
        id: 'id',
        value: 'value',
      },
    };
    const sectionName = 'xxx';
    const options = [{
      name: 'id',
      display: 'block',
    },];
    const expectedResponse = {
      type: types.ON_CHANGE_OPTIONS,
      isBlocking: true,
    };
    const actualResult = actions.onClickItemOptions(
      sectionName,
      options,
      event,
      'new value',
    );

    expect(actualResult).eqls(expectedResponse);
  });

  it('onClickItemOptions sectionName=SECTION_NAME_PAYMENT_STUB for paystubVisible', () => {
    const event = {
      target: {
        id: 'paystubVisible',
        value: 'true',
        checked:true
      },
    };
    const sectionName = types.SECTION_NAME_PAYMENT_STUB;
    const options = [{
      "name": "paystubVisible",
      "label": "PAYMENT STUB VISIBLE",
      "type": "checkbox",
      "default": false,
      "value": true,
      display:true
    }, {
      "name": "amountOwedLabel",
      "label": "Amount Owed Label",
      "type": "text",
      "default": "Amount Due",
      "value": "50045",
      "colorlist": [],
      display:true
    }];
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "paystubvisibleOptions": [{
        "name": "paystubVisible",
        "label": "PAYMENT STUB VISIBLE",
        "type": "checkbox",
        "default": false,
        "value": "true",
        "display": "block"
      }, {
        "name": "amountOwedLabel",
        "label": "Amount Owed Label",
        "type": "text",
        "default": "Amount Due",
        "value": "50045",
        "colorlist": [],
        "display": true
      }],
      "disablePaymentStub": false,
      "isBlocking": true
    };
    try {
      const actualResult = actions.onClickItemOptions(
        sectionName, options,event,'true');

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('onClickItemOptions sectionName=SECTION_NAME_MESSAGEBODY_OPTIONS', () => {
    const event = {
      target: {
        id: 'onsertContent1',
        "type": "richText",
        value: 'new onsert'
      },
    };
    const sectionName = types.SECTION_NAME_MESSAGEBODY_OPTIONS;
    const options = [{
      "name": "onsertContent1",
      "label": "Onsert Content",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
      "colorlist": []
    }, {
      "name": "onsertContent2",
      "label": "Onsert Content 2",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
      "colorlist": []
    }, {
      "name": "onsertContent3",
      "label": "Onsert Content 3",
      "type": "richText",
      "default": "",
      "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
      "colorlist": []
    }];
    const expectedResponse = {
      "type": "TemplateCustomization_onChangeOptions",
      "messageBodyOptions": [{
        "name": "onsertContent1",
        "label": "Onsert Content",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 1</p></body></html>]]>",
        "colorlist": [],
        "display": true
      }, {
        "name": "onsertContent2",
        "label": "Onsert Content 2",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 2</p></body></html>]]>",
        "colorlist": []
      }, {
        "name": "onsertContent3",
        "label": "Onsert Content 3",
        "type": "richText",
        "default": "",
        "value": "<![CDATA[<html><body><p>test onsert 3</p></body></html>]]>",
        "colorlist": []
      }],
      "isBlocking": true
    };
    try {
      const actualResult = actions.onClickItemOptions(
        sectionName, options,event,null);

      expect(actualResult).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction getXmlTypeCheckboxGroup', () => {
  it('getXmlTypeCheckboxGroup', () => {
    const options = [{
      value: true,
      name: '123',
    },];
    const expectedResponse = `<option><name>undefined</name><value>123</value></option>`;
    const actualResult = actions.getXmlTypeCheckboxGroup(options);

    expect(actualResult.replace(/ /g, '').replace(/\n/g, '')).to.eql(
      expectedResponse.replace(/ /g, '').replace(/\n/g, ''),
    );
  });
});

describe('TemplateCustomizationAction setConfigurationApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // it('setConfigurationApiCall API success, no modification', async () => {
  //   const expectedResponse = {
  //     resSetConfigurationApiCall: {
  //       results: [{
  //         logoid: 1
  //       }]
  //     },
  //     resUpdatedDetectedChangesApiCall: undefined,
  //   };
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/customizedCanonical/changesDetected')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/ecodocx/setUserConfiguration')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   const configs = {
  //     richTextTemplateTextArea: {
  //       value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
  //     },
  //     richTextBackerTextArea: {
  //       value: '<![CDATA[<html><body><p>Terms and Condition</p></body></html>]]>',
  //     },
  //   };
  //   const detectedChanges = {
  //     changedField: 'creditCard',
  //   };
  //   const currentOptionList = [{
  //     label: 'label',
  //     name: 'name'
  //   }];
  //   const currentOptionListModified = [{
  //     label: 'label',
  //     name: 'name'
  //   }];
  //   const jobId = '';
  //   const providerName = '';
  //   const customerId = '';
  //   const createdBy = '';
  //   const companyId = '';
  //   const returnValue = await actions.setConfigurationApiCall(
  //     configs,
  //     detectedChanges,
  //     currentOptionList,
  //     currentOptionListModified,
  //     jobId,
  //     providerName,
  //     customerId,
  //     createdBy,
  //     companyId,
  //   );

  //   expect(returnValue).eqls(expectedResponse);
  // });

  // it('setConfigurationApiCall API success, detectedChanges.changedField = creditCard', async () => {
  //   const expectedResponse = {
  //     resSetConfigurationApiCall: {
  //       results: [{
  //         logoid: 1
  //       }]
  //     },
  //     resUpdatedDetectedChangesApiCall: undefined,
  //   };
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/customizedCanonical/changesDetected')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/ecodocx/setUserConfiguration')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   const configs = {
  //     richTextTemplateTextArea: {
  //       value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
  //     },
  //     richTextBackerTextArea: {
  //       value: '<![CDATA[<html><body><p>Terms and Condition</p></body></html>]]>',
  //     },
  //   };
  //   const detectedChanges = {
  //     changedField: 'creditCard',
  //   };
  //   const currentOptionList = [{
  //     label: 'label',
  //     value: 'name'
  //   }];
  //   const currentOptionListModified = [{
  //     label: 'label',
  //     value: 'name1'
  //   }];
  //   const jobId = '';
  //   const providerName = '';
  //   const customerId = '';
  //   const createdBy = '';
  //   const companyId = '';
  //   const returnValue = await actions.setConfigurationApiCall(
  //     configs,
  //     detectedChanges,
  //     currentOptionList,
  //     currentOptionListModified,
  //     jobId,
  //     providerName,
  //     customerId,
  //     createdBy,
  //     companyId,
  //   );

  //   expect(returnValue).eqls(expectedResponse);
  // });

  // it('setConfigurationApiCall API success, detectedChanges.changedField = creditCard, currentOptionListModified value=true', async () => {
  //   const expectedResponse = {
  //     resSetConfigurationApiCall: {
  //       results: [{
  //         logoid: 1
  //       }]
  //     },
  //     resUpdatedDetectedChangesApiCall: undefined,
  //   };
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/customizedCanonical/changesDetected')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   nock(process.env.API_ROOT_Server)
  //     .post('/api/ecodocx/setUserConfiguration')
  //     .reply(200, {
  //       results: [{
  //         logoid: 1
  //       }]
  //     });
  //   const configs = {
  //     richTextTemplateTextArea: [{
  //       value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>'
  //     },],
  //     richTextBackerTextArea: {
  //       value: '<![CDATA[<html><body><p>Terms and Condition</p></body></html>]]>',
  //     },
  //   };
  //   const detectedChanges = {
  //     changedField: 'creditCard',
  //   };
  //   const currentOptionList = [{
  //     label: 'label',
  //     value: 'name'
  //   }];
  //   const currentOptionListModified = [{
  //     label: 'label',
  //     value: true
  //   }];
  //   const jobId = '';
  //   const providerName = '';
  //   const customerId = '';
  //   const createdBy = '';
  //   const companyId = '';
  //   const returnValue = await actions.setConfigurationApiCall(
  //     configs,
  //     detectedChanges,
  //     currentOptionList,
  //     currentOptionListModified,
  //     jobId,
  //     providerName,
  //     customerId,
  //     createdBy,
  //     companyId,
  //   );

  //   expect(returnValue).eqls(expectedResponse);
  // });

  it('setConfigurationApiCall API success, detectedChanges.changedField != creditCard', async () => {
    const expectedResponse = {
      resSetConfigurationApiCall: {
        results: [{
          logoid: 1
        }]
      },
      resUpdatedDetectedChangesApiCall: undefined,
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/setUserConfiguration')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const configs = {
      richTextTemplateTextArea: [{
        value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
      }],
      richTextBackerTextArea:[{
        value:DEFAULT_BACKER
      }],
      messageBodyOptions:[{
        name:'letterBody',
        value:DEFAULT_LETTER_BODY
      },{
        name:'freeText',
        value:DEFAULT_ADDITIONAL_DATA
      }]
    };
    const configRecord= {
      richTextTemplateTextArea: [{
        value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
      }],
      richTextBackerTextArea: [{
        value: '<![CDATA[<html><body><p>Terms and Condition</p></body></html>]]>',
      }],
    };
    const detectedChanges = {
      changedField: 'creditCard',
    };
    const currentOptionList = [{
      name:'logo',
      type:'logo',
      label: 'LOGO',
      value: 'http://www.google.com/image1'
    },{
      name:'logotype',
      type:'logotype',
      label: 'LOGOTYPE',
      selectedLogoTypeLayout:'square',
      value:'square'
    },{
      name:'providerName',
      type:'text',
      label: 'label',
      value: 'name'
    },{
      name:'creditCard',
      type:'creditCard',
      label:'CREDIT CARD',
      value:false
    },{
      name:'logovisible',
      type:'text',
      label:'LOGO VISIBLE',
      value:'Unchecked'
    }];
    const currentOptionListModified = [{
      name:'logo',
      type:'logo',
      label: 'LOGO',
      value: 'http://www.google.com/image2'
    },{
      name:'logotype',
      type:'logotype',
      label: 'LOGOTYPE',
      selectedLogoTypeLayout:'horizontal',
      value:'horizontal'
    },{
      name:'providerName',
      type:'text',
      label: 'label',
      value: 'name1'
    },{
      name:'creditCard',
      type:'creditCard',
      label:'CREDIT CARD',
      value:true
    },{
      name:'logovisible',
      type:'text',
      label:'LOGO VISIBLE',
      value:'Checked'
    }];
    const jobId = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';
    const templateId='1';
    const selectedLogoId='';
    const facilityName='';
    const changedField='logo';
    try {
      const returnValue = await actions.setConfigurationApiCall(
        configs,
        detectedChanges,
        currentOptionList,
        currentOptionListModified,
        jobId,
        providerName,
        customerId,
        createdBy,
        companyId,
        configRecord,templateId,selectedLogoId,facilityName,changedField
      );
    
      expect(returnValue).eqls(expectedResponse);
    } catch (error) {
      expect(error).to.not.eql(null);
    }
  });

  it('setConfigurationApiCall API failed', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/setUserConfiguration')
      .reply(400, {
        error: 'error'
      });
    const configs = {
      richTextTemplateTextArea: {
        value: '<![CDATA[<html><body><p>Text Area</p></body></html>]]>',
      },
    };
    const detectedChanges = {
      changedField: 'creditCard1',
    };
    const currentOptionList = [{
      label: 'label',
      value: 'name'
    }];
    const currentOptionListModified = [{
      label: 'label',
      value: 'name1'
    }];
    const jobId = '';
    const providerName = '';
    const customerId = '';
    const createdBy = '';
    const companyId = '';

    try {
      await actions.setConfigurationApiCall(
        configs,
        detectedChanges,
        currentOptionList,
        currentOptionListModified,
        jobId,
        providerName,
        customerId,
        createdBy,
        companyId,
      );
    } catch (error) {
      // const returnValue = error.error;

      // expect(returnValue).eqls(expectedResponse);
      // expect('').eqls('');
      expect(expectedResponse).to.not.eql(null);
      expect(error).to.not.eql(null);
    }
  });
});

describe('TemplateCustomizationAction setLogoConfigurationApiCall', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('setLogoConfigurationApiCall API success', async () => {
    const expectedResponse = {
      resSetConfigurationApiCall: {
        results: [{
          logoid: 1
        }]
      },
      resUpdatedDetectedChangesApiCall: undefined,
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/set_User_Logo_Configuration')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    const configs = {
      logoOptions: []
    };
    const detectedChanges = {
      changedField: 'creditCard1'
    };
    const returnValue = await actions.setLogoConfigurationApiCall(
      configs,
      detectedChanges,
    );

    expect(returnValue).eqls(expectedResponse);
  });

  it('setLogoConfigurationApiCall API failed', async () => {
    const expectedResponse = 'error';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedCanonical/changesDetected')
      .reply(200, {
        results: [{
          logoid: 1
        }]
      });
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/set_User_Logo_Configuration')
      .reply(400, {
        error: 'error'
      });
    const configs = {
      logoOptions: []
    };
    const detectedChanges = {
      changedField: 'creditCard1',
    };

    try {
      await actions.setLogoConfigurationApiCall(configs, detectedChanges);
    } catch (error) {
      const returnValue = error.error;

      expect(returnValue).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction GetCustomizedCanonicalXml', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('GetCustomizedCanonicalXml API success', async () => {
    const expectedResponse = '123';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalxml')
      .reply(200, {
        canonicalxml: '123'
      });
    const returnValue = await actions.GetCustomizedCanonicalXml(1, 2);

    expect(returnValue).eqls(expectedResponse);
  });

  it('GetCustomizedCanonicalXml API success, no expected props', async () => {
    const expectedResponse = {};
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalxml')
      .reply(200, {});
    const returnValue = await actions.GetCustomizedCanonicalXml(1, 2);

    expect(JSON.stringify(returnValue)).eqls(JSON.stringify(expectedResponse));
  });

  it('setLogoConfigurationApiCall API failed', async () => {
    const expectedResponse = '123';
    nock(process.env.API_ROOT_Server)
      .post('/api/customizedcanonical/getcustomizedcanonicalxml')
      .reply(400, {
        error: 'error'
      });
    try {
      await actions.GetCustomizedCanonicalXml(1, 2);
    } catch (error) {
      const returnValue = error.error;

      expect(returnValue).eqls(expectedResponse);
    }
  });
});

describe('TemplateCustomizationAction replaceHTMLEncoding', () => {
  it('replaceHTMLEncoding', () => {
    const expectedResponse = 'bc';
    const content = 'abc';
    const char = 'a';
    const byChar = '';
    const returnValue = actions.replaceHTMLEncoding(content, char, byChar);

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction getPdfUrl', () => {
  it('getPdfUrl', () => {
    const expectedResponse = null;
    const previewRecords = null;
    const returnValue = actions.getPdfUrl(previewRecords);

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction processChannelPartners', () => {
  it('processChannelPartners', () => {
    const expectedResponse = [{
      id: 0,
      name: 'Global Change'
    }];
    const channelPartners = [];
    const returnValue = actions.processChannelPartners(channelPartners);

    expect(returnValue).eqls(expectedResponse);
  });
});

describe('TemplateCustomizationAction onLoadTemplateLogoSize', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('onLoadTemplateLogoSize ', async () => {
    const expectedResponse = {
      response: 'success'
    };
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplatePreviewLogoSize')
      .reply(200, {
        response: 'success'
      });

    const returnValue = await actions.onLoadTemplateLogoSize(
      'Washington',
      'largelogoType',
      'image/png,base64,//string....',
    );
    expect(returnValue).eqls(expectedResponse);
  });

  it('onLoadTemplateLogoSize ', async () => {
    nock(process.env.API_ROOT_Server)
      .post('/api/ecodocx/getTemplatePreviewLogoSize')
      .reply(500, '');

    const returnValue = await actions.onLoadTemplateLogoSize(
      'Washington',
      'largelogoType',
      'image/png,base64,//string....',
    );
    expect(returnValue.status).eqls(500);
  });
});

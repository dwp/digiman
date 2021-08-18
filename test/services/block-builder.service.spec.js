import blockBuilder from '../../app/services/block-builder.service';

describe('Block Builder', () => {
  let block;

  const checkboxData = {
    id : "checkbox-id",
    label: "Select any option",
    type: "CHECKBOX",
    options: [
      { "text" : "ATM statement (cash point)", "value": "ATM"},
      { "text" : "Bank card", "value": "card" },
      { "text" : "Building society pass book", "value": "society"},
      { "text" : "Cheque book", "value": "Cheque"},
      { "text" : "Credit Union statement", "value": "CreditUnion"},
      { "text" : "Other recent financial statements", "value": "Other" },
      { "text" : "Official letter confirming account has recently been opened in the claimant's name", "value": "letter" },
      { "text" : "Recent bank account statement", "value": "Recent" }
    ]
  };

  const textareaData = {
    id : "textarea-id",
    type: "TEXTAREA",
    label: "Textarea Label"
  };

  const dateData = {
    id : "date-id",
    type: "DATE",
    label: "Date Label"
  };

  const textInputData = {
    id : "input-id",
    type: "TEXT_INPUT",
    label: "Input Label",
    hint: "Input hint text"
  };

  const radioData = {
    id : "radio-id",
    label: "Select any option",
    type: "RADIO",
    options: [
      { "text" : "One", "questionBlockId": "ONE"},
      { "text" : "Two", "questionBlockId": "TWO"}
    ]
  };

  const paragraphData = {
      type: "PARAGRAPH",
      content: "PARAGRAPH Text"
  };
  const hintData = {
      type: "HINT",
      content: "HINT Text"
  };
  const listData = {
      type: "LIST",
      content: ["List item 1", "List item 2"]
  };
  const breakData = {
      type: "BREAK"
  };
  const importantData = {
      type: "IMPORTANT",
      content: "IMPORTANT Text"
  };

  afterEach(() => {
    block = null;
  });

  describe('When checkbox data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(checkboxData);
    });
    it('Then html string containing checkbox section is returned', () => {
      expect(block.outerHTML.includes(`<div class="govuk-form-group" id="id-section-checkbox-id">`)).toBe(true);
    });
  });

  describe('When radio data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(radioData);
    });
    it('Then html string containing radio section is returned', () => {
      expect(block.outerHTML.includes(`<div class="govuk-form-group" id="id-section-radio-id">`)).toBe(true);
    });
  });

  describe('When textarea data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(textareaData);
    });
    it('Then html string containing textarea section is returned', () => {
      expect(block.outerHTML.includes(`<div class="govuk-form-group text" id="id-section-textarea-id">`)).toBe(true);
    });
  });

  describe('When date data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(dateData);
    });
    it('Then html string containing date section is returned', () => {
      expect(block.outerHTML.includes(`<div class="govuk-form-group" id="id-section-date-id">`)).toBe(true);
    });
  });

  describe('When text input data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(textInputData);
    });
    it('Then html string containing text input section is returned', () => {
      expect(block.outerHTML.includes(`<div class="govuk-form-group text" id="id-section-input-id">`)).toBe(true);
    });
  });

  describe('When paragraph data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(paragraphData);
    });
    it('Then html string containing paragraph section is returned', () => {
      expect(block.outerHTML.includes(`<p class="govuk-body text">PARAGRAPH Text</p>`)).toBe(true);
    });
  });

  describe('When hint data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(hintData);
    });
    it('Then html string containing hint section is returned', () => {
      expect(block.outerHTML.includes(`<p class="govuk-hint text">HINT Text</p>`)).toBe(true);
    });
  });

  describe('When important information data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(importantData);
    });
    it('Then html string containing important information section is returned', () => {
      expect(block.outerHTML.includes(`<p class="govuk-inset-text text">IMPORTANT Text</p>`)).toBe(true);
    });
  });

  describe('When break data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(breakData);
    });
    it('Then html string containing break section is returned', () => {
      expect(block.outerHTML.includes(`<br>`)).toBe(true);
    });
  });

  describe('When list data is passed to blockBuilder', () => {
    beforeEach(() => {
      block = blockBuilder(listData);
    });
    it('Then html string containing list section is returned', () => {
      expect(block.outerHTML.includes(`<ul class="govuk-list govuk-list--bullet text">`)).toBe(true);
    });
  });
});
import { FormBlock } from '../../app/subcomponents/form-block.component';

describe('FormBlock', () => {
  let block;
  let checkboxData = (readOnly) => {
    return {
      id : "checkbox-id",
      label: "Select any option",
      type: "CHECKBOX",
      readOnly: readOnly,
      options: [
        { "text" : "ATM statement (cash point)", "value": "ATM"},
        { "text" : "Bank card", "value": "card" }
      ]
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When Block is initialised', () => {
    it('Then throw a type error', () => {
      expect(() => { new FormBlock(checkboxData, false); }).toThrow(new TypeError('Abstract class "FormBlock" cannot be instantiated directly.'));
    });
  });
});
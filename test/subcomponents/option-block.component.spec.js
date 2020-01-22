import { OptionBlock } from '../../app/subcomponents/option-block.component';

describe('OptionBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let checkboxData = (readOnly) => {
    return {
      id : "checkbox-id",
      label: "Select any option",
      type: "CHECKBOX",
      readOnly: readOnly,
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
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When CHECKBOX block is created', () => {
    beforeEach(() => {
      block = new OptionBlock(checkboxData(EDITABLE));
    });

    it('Then html object contains defined label', () => {
      expect(block.html.includes(`Select any option`)).toBe(true);
    });

    it('And hint is as defined', () => {
      expect(block.hint).toBe(undefined);
    });

    it('And label is as defined', () => {
      expect(block.label).toBe('Select any option');
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('checkbox-id');
    });

    it('And type is CHECKBOX', () => {
      expect(block.type).toBe('CHECKBOX');
    });

    it('And options are as defined', () => {
      expect(block.options).toEqual([{ "text" : "ATM statement (cash point)", "value": "ATM"},
                                    { "text" : "Bank card", "value": "card" },
                                    { "text" : "Building society pass book", "value": "society"},
                                    { "text" : "Cheque book", "value": "Cheque"},
                                    { "text" : "Credit Union statement", "value": "CreditUnion"},
                                    { "text" : "Other recent financial statements", "value": "Other" },
                                    { "text" : "Official letter confirming account has recently been opened in the claimant's name", "value": "letter" },
                                    { "text" : "Recent bank account statement", "value": "Recent" }]);

    });

    describe('When CHECKBOX is state is set to ATM', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ATM', true);
      });

      it('And options are updated to have ATM option selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(true);
      });

      it('And html is updated to reflect that change', () => {
        expect(block.html.includes(`checked`)).toBe(true);
      });
    });

    describe('When CHECKBOX state is set to ATM second time', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ATM', true);
        block.setState('ATM', false);
      });

      it('Then options are updated to have ATM option un-selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(false);
      });

      it('And html is updated to reflect that change', () => {
        expect(block.html.includes(`checked`)).toBe(false);
      });
    });

    describe('When CHECKBOX state is reset', () => {
      beforeEach(() => {
        block.setState('ATM', true);
        block.resetState();
      });

      it('Then options are updated to have ATM option un-selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(false);
      });

      it('And html is updated to reflect that change', () => {
        expect(block.html.includes(`checked`)).toBe(false);
      });
    });
  });

  describe('When CHECKBOX block is created with read only access', () => {
    beforeEach(() => {
      block = new OptionBlock(checkboxData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});
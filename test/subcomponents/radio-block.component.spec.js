import { RadioBlock } from '../../app/subcomponents/radio-block.component';

describe('RadioBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let checkboxData = (readOnly) => {
    return {
      id: "radio-id",
      label: "Select any option",
      type: "RADIO",
      readOnly: readOnly,
      options: [
        { "text": "ATM statement (cash point)", "value": "ATM" },
        { "text": "Bank card", "value": "card" },
        { "text": "Building society pass book", "value": "society" },
        { "text": "Cheque book", "value": "Cheque" },
        { "text": "Credit Union statement", "value": "CreditUnion" },
        { "text": "Other recent financial statements", "value": "Other" },
        { "text": "Official letter confirming account has recently been opened in the claimant's name", "value": "letter" },
        { "text": "Recent bank account statement", "value": "Recent" }
      ]
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When RADIO block is created', () => {
    beforeEach(() => {
      block = new RadioBlock(checkboxData(EDITABLE));
    });

    it('And hint is as defined', () => {
      expect(block.hint).toBe(undefined);
    });

    it('And label is as defined', () => {
      expect(block.label).toBe('Select any option');
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('radio-id');
    });

    it('And type is RADIO', () => {
      expect(block.type).toBe('RADIO');
    });

    it('And options are as defined', () => {
      expect(block.options).toEqual([{ "text": "ATM statement (cash point)", "value": "ATM" },
      { "text": "Bank card", "value": "card" },
      { "text": "Building society pass book", "value": "society" },
      { "text": "Cheque book", "value": "Cheque" },
      { "text": "Credit Union statement", "value": "CreditUnion" },
      { "text": "Other recent financial statements", "value": "Other" },
      { "text": "Official letter confirming account has recently been opened in the claimant's name", "value": "letter" },
      { "text": "Recent bank account statement", "value": "Recent" }]);

    });

    describe('When CHECKBOX is state is set to ATM', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ATM');
      });

      it('And options are updated to have ATM option selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(true);
      });
    });

    describe('When RADIO state is set to ATM second time', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ATM');
        block.setState('ATM');
      });

      it('Then options are updated to have ATM option is still selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(true);
      });
    });

    describe('When RADIO state is reset', () => {
      beforeEach(() => {
        block.setState('ATM');
        block.resetState();
      });

      it('Then options are updated to have ATM option un-selected', () => {
        let atmOption = block.options.find((option) => {
          return option.value === 'ATM';
        });
        expect(atmOption.selected).toBe(false);
      });
    });
  });

  describe('When RADIO block is created with read only access', () => {
    beforeEach(() => {
      block = new RadioBlock(checkboxData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});
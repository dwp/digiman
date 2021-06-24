import { SelectBlock } from '../../app/subcomponents/select-block.component';

describe('SelectBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let selectData = (readOnly) => {
    return {
      id: "select-id",
      label: "Select any option",
      type: "SELECT",
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

  describe('When SELECT block is created', () => {
    beforeEach(() => {
      block = new SelectBlock(selectData(EDITABLE));
    });

    it('And hint is as defined', () => {
      expect(block.hint).toBe(undefined);
    });

    it('And label is Select any option', () => {
      expect(block.label).toBe('Select any option');
    });

    it('And id is select-id', () => {
      expect(block.id).toBe('select-id');
    });

    it('And type is SELECT', () => {
      expect(block.type).toBe('SELECT');
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

    describe('When SELECT is state is set to ATM', () => {
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

      describe('When SELECT state is set to society', () => {
        afterEach(() => {
          block.resetState();
        });

        beforeEach(() => {
          block.setState('society');
        });

        it('Then options are updated to society is selected', () => {
          let societyOption = block.options.find((option) => {
            return option.value === 'society';
          });
          expect(societyOption.selected).toBe(true);
        });
        describe('When SELECT state is reset', () => {
          beforeEach(() => {
            block.resetState();
          });

          it('Then options are updated to have society option un-selected', () => {
            let atmOption = block.options.find((option) => {
              return option.value === 'ATM';
            });
            expect(atmOption.selected).toBe(false);
          });
        });
      });
    });
  });

  describe('When CHECKBOX block is created with read only access', () => {
    beforeEach(() => {
      block = new SelectBlock(selectData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});
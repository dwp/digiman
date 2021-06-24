import { DateBlock } from '../../app/subcomponents/date-block.component';

describe('DateBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let dateData = (readOnly, hint) => {
    return {
      id: "date-id",
      label: "Select any date",
      type: "DATE",
      readOnly: readOnly,
      hint: hint
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When DATE block is created', () => {
    beforeEach(() => {
      block = new DateBlock(dateData(EDITABLE, null));
      block.setState(19991230);
    });

    it('And hint is set to default', () => {
      expect(block.hint).toBe("For example, 31 3 2018");
    });

    it('And label is as defined', () => {
      expect(block.label).toBe('Select any date');
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('date-id');
    });

    it('And type is DATE', () => {
      expect(block.type).toBe('DATE');
    });

    it('And value is 19991230', () => {
      expect(block.value).toEqual(19991230);
    });

    it('And day is 30', () => {
      expect(block.day).toEqual("30");
    });

    it('And month is 12', () => {
      expect(block.month).toEqual("12");
    });

    it('And year is 1999', () => {
      expect(block.year).toEqual("1999");
    });

    describe('When DATE date is changed to 20001231', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState(20001131);
      });

      it('Then value is 20001131', () => {
        expect(block.value).toEqual(20001131);
      });

      it('And day is 30', () => {
        expect(block.day).toEqual("31");
      });

      it('And month is 12', () => {
        expect(block.month).toEqual("11");
      });

      it('And year is 1999', () => {
        expect(block.year).toEqual("2000");
      });
    });

    describe('When DATE state is reset', () => {
      beforeEach(() => {
        block.resetState();
      });

      it('Then value is null', () => {
        expect(block.value).toBe(null);
      });
    });
  });

  describe('When DATE block is created with read only access with specified hint', () => {
    beforeEach(() => {
      block = new DateBlock(dateData(READ_ONLY, "Override hint"));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });

    it('And hint is Override hint', () => {
      expect(block.hint).toBe("Override hint");
    });
  });
});
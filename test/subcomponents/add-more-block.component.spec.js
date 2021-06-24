import { AddMoreBlock } from '../../app/subcomponents/add-more-block.component';
import { AddMoreBlockView } from '../../app/components/add-more-block-view.component';

describe('AddMoreBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let addMoredata = (readOnly) => {
    return {
      readOnly: readOnly,
      type: "ADD_MORE",
      id: "qb-end_add-more",
      blocks: [
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more1",
          label: "First"
        },
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more2",
          label: "Second"
        },
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more3",
          label: "Third"
        }
      ]
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When ADD_MORE block is created with 3 inputs', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(EDITABLE));
      const addMoreBlockView = new AddMoreBlockView();
      addMoreBlockView.createView(block);
    });

    it('Then object html contains 3 inputs', () => {
      expect(Array.from(block.htmlNode.querySelectorAll('.digiman__value-input')).length).toBe(3);
    });

    it('And object html contains 1 add more button', () => {
      expect(Array.from(block.htmlNode.querySelectorAll('.add-more__add-button')).length).toBe(1);
    });

    it('And object html contains 0 remove buttons', () => {
      expect(Array.from(block.htmlNode.querySelectorAll('.add-more__remove-button')).length).toBe(0);
    });

    it('And readOnly is set to false', () => {
      expect(block.readOnly).toBe(false);
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('qb-end_add-more');
    });

    it('And type is ADD_MORE', () => {
      expect(block.type).toBe('ADD_MORE');
    });

    it('And value is an empty state', () => {
      expect(block.value).toEqual([
        [
          { id: 'qb-end_add-more1--1', value: '' },
          { id: 'qb-end_add-more2--1', value: '' },
          { id: 'qb-end_add-more3--1', value: '' }
        ]
      ]);
    });

    describe('When ADD_MORE state is set on page load', () => {
      beforeEach(() => {
        block.setState([[{ id: 'qb-end_add-more1--1', value: 'qwe' }, { id: 'qb-end_add-more2--1', value: 'asd' }, { id: 'qb-end_add-more3--1', value: 'zxc' }]]);
      });

      it('Then value is set to NEW_VALUE', () => {
        expect(block.value).toEqual([[{ id: 'qb-end_add-more1--1', value: 'qwe' }, { id: 'qb-end_add-more2--1', value: 'asd' }, { id: 'qb-end_add-more3--1', value: 'zxc' }]]);
      });

      describe('When ADD_MORE state is reset', () => {
        beforeEach(() => {
          block.resetState();
        });

        it('Then value is reset to empty', () => {
          expect(block.value).toEqual([[{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }]]);
        });

        it('And html is updated to reflect that change', () => {
          const blocks = block.htmlNode.querySelectorAll('.digiman__value-input');
          expect(blocks[0].value).toEqual('');
          expect(blocks[1].value).toEqual('');
          expect(blocks[2].value).toEqual('');
        });
      });
    });

    describe('When ADD_MORE state is set by user', () => {
      beforeEach(() => {
        block.setChildState('NEW_VALUE', 'qb-end_add-more1--1');
      });

      it('Then value is set to NEW_VALUE', () => {
        expect(block.value).toEqual([[{ id: 'qb-end_add-more1--1', value: 'NEW_VALUE' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }]]);
      });
    });

    describe('When 2 items are added', () => {
      beforeEach(() => {
        block.addMoreButton.click();
        block.addMoreButton.click();
      });

      it('Then value is updated', () => {
        expect(block.value).toEqual([
          [{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }],
          [{ id: 'qb-end_add-more1--2', value: '' }, { id: 'qb-end_add-more2--2', value: '' }, { id: 'qb-end_add-more3--2', value: '' }],
          [{ id: 'qb-end_add-more1--3', value: '' }, { id: 'qb-end_add-more2--3', value: '' }, { id: 'qb-end_add-more3--3', value: '' }],
        ]);
      });

      it('And object html contains 9 inputs', () => {
        expect(Array.from(block.htmlNode.querySelectorAll('.digiman__value-input')).length).toBe(9);
      });

      it('And object html contains 1 add more button', () => {
        expect(Array.from(block.htmlNode.querySelectorAll('.add-more__add-button')).length).toBe(1);
      });

      it('And object html contains 2 remove buttons', () => {
        expect(Array.from(block.htmlNode.querySelectorAll('.add-more__remove-button')).length).toBe(2);
      });

      describe('When ADD_MORE state is set by the user', () => {
        beforeEach(() => {
          block.setChildState('NEW_VALUE1', 'qb-end_add-more2--2');
          block.setChildState('NEW_VALUE2', 'qb-end_add-more3--3');
        });

        it('Then value is updated', () => {
          expect(block.value).toEqual([
            [{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }],
            [{ id: 'qb-end_add-more1--2', value: '' }, { id: 'qb-end_add-more2--2', value: 'NEW_VALUE1' }, { id: 'qb-end_add-more3--2', value: '' }],
            [{ id: 'qb-end_add-more1--3', value: '' }, { id: 'qb-end_add-more2--3', value: '' }, { id: 'qb-end_add-more3--3', value: 'NEW_VALUE2' }]
          ]);
        });

        describe('When second section is removed', () => {
          beforeEach(() => {
            Array.from(block.htmlNode.querySelectorAll('.add-more__remove-button'))[0].click();
          });

          it('Then value is updated', () => {
            expect(block.value).toEqual([
              [{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }],
              [{ id: 'qb-end_add-more1--2', value: '' }, { id: 'qb-end_add-more2--2', value: '' }, { id: 'qb-end_add-more3--2', value: 'NEW_VALUE2' }]
            ]);
          });

          describe('When 1 item is added', () => {
            beforeEach(() => {
              block.addMoreButton.click();
            });

            it('Then value is updated', () => {
              expect(block.value).toEqual([
                [{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }],
                [{ id: 'qb-end_add-more1--2', value: '' }, { id: 'qb-end_add-more2--2', value: '' }, { id: 'qb-end_add-more3--2', value: 'NEW_VALUE2' }],
                [{ id: 'qb-end_add-more1--3', value: '' }, { id: 'qb-end_add-more2--3', value: '' }, { id: 'qb-end_add-more3--3', value: '' }]
              ]);
            });

            describe('When ADD_MORE state is reset', () => {
              beforeEach(() => {
                block.resetState();
              });

              it('Then value is reset to empty', () => {
                expect(block.value).toEqual([[{ id: 'qb-end_add-more1--1', value: '' }, { id: 'qb-end_add-more2--1', value: '' }, { id: 'qb-end_add-more3--1', value: '' }]]);
              });

              it('And html is updated to reflect that change', () => {
                const blocks = block.htmlNode.querySelectorAll('.digiman__value-input');
                expect(blocks[0].value).toEqual('');
                expect(blocks[1].value).toEqual('');
                expect(blocks[2].value).toEqual('');
              });

              it('And object html contains 1 add more button', () => {
                expect(Array.from(block.htmlNode.querySelectorAll('.add-more__add-button')).length).toBe(1);
              });
            });
          });
        });
      });
    });
  });

  describe('When ADD_MORE block is created with read only access', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(READ_ONLY));
      const addMoreBlockView = new AddMoreBlockView();
      addMoreBlockView.createView(block);
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});
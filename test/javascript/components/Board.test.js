import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Board from '../../../app/javascript/components/common/Board';
import { shuffleBoard } from '../../../app/javascript/constants/gameUtil';

// Initialize a Board component
const [onClick] = new Array(1).fill(jest.fn());

/**
 * Board Assertion tests using Enzyme
*/
describe('[Assertion tests] Board Size', () => {

    it('should render a board with the necessary parameters', () => {

        let boardLength = 4;
        let boardData = shuffleBoard('tarntacdinqwerta', boardLength);

        const enzymeWrapper = shallow(<Board handleClick={onClick} board={boardData} />);
       
        // Verify the number of rows generated
        let rows = enzymeWrapper.find('.row');
        expect(rows).toHaveLength(boardLength);

        // Verify the number of columns generated
        let tiles = rows.first().children();
        expect(tiles).toHaveLength(boardLength);
        
    });
});


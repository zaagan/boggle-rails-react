import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Tile from '../../../app/javascript/components/common/Tile';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Initialize a Button component
let [onClick] = new Array(1).fill(jest.fn());

const tileComponent = <Tile letter="A" handleClick={onClick} extraClass="custom" label="Hello world" />;



/**
 * Tile Snapshot test using Jest
*/
describe('[Snapshot tests] Tile activities', () => {

    it('should render a button', () => {
        const component = renderer.create(tileComponent);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});


/**
 * Tile Assertion tests using Enzyme
*/
describe('[Assertion tests] Tile activites', () => {

    it('should render a tile with a given letter', () => {

        let enzymeWrapper = shallow(tileComponent);
        let button = enzymeWrapper.find('.tile-item');
        button.simulate('click');

        // Check if the button is only clicked once
        expect(onClick.mock.calls.length).toEqual(1);

        // Check if the newly added class exists in the button
        expect(button.hasClass('custom')).toBe(true);


        // Check if the button text is as expected
        expect(button.text()).toEqual('A');

    });
});


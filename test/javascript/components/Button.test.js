import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../../../app/javascript/components/common/Button';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Initialize a Button component
let [onClick] = new Array(1).fill(jest.fn());
const enzymeWrapper = shallow(<Button handleSubmit={onClick} extraClass="test" label="Hello world" />);

/**
 * Button Snapshot test using Jest
*/
describe('[Snapshot tests] Button activities', () => {

    it('should render a button', () => {
        const component = renderer.create(<Button extraClass="test" label="Hello world" />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});


/**
 * Button Assertion tests using Enzyme
*/
describe('[Assertion tests] Button activites', () => {

    it('should render a button with a given text', () => {

        let button = enzymeWrapper.find('.button');
        button.simulate('click');

        // Check if the button is only clicked once
        expect(onClick.mock.calls.length).toEqual(1);

        // Check if the newly added class exists in the button
        expect(button.hasClass('test')).toBe(true);

        // Check if the button text is as expected
        expect(button.text()).toEqual('Hello world');

    });
});


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  // console.log(div.innerHTML);

  ReactDOM.unmountComponentAtNode(div);
});

it('matches the snapshot', () => {
  const wrapper = shallow( <App />);
  expect(wrapper).toMatchSnapshot();
})

it('matches the deep snapshot', () => {
  const wrapper = mount( <App />);
  expect(wrapper).toMatchSnapshot();
  wrapper.unmount();
})

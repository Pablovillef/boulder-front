/* eslint-disable prettier/prettier */
/**
 * @format
 */

import React from 'react';
import { BoulderApp } from '../src/BoulderApp';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BoulderApp />).toJSON();
  expect(tree).toMatchSnapshot();
});

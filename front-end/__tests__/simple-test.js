'use strict';
jest.unmock('../componentDidMount');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
require(__dirname + '/../app/js/app.js');

describe('testing componentDidMount', ()=>{
  it('should load array of data', ()=>{
    var list = TestUtils.renderIntoDocument(
      <li className='ContinentsData' key={cont._id}>{cont._id}
				<p key={cont.country}>Country : {cont.country}</p>
				<p key={cont.region}>Region: {cont.region}</p>
				<p key={cont.mineral}>Mineral: {cont.mineral}</p>
			</li>
    )
    expect(list.textContent).toBe('string');
  });
});

import { render } from '@testing-library/react';

import { Header } from '.';
import React from 'react';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header lang={'en'} />);
    expect(baseElement).toBeTruthy();
  });
});

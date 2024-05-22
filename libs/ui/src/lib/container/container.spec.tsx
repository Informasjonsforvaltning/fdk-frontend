import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Container } from '.';
import React from 'react';

expect.extend(toHaveNoViolations)

describe('Container', () => {

  it('should render successfully', async () => {
    const { baseElement } = render(
      <Container>Hello</Container>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have no a11y violations', async () => {
    const { baseElement } = render(
      <main>
        <Container>Hello</Container>
      </main>
    );
    expect(await axe(baseElement)).toHaveNoViolations()
  })

});

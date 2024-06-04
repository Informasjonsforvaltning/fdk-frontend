import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { getHeaderData } from './data';
import { Header } from '.';
import React from 'react';

expect.extend(toHaveNoViolations)

describe('Header', () => {
  let dictionary: any;
  let headerData: any;

  beforeEach(async () => {
    dictionary = await getDictionary('nb');
    headerData = getHeaderData(dictionary, '/', '/', '/');
  });

  it('should render successfully', async () => {
    render(
      <Header dictionary={dictionary} />
    );

    const logoElement = screen.getByAltText(dictionary.fdkLogoAlt);
    expect(logoElement).toBeInTheDocument();

    const topLinks = headerData.filter((item: any) => item.href);

    topLinks.forEach((link: any) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('should have no a11y violations', async () => {
    const { baseElement } = render(
      <main>
        <Header dictionary={dictionary} />
      </main>
    );
    expect(await axe(baseElement)).toHaveNoViolations()
  })

});

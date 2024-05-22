import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { getFooterData } from './data';
import { Footer } from '.';
import React from 'react';

expect.extend(toHaveNoViolations)

function extractLinks(data: any) {
  let links: any[] = [];
  data.forEach((section: any) => {
    if (section.links && Array.isArray(section.links)) {
      links.push(...section.links.filter((link: any) => link.href));
    }
  });
  return links;
}

describe('Footer', () => {
  let dictionary: any;
  let footerData: any;

  beforeEach(async () => {
    dictionary = await getDictionary('nb');
    footerData = getFooterData(dictionary, '/');
  });

  it('should render successfully', async () => {    
    render(
      <Footer dictionary={dictionary} />
    );

    const links = extractLinks(footerData);

    links.forEach((link: any) => {
      const linkElement = screen.getByText(link.text, { selector: 'a' });
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('should have no a11y violations', async () => {
    const { baseElement } = render(
      <main>
        <Footer dictionary={dictionary} />
      </main>
    );
    expect(await axe(baseElement)).toHaveNoViolations()
  })

});

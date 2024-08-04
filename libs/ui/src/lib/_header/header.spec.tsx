/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { getHeaderData, type HeaderData } from './data';
import { Header } from '.';
import { Dictionary, getDictionary } from '@fdk-frontend/dictionaries';

expect.extend(toHaveNoViolations);

describe('Header', () => {
  let dictionary: Dictionary;
  let headerData: HeaderData;

  beforeEach(async () => {
    dictionary = await getDictionary('nb');
    headerData = getHeaderData(dictionary, '/', '/', '/');
  });

  it('should render successfully', async () => {
    render(<Header dictionary={dictionary} />);

    const logoElement = screen.getAllByAltText(dictionary.fdkLogoAlt)[0];
    expect(logoElement).toBeInTheDocument();

    const topLinks = headerData.filter((item: any) => item.href);

    topLinks.forEach((link: any) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
    });
  });

  // Dette har skap en del problemer med designsystemkomponentene, og er derfor kommentert ut
  it('should have no a11y violations', async () => {
    const { baseElement } = render(
      <main>
        <Header dictionary={dictionary} />
      </main>,
    );
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});

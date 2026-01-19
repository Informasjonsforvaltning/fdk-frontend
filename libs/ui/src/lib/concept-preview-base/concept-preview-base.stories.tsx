import type { Meta, StoryObj } from '@storybook/react-vite';
import { getDictionary } from '@fdk-frontend/dictionaries';

import ConceptPreviewBase from '.';

const dictionary = await getDictionary('en', 'docs');

const meta: Meta<typeof ConceptPreviewBase> = {
    component: ConceptPreviewBase,
    title: 'ConceptPreviewBase',
};

export default meta;
type Story = StoryObj<typeof ConceptPreviewBase>;

export const Primary: Story = {
    render: () => (
        <ConceptPreviewBase
            label='Data Catalog'
            definition='A data catalog is a collection of metadata, combined with data management and search tools, that helps analysts and other data users to find the data that they need.'
            uri='https://data.norge.no/concepts/data-catalog'
            goToDataNorgeText={dictionary.conceptPreview.goToDatanorge}
        >
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                data catalog
            </span>
        </ConceptPreviewBase>
    ),
};

export const WithLongDefinition: Story = {
    render: () => (
        <ConceptPreviewBase
            label='Application Programming Interface (API)'
            definition='An API is a set of definitions and protocols for building and integrating application software. It defines how different software components should interact with each other, allowing developers to create applications that can communicate with other services and systems.'
            uri='https://data.norge.no/concepts/api'
            goToDataNorgeText={dictionary.conceptPreview.goToDatanorge}
        >
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                API
            </span>
        </ConceptPreviewBase>
    ),
};


import type { Meta, StoryObj } from "@storybook/react-vite";

import Box from "../box";
import ExternalLink from "../external-link";
import SmartList from ".";

const urls = ["https://www.example.com/one", "https://www.example.com/two", "https://www.example.com/three"];

const meta: Meta<typeof SmartList> = {
  component: SmartList,
  title: "SmartList",
};

export default meta;
type Story = StoryObj<typeof SmartList>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <>
      <div style={{ padding: "1rem" }}>
        Single item:
        <SmartList
          items={urls.slice(0, 1)}
          renderItem={(url) => (
            <ExternalLink
              href={url}
              locale="nb"
              gateway
            >
              {url}
            </ExternalLink>
          )}
        />
      </div>
      <div style={{ padding: "1rem" }}>
        Multiple items:
        <SmartList
          listType="ol"
          items={urls}
          renderItem={(url) => (
            <ExternalLink
              href={url}
              locale="nb"
              gateway
            >
              {url}
            </ExternalLink>
          )}
        />
      </div>
      <div style={{ padding: "1rem" }}>
        As box-list:
        <SmartList
          listType="ol"
          listItemWrapper={Box}
          items={urls}
          renderItem={(url) => (
            <ExternalLink
              href={url}
              locale="nb"
              gateway
            >
              {url}
            </ExternalLink>
          )}
        />
      </div>
    </>
  ),
};

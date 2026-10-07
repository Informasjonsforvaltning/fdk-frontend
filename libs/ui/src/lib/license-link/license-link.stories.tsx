import type { Meta, StoryObj } from "@storybook/react-vite";

import LicenseLink from ".";

const meta: Meta<typeof LicenseLink> = {
  component: LicenseLink,
  title: "LicenseLink",
};

export default meta;
type Story = StoryObj<typeof LicenseLink>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <>
      <div style={{ padding: "1rem" }}>
        <LicenseLink
          uri="http://publications.europa.eu/resource/authority/licence/NLOD_2_0"
          openLicenseLabel="Åpen lisens"
          locale="nb"
        >
          This is a LicenseLink
        </LicenseLink>
      </div>
    </>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import DistributionStatusTag from ".";
import VStack from "../vstack";

const statusCodes = [
  "COMPLETED",
  "DEVELOP",
  "WITHDRAWN",
  "DEPRECATED",
  "DISCONTINUED",
  "ARCHIVE",
  "ONGOING",
  "PLANNED",
  "REQUIRED",
] as const;

const meta: Meta<typeof DistributionStatusTag> = {
  component: DistributionStatusTag,
  title: "DistributionStatusTag",
};

export default meta;
type Story = StoryObj<typeof DistributionStatusTag>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <div style={{ padding: "1rem" }}>
      <VStack>
        {statusCodes.map((statusCode) => (
          <DistributionStatusTag
            key={statusCode}
            statusCode={statusCode}
            locale="nb"
            data-size="md"
          />
        ))}
        <DistributionStatusTag
          locale="nb"
          data-size="md"
        />
      </VStack>
    </div>
  ),
};

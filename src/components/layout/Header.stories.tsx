import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    isDarkBackground: false,
  },
  render: (args) => (
    <div className="p-10 bg-gray-50 min-h-[200px]">
      <Header {...args} />
    </div>
  ),
};

export const DarkBackground: Story = {
  args: {
    isDarkBackground: true,
  },
  render: (args) => (
    <div className="p-10 bg-black min-h-[200px]">
      <Header {...args} />
    </div>
  ),
};

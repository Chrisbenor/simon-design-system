// TextField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TextField } from "./TextField";

const PlusIcon = ({ label }: { label: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-label={label} role="img">
    <path d="M11 5h2v14h-2V5Z" fill="currentColor" />
    <path d="M5 11h14v2H5v-2Z" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          "TextField alineado a Figma: stack 20/36/16 con gaps 8, input container con padding 8/16, radius S, y SIEMPRE 2 iconos (left/right).",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "radio", options: ["s", "m", "l"] },
    state: { control: "radio", options: ["default", "error"] },
    helperText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    size: "m",
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />,
  },
};

export const WithHelpAndIcons: Story = {
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    size: "m",
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    state: "error",
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    required: true,
    placeholder: "Text",
    helperText: "Support Text",
    disabled: true,
    onHelpClick: () => alert("Help action"),
    leftIcon: <PlusIcon label="left-plus" />,
    rightIcon: <PlusIcon label="right-plus" />,
  },
};

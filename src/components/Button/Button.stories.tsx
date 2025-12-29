import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "./Button";

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M13 5l7 7-7 7M20 12H4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Plus = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: { type: "radio" }, options: ["primary", "secondary", "ghost"] },
    size: { control: { type: "radio" }, options: ["s", "m", "l"] },
    disabled: { control: { type: "boolean" } },
    label: { control: { type: "text" } },
    onClick: { action: "clicked" },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { label: "Botón primario", variant: "primary", size: "m" },
};

export const WithLeftIcon: Story = {
  args: { label: "Crear", variant: "primary", size: "m", iconLeft: <Plus /> },
};

export const WithRightIcon: Story = {
  args: { label: "Continuar", variant: "secondary", size: "m", iconRight: <ArrowRight /> },
};

export const WithBothIcons: Story = {
  args: {
    label: "Siguiente",
    variant: "primary",
    size: "l",
    iconLeft: <Plus />,
    iconRight: <ArrowRight />,
  },
};

export const Disabled: Story = {
  args: { label: "Deshabilitado", variant: "primary", size: "m", disabled: true, iconRight: <ArrowRight /> },
};

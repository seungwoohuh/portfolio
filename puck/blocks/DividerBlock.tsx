import type { ComponentConfig } from "@puckeditor/core";
import { numberField } from "../fields/NumberField";

export type DividerBlockProps = {
  color: string;
  thickness: number;
  margin: number;
};

export const DividerBlock: ComponentConfig<DividerBlockProps> = {
  fields: {
    color: { type: "text" },
    thickness: numberField({ min: 1, max: 20 }),
    margin: numberField({ min: 0, max: 200 }),
  },
  defaultProps: {
    color: "#dddddd",
    thickness: 1,
    margin: 24,
  },
  render: ({ color, thickness, margin }) => (
    <hr
      style={{
        border: "none",
        borderTop: `${thickness}px solid ${color || "#ddd"}`,
        margin: `${margin}px 0`,
      }}
    />
  ),
};

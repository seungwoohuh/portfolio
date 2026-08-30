import type { ComponentConfig } from "@puckeditor/core";
import { numberField } from "../fields/NumberField";

export type SpacerBlockProps = {
  height: number;
};

export const SpacerBlock: ComponentConfig<SpacerBlockProps> = {
  fields: {
    height: numberField({ min: 0, max: 400 }),
  },
  defaultProps: {
    height: 40,
  },
  render: ({ height }) => <div style={{ height: `${height}px` }} />,
};

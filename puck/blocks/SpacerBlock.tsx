import type { ComponentConfig } from "@puckeditor/core";

export type SpacerBlockProps = {
  height: number;
};

export const SpacerBlock: ComponentConfig<SpacerBlockProps> = {
  fields: {
    height: { type: "number", min: 0, max: 400 },
  },
  defaultProps: {
    height: 40,
  },
  render: ({ height }) => <div style={{ height: `${height}px` }} />,
};

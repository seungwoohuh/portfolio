import type { ComponentConfig, Slot } from "@puckeditor/core";

export type ImageGridBlockProps = {
  columns: number;
  items: Slot;
};

export const ImageGridBlock: ComponentConfig<ImageGridBlockProps> = {
  fields: {
    columns: { type: "number", min: 1, max: 4 },
    items: { type: "slot" },
  },
  defaultProps: {
    columns: 2,
    items: [],
  },
  render: ({ columns, items: Items }) => {
    return (
      <Items
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1rem",
        }}
      />
    );
  },
};

import type { ComponentConfig, Slot } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ImageGridBlockProps = StyleProps & {
  columns: number;
  items: Slot;
};

export const ImageGridBlock: ComponentConfig<ImageGridBlockProps> = {
  fields: {
    columns: { type: "number", min: 1, max: 4 },
    items: { type: "slot" },
    ...styleFields,
  },
  defaultProps: {
    columns: 2,
    items: [],
    ...defaultStyleProps,
  },
  render: ({ columns, items: Items, ...style }) => (
    <div style={styleWrapperCss(style)}>
      <Items
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1rem",
        }}
      />
    </div>
  ),
};

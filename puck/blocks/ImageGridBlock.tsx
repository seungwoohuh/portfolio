import type { ComponentConfig, Slot } from "@puckeditor/core";
import { numberField } from "../fields/NumberField";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ImageGridBlockProps = StyleProps & {
  columns: number;
  gap: number;
  items: Slot;
};

// A general N-column auto-placement grid — despite the name, it accepts
// any block type (not just images), dropped into one slot and auto-flowed
// by CSS grid into the configured column count.
export const ImageGridBlock: ComponentConfig<ImageGridBlockProps> = {
  fields: {
    columns: numberField({ label: "칼럼 수", min: 1, max: 6 }),
    gap: numberField({ label: "간격 (px)", min: 0, max: 120 }),
    items: { type: "slot" },
    ...styleFields,
  },
  defaultProps: {
    columns: 2,
    gap: 16,
    items: [],
    ...defaultStyleProps,
  },
  render: ({ columns, gap = 16, items: Items, ...style }) => (
    <div style={styleWrapperCss(style)}>
      <Items
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      />
    </div>
  ),
};

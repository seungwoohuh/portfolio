import type { ComponentConfig, Slot } from "@puckeditor/core";
import { numberField } from "../fields/NumberField";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ColumnsBlockProps = StyleProps & {
  columns: 2 | 3;
  gap: number;
  col1: Slot;
  col2: Slot;
  col3: Slot;
};

// Puck slots are static props (no dynamic-length arrays of slots), so a
// fixed 3-slot layout is defined and the unused third column just isn't
// rendered when columns=2 — its (empty) content stays in the data either way.
export const ColumnsBlock: ComponentConfig<ColumnsBlockProps> = {
  fields: {
    columns: {
      type: "select",
      options: [
        { label: "2 columns", value: 2 },
        { label: "3 columns", value: 3 },
      ],
    },
    gap: numberField({ min: 0, max: 120 }),
    col1: { type: "slot" },
    col2: { type: "slot" },
    col3: { type: "slot" },
    ...styleFields,
  },
  defaultProps: {
    columns: 2,
    gap: 24,
    col1: [],
    col2: [],
    col3: [],
    ...defaultStyleProps,
  },
  render: ({ columns, gap, col1: Col1, col2: Col2, col3: Col3, ...style }) => (
    <div
      style={{
        ...styleWrapperCss(style),
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      <Col1 />
      <Col2 />
      {columns === 3 ? <Col3 /> : null}
    </div>
  ),
};

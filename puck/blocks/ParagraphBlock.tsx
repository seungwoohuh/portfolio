import type { ComponentConfig } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ParagraphBlockProps = StyleProps & {
  text: string;
  align: "left" | "center" | "right";
  color: string;
};

export const ParagraphBlock: ComponentConfig<ParagraphBlockProps> = {
  fields: {
    text: { type: "textarea" },
    align: {
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: { type: "text" },
    ...styleFields,
  },
  defaultProps: {
    text: "Text",
    align: "left",
    color: "",
    ...defaultStyleProps,
  },
  render: ({ text, align, color, ...style }) => (
    <div style={styleWrapperCss(style)}>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.6,
          textAlign: align,
          color: color || undefined,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </p>
    </div>
  ),
};

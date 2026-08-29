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
    // Puck's richtext field is a full Tiptap editor (bold/italic/underline/
    // strike/links/lists/blockquote) — it stores the content as an HTML
    // string, which is rendered with dangerouslySetInnerHTML below. Safe
    // here: only the site owner (dev/preview-only admin) can write it.
    text: { type: "richtext" },
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
    text: "<p>Text</p>",
    align: "left",
    color: "",
    ...defaultStyleProps,
  },
  render: ({ text, align, color, ...style }) => (
    <div style={styleWrapperCss(style)}>
      <div
        style={{
          fontSize: "1rem",
          lineHeight: 1.6,
          textAlign: align,
          color: color || undefined,
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  ),
};

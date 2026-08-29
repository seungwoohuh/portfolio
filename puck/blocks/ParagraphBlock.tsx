import type { ComponentConfig, RichText } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ParagraphBlockProps = StyleProps & {
  text: RichText;
  align: "left" | "center" | "right";
  color: string;
};

export const ParagraphBlock: ComponentConfig<ParagraphBlockProps> = {
  fields: {
    // Puck's richtext field is a full Tiptap editor (bold/italic/underline/
    // strike/links/lists/blockquote). It's stored as an HTML string, but
    // Puck resolves it to an already-parsed ReactNode before render() sees
    // it — render it directly as children, not via dangerouslySetInnerHTML
    // (which double-wraps the ReactNode into "[object Object]").
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
      >
        {text}
      </div>
    </div>
  ),
};

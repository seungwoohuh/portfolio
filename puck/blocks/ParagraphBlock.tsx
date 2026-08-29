import type { ComponentConfig, RichText } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";
import {
  overrideStyleFields,
  defaultOverrideProps,
  resolveTypographyCss,
  type StyleOverrideProps,
} from "../fields/typographyTokens";

export type ParagraphBlockProps = StyleProps &
  StyleOverrideProps & {
    text: RichText;
    align: "left" | "center" | "right";
  };

export const ParagraphBlock: ComponentConfig<ParagraphBlockProps> = {
  fields: {
    // Puck's richtext field is a full Tiptap editor (bold/italic/underline/
    // strike/links/lists/blockquote, Enter for a new paragraph, Shift+Enter
    // for a soft line break). It's stored as an HTML string, but Puck
    // resolves it to an already-parsed ReactNode before render() sees it —
    // render it directly as children, not via dangerouslySetInnerHTML
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
    ...overrideStyleFields,
    ...styleFields,
  },
  defaultProps: {
    text: "<p>Text</p>",
    align: "left",
    ...defaultOverrideProps(16, 1.6),
    ...defaultStyleProps,
  },
  render: ({
    text,
    align,
    overrideStyle = false,
    color = "",
    size = 16,
    lineHeight = 1.6,
    letterSpacing = 0,
    ...style
  }) => (
    <div style={styleWrapperCss(style)}>
      <div
        style={{
          ...resolveTypographyCss("body", {
            overrideStyle,
            color,
            size,
            lineHeight,
            letterSpacing,
          }),
          textAlign: align,
          wordBreak: "keep-all",
          overflowWrap: "break-word",
        }}
      >
        {text}
      </div>
    </div>
  ),
};

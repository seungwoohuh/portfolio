import type { ComponentConfig } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";
import {
  typographyFields,
  defaultTypographyProps,
  type TypographyProps,
} from "../fields/typographyFields";

export type HeadingBlockProps = StyleProps &
  TypographyProps & {
    text: string;
    level: "h1" | "h2" | "h3" | "h4";
    align: "left" | "center" | "right";
    color: string;
  };

const sizeByLevel: Record<HeadingBlockProps["level"], string> = {
  h1: "2.5rem",
  h2: "2rem",
  h3: "1.5rem",
  h4: "1.2rem",
};

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  fields: {
    text: { type: "text" },
    level: {
      type: "select",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    align: {
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: { type: "text" },
    ...typographyFields,
    ...styleFields,
  },
  defaultProps: {
    text: "Heading",
    level: "h2",
    align: "left",
    color: "",
    ...defaultTypographyProps(1.2),
    ...defaultStyleProps,
  },
  render: ({ text, level: Level, align, color, lineHeight, letterSpacing, ...style }) => (
    <div style={styleWrapperCss(style)}>
      <Level
        style={{
          fontFamily: "var(--font-heading, inherit)",
          fontSize: sizeByLevel[Level],
          fontWeight: 700,
          textAlign: align,
          color: color || undefined,
          lineHeight,
          letterSpacing: `${letterSpacing}px`,
          margin: 0,
        }}
      >
        {text}
      </Level>
    </div>
  ),
};

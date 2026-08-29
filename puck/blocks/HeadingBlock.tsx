import type { ComponentConfig } from "@puckeditor/core";
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
  type TypographyRole,
} from "../fields/typographyTokens";

export type HeadingBlockProps = StyleProps &
  StyleOverrideProps & {
    text: string;
    level: "h1" | "h2" | "h3" | "h4";
    align: "left" | "center" | "right";
  };

// h4 has no dedicated global token — it borrows the h3 role since it's
// always used as a minor sub-heading one step below h3.
const roleByLevel: Record<HeadingBlockProps["level"], TypographyRole> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h3",
};

const fallbackSizeByLevel: Record<HeadingBlockProps["level"], number> = {
  h1: 40,
  h2: 32,
  h3: 24,
  h4: 19,
};

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  fields: {
    text: {
      type: "textarea",
      label: "텍스트 (Enter로 줄바꿈 가능)",
    },
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
    ...overrideStyleFields,
    ...styleFields,
  },
  defaultProps: {
    text: "Heading",
    level: "h2",
    align: "left",
    ...defaultOverrideProps(32, 1.2),
    ...defaultStyleProps,
  },
  render: ({
    text,
    level: Level,
    align,
    overrideStyle = false,
    color = "",
    size = fallbackSizeByLevel[Level],
    lineHeight = 1.2,
    letterSpacing = 0,
    ...style
  }) => (
    <div style={styleWrapperCss(style)}>
      <Level
        style={{
          ...resolveTypographyCss(roleByLevel[Level], {
            overrideStyle,
            color,
            size,
            lineHeight,
            letterSpacing,
          }),
          fontWeight: 700,
          textAlign: align,
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
          overflowWrap: "break-word",
        }}
      >
        {text}
      </Level>
    </div>
  ),
};

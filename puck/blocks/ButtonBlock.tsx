import type { ComponentConfig } from "@puckeditor/core";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ButtonBlockProps = StyleProps & {
  text: string;
  url: string;
  variant: "primary" | "secondary";
  align: "left" | "center" | "right";
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  fields: {
    text: { type: "text" },
    url: { type: "text" },
    variant: {
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
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
    ...styleFields,
  },
  defaultProps: {
    text: "Button",
    url: "",
    variant: "primary",
    align: "left",
    ...defaultStyleProps,
  },
  render: ({ text, url, variant, align, ...style }) => (
    <div
      style={{
        ...styleWrapperCss(style),
        display: "flex",
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      }}
    >
      <a
        href={url || "#"}
        style={{
          display: "inline-block",
          padding: "10px 22px",
          borderRadius: 6,
          fontSize: "0.95rem",
          fontWeight: 600,
          textDecoration: "none",
          background: variant === "primary" ? "#111" : "transparent",
          color: variant === "primary" ? "#fff" : "#111",
          border: variant === "secondary" ? "1px solid #111" : "none",
        }}
      >
        {text}
      </a>
    </div>
  ),
};

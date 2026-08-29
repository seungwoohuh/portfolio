import type { ComponentConfig } from "@puckeditor/core";

export type TextBlockProps = {
  text: string;
  size: "heading" | "body";
};

export const TextBlock: ComponentConfig<TextBlockProps> = {
  fields: {
    text: { type: "textarea" },
    size: {
      type: "select",
      options: [
        { label: "Heading", value: "heading" },
        { label: "Body", value: "body" },
      ],
    },
  },
  defaultProps: {
    text: "Text",
    size: "body",
  },
  render: ({ text, size }) => {
    if (size === "heading") {
      return <h2 style={{ fontSize: "2rem", fontWeight: 600 }}>{text}</h2>;
    }
    return <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>{text}</p>;
  },
};

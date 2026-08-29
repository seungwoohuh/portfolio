import type { ComponentConfig } from "@puckeditor/core";
import { ImageUploadField } from "../fields/ImageUploadField";

export type ImageBlockProps = {
  src?: string;
  alt: string;
};

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  fields: {
    src: {
      type: "custom",
      render: ImageUploadField,
    },
    alt: { type: "text" },
  },
  defaultProps: {
    src: undefined,
    alt: "",
  },
  render: ({ src, alt }) => {
    if (!src) {
      return (
        <div
          style={{
            border: "1px dashed #999",
            padding: "2rem",
            textAlign: "center",
            color: "#999",
          }}
        >
          이미지를 업로드하세요
        </div>
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} style={{ maxWidth: "100%" }} />;
  },
};

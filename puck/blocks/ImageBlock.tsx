import type { ComponentConfig } from "@puckeditor/core";
import { ImageUploadField } from "../fields/ImageUploadField";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ImageBlockProps = StyleProps & {
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
    ...styleFields,
  },
  defaultProps: {
    src: undefined,
    alt: "",
    ...defaultStyleProps,
  },
  render: ({ src, alt, ...style }) => (
    <div style={styleWrapperCss(style)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
      ) : (
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
      )}
    </div>
  ),
};

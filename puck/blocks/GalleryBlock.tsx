import type { ComponentConfig } from "@puckeditor/core";
import { ImageUploadField } from "../fields/ImageUploadField";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

type GalleryImage = {
  src?: string;
  alt: string;
};

export type GalleryBlockProps = StyleProps & {
  columns: number;
  images: GalleryImage[];
};

export const GalleryBlock: ComponentConfig<GalleryBlockProps> = {
  fields: {
    columns: { type: "number", min: 1, max: 5 },
    images: {
      type: "array",
      max: 20,
      getItemSummary: (item) => item.alt || "Image",
      defaultItemProps: { src: undefined, alt: "" },
      arrayFields: {
        src: { type: "custom", render: ImageUploadField },
        alt: { type: "text" },
      },
    },
    ...styleFields,
  },
  defaultProps: {
    columns: 3,
    images: [],
    ...defaultStyleProps,
  },
  render: ({ columns, images, ...style }) => (
    <div
      style={{
        ...styleWrapperCss(style),
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1rem",
      }}
    >
      {images.map((img, i) =>
        img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
          />
        ) : (
          <div
            key={i}
            style={{
              aspectRatio: "1 / 1",
              border: "1px dashed #999",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: "0.85rem",
            }}
          >
            empty
          </div>
        ),
      )}
    </div>
  ),
};

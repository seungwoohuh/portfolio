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
  gap: number;
  objectPosition: string;
  images: GalleryImage[];
};

const objectPositionOptions = [
  { label: "왼쪽 위", value: "left top" },
  { label: "위", value: "center top" },
  { label: "오른쪽 위", value: "right top" },
  { label: "왼쪽", value: "left center" },
  { label: "중앙", value: "center center" },
  { label: "오른쪽", value: "right center" },
  { label: "왼쪽 아래", value: "left bottom" },
  { label: "아래", value: "center bottom" },
  { label: "오른쪽 아래", value: "right bottom" },
];

export const GalleryBlock: ComponentConfig<GalleryBlockProps> = {
  fields: {
    columns: { type: "number", min: 1, max: 5 },
    gap: { type: "number", label: "이미지 간격 (px)", min: 0, max: 80 },
    objectPosition: {
      type: "select",
      label: "클리핑 기준 위치",
      options: objectPositionOptions,
    },
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
    gap: 16,
    objectPosition: "center center",
    images: [],
    ...defaultStyleProps,
  },
  render: ({ columns, gap = 16, objectPosition = "center center", images, ...style }) => (
    <div
      style={{
        ...styleWrapperCss(style),
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {images.map((img, i) =>
        img.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition }}
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

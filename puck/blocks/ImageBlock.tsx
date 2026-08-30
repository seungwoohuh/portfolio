import type { ComponentConfig } from "@puckeditor/core";
import { ImageUploadField } from "../fields/ImageUploadField";
import { numberField } from "../fields/NumberField";
import {
  styleFields,
  styleWrapperCss,
  defaultStyleProps,
  type StyleProps,
} from "../fields/styleFields";

export type ImageBlockProps = StyleProps & {
  src?: string;
  alt: string;
  width: number;
  height: number;
  objectFit: "cover" | "contain";
  objectPosition: string;
};

// "중앙" listed first so a Select field with no stored value (older items
// saved before this field existed) visually defaults to center, matching
// the actual defaultProps value new instances get.
const objectPositionOptions = [
  { label: "중앙", value: "center center" },
  { label: "왼쪽 위", value: "left top" },
  { label: "위", value: "center top" },
  { label: "오른쪽 위", value: "right top" },
  { label: "왼쪽", value: "left center" },
  { label: "오른쪽", value: "right center" },
  { label: "왼쪽 아래", value: "left bottom" },
  { label: "아래", value: "center bottom" },
  { label: "오른쪽 아래", value: "right bottom" },
];

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  fields: {
    src: {
      type: "custom",
      render: ImageUploadField,
    },
    alt: { type: "text" },
    width: numberField({ label: "너비 (%)", min: 5, max: 100 }),
    height: numberField({ label: "높이 px (0 = 원본 비율)", min: 0, max: 2000 }),
    objectFit: {
      type: "select",
      label: "높이 지정 시 채우기 방식",
      options: [
        { label: "채우기 (자르기)", value: "cover" },
        { label: "맞추기 (여백 허용)", value: "contain" },
      ],
    },
    objectPosition: {
      type: "select",
      label: "클리핑 기준 위치",
      options: objectPositionOptions,
    },
    ...styleFields,
  },
  defaultProps: {
    src: undefined,
    alt: "",
    width: 100,
    // A fixed default (rather than 0/"auto") keeps a newly inserted image's
    // frame stable instead of jumping to whatever aspect ratio the uploaded
    // photo happens to have — the user resizes deliberately from here.
    height: 360,
    objectFit: "cover",
    objectPosition: "center center",
    ...defaultStyleProps,
  },
  render: ({
    src,
    alt,
    width = 100,
    height = 0,
    objectFit = "cover",
    objectPosition = "center center",
    ...style
  }) => (
    <div style={styleWrapperCss(style)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            width: `${width}%`,
            height: height ? `${height}px` : "auto",
            objectFit: height ? objectFit : undefined,
            objectPosition: height ? objectPosition : undefined,
          }}
        />
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

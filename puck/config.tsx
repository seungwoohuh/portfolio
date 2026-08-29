import type { Config } from "@puckeditor/core";
import { HeadingBlock, type HeadingBlockProps } from "./blocks/HeadingBlock";
import {
  ParagraphBlock,
  type ParagraphBlockProps,
} from "./blocks/ParagraphBlock";
import { ButtonBlock, type ButtonBlockProps } from "./blocks/ButtonBlock";
import { ImageBlock, type ImageBlockProps } from "./blocks/ImageBlock";
import {
  ImageGridBlock,
  type ImageGridBlockProps,
} from "./blocks/ImageGridBlock";
import { GalleryBlock, type GalleryBlockProps } from "./blocks/GalleryBlock";
import { ColumnsBlock, type ColumnsBlockProps } from "./blocks/ColumnsBlock";
import { SectionBlock, type SectionBlockProps } from "./blocks/SectionBlock";
import { SpacerBlock, type SpacerBlockProps } from "./blocks/SpacerBlock";
import { DividerBlock, type DividerBlockProps } from "./blocks/DividerBlock";
import { EmbedBlock, type EmbedBlockProps } from "./blocks/EmbedBlock";

export type PortfolioComponents = {
  HeadingBlock: HeadingBlockProps;
  ParagraphBlock: ParagraphBlockProps;
  ButtonBlock: ButtonBlockProps;
  ImageBlock: ImageBlockProps;
  ImageGridBlock: ImageGridBlockProps;
  GalleryBlock: GalleryBlockProps;
  ColumnsBlock: ColumnsBlockProps;
  SectionBlock: SectionBlockProps;
  SpacerBlock: SpacerBlockProps;
  DividerBlock: DividerBlockProps;
  EmbedBlock: EmbedBlockProps;
};

export type PortfolioRootProps = {
  background: string;
  maxWidth: number;
};

type CategoryName = "layout" | "content" | "media";

export const config: Config<PortfolioComponents, PortfolioRootProps, CategoryName> = {
  root: {
    fields: {
      background: { type: "text" },
      maxWidth: { type: "number", min: 320, max: 1600 },
    },
    defaultProps: {
      background: "",
      maxWidth: 960,
    },
    render: ({ background, maxWidth = 960, children }) => (
      <div style={{ background: background || undefined }}>
        <div style={{ maxWidth: `${maxWidth}px`, margin: "0 auto" }}>
          {children}
        </div>
      </div>
    ),
  },
  categories: {
    layout: {
      title: "Layout",
      components: ["SectionBlock", "ColumnsBlock", "SpacerBlock", "DividerBlock"],
    },
    content: {
      title: "Content",
      components: ["HeadingBlock", "ParagraphBlock", "ButtonBlock"],
    },
    media: {
      title: "Media",
      components: ["ImageBlock", "ImageGridBlock", "GalleryBlock", "EmbedBlock"],
    },
  },
  components: {
    HeadingBlock,
    ParagraphBlock,
    ButtonBlock,
    ImageBlock,
    ImageGridBlock,
    GalleryBlock,
    ColumnsBlock,
    SectionBlock,
    SpacerBlock,
    DividerBlock,
    EmbedBlock,
  },
};

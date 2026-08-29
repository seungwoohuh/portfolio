import type { Config } from "@puckeditor/core";
import type { CSSProperties } from "react";
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
import { googleFontsHref } from "./fields/googleFonts";

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
  headingFont: string;
  bodyFont: string;
};

type CategoryName = "layout" | "content" | "media";

export const config: Config<PortfolioComponents, PortfolioRootProps, CategoryName> = {
  root: {
    fields: {
      background: { type: "text" },
      maxWidth: { type: "number", min: 320, max: 1600 },
      headingFont: {
        type: "text",
        label: "Heading font (Google Fonts name)",
      },
      bodyFont: {
        type: "text",
        label: "Body font (Google Fonts name)",
      },
    },
    defaultProps: {
      background: "",
      maxWidth: 960,
      headingFont: "",
      bodyFont: "",
    },
    render: ({ background, maxWidth = 960, headingFont, bodyFont, children }) => {
      const fontsHref = googleFontsHref([headingFont, bodyFont]);
      return (
        <div
          style={
            {
              background: background || undefined,
              "--font-heading": headingFont ? `"${headingFont}", sans-serif` : "inherit",
              "--font-body": bodyFont ? `"${bodyFont}", sans-serif` : "inherit",
            } as CSSProperties
          }
        >
          {fontsHref ? <link rel="stylesheet" href={fontsHref} /> : null}
          <div style={{ maxWidth: `${maxWidth}px`, margin: "0 auto" }}>
            {children}
          </div>
        </div>
      );
    },
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

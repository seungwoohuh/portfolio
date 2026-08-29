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
import {
  defaultTypographyTokens,
  tokenCssVars,
  typographyTokenField,
  type TypographyToken,
} from "./fields/typographyTokens";

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
  paddingX: number;
  paddingY: number;
  contentGap: number;
  h1: TypographyToken;
  h2: TypographyToken;
  h3: TypographyToken;
  body: TypographyToken;
};

type CategoryName = "layout" | "content" | "media";

export const config: Config<PortfolioComponents, PortfolioRootProps, CategoryName> = {
  root: {
    fields: {
      background: { type: "text" },
      maxWidth: { type: "number", min: 320, max: 1600 },
      paddingX: { type: "number", label: "좌우 여백 (px)", min: 0, max: 200 },
      paddingY: { type: "number", label: "상하 여백 (px)", min: 0, max: 200 },
      contentGap: {
        type: "number",
        label: "요소 간 자동 간격 (px)",
        min: 0,
        max: 160,
      },
      h1: typographyTokenField("H1"),
      h2: typographyTokenField("H2"),
      h3: typographyTokenField("H3"),
      body: typographyTokenField("Body"),
    },
    defaultProps: {
      background: "",
      maxWidth: 960,
      paddingX: 0,
      paddingY: 0,
      contentGap: 0,
      ...defaultTypographyTokens,
    },
    render: ({
      background,
      maxWidth = 960,
      paddingX = 0,
      paddingY = 0,
      contentGap = 0,
      h1 = defaultTypographyTokens.h1,
      h2 = defaultTypographyTokens.h2,
      h3 = defaultTypographyTokens.h3,
      body = defaultTypographyTokens.body,
      children,
    }) => {
      const fontsHref = googleFontsHref([h1.font, h2.font, h3.font, body.font]);
      return (
        <div
          style={
            {
              background: background || undefined,
              ...tokenCssVars("h1", h1),
              ...tokenCssVars("h2", h2),
              ...tokenCssVars("h3", h3),
              ...tokenCssVars("body", body),
            } as CSSProperties
          }
        >
          {fontsHref ? <link rel="stylesheet" href={fontsHref} /> : null}
          <div
            style={{
              maxWidth: `${maxWidth}px`,
              margin: "0 auto",
              padding: `${paddingY}px ${paddingX}px`,
              display: "flex",
              flexDirection: "column",
              gap: `${contentGap}px`,
            }}
          >
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

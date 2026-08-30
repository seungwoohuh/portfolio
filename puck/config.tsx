import type { Config } from "@puckeditor/core";
import { cloneElement, isValidElement, type CSSProperties, type ReactElement } from "react";
import { numberField } from "./fields/NumberField";
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
      maxWidth: numberField({ min: 320, max: 1600 }),
      paddingX: numberField({ label: "좌우 여백 (px)", min: 0, max: 200 }),
      paddingY: numberField({ label: "상하 여백 (px)", min: 0, max: 200 }),
      contentGap: numberField({ label: "요소 간 자동 간격 (px)", min: 0, max: 160 }),
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
      // Puck's root `children` resolves differently in the live editor
      // (wrapped in one real DropZone container div) vs. the published page
      // (a bare Fragment, no wrapper) — a plain flex+gap div around
      // `children` only ever sees ONE child in the editor, so the gap never
      // shows there. Cloning a `style` onto `children` reaches the actual
      // DropZone container in the editor (it merges the style itself); on
      // the published page the extra prop is simply ignored, so the outer
      // wrapper's own flex+gap (which works there, since Fragment flattens)
      // still applies.
      const gapStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: `${contentGap}px`,
      };
      const gappedChildren = isValidElement(children)
        ? cloneElement(children as ReactElement<{ style?: CSSProperties }>, {
            style: gapStyle,
          })
        : children;
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
              ...gapStyle,
            }}
          >
            {gappedChildren}
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

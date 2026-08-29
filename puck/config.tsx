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
  SpacerBlock: SpacerBlockProps;
  DividerBlock: DividerBlockProps;
  EmbedBlock: EmbedBlockProps;
};

export const config: Config<PortfolioComponents> = {
  components: {
    HeadingBlock,
    ParagraphBlock,
    ButtonBlock,
    ImageBlock,
    ImageGridBlock,
    GalleryBlock,
    ColumnsBlock,
    SpacerBlock,
    DividerBlock,
    EmbedBlock,
  },
};

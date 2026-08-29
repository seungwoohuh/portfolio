import type { Config } from "@puckeditor/core";
import { TextBlock, type TextBlockProps } from "./blocks/TextBlock";
import { ImageBlock, type ImageBlockProps } from "./blocks/ImageBlock";
import {
  ImageGridBlock,
  type ImageGridBlockProps,
} from "./blocks/ImageGridBlock";
import { EmbedBlock, type EmbedBlockProps } from "./blocks/EmbedBlock";

export type PortfolioComponents = {
  TextBlock: TextBlockProps;
  ImageBlock: ImageBlockProps;
  ImageGridBlock: ImageGridBlockProps;
  EmbedBlock: EmbedBlockProps;
};

export const config: Config<PortfolioComponents> = {
  components: {
    TextBlock,
    ImageBlock,
    ImageGridBlock,
    EmbedBlock,
  },
};

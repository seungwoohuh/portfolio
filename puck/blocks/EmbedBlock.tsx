import type { ComponentConfig } from "@puckeditor/core";

export type EmbedBlockProps = {
  url: string;
};

export const EmbedBlock: ComponentConfig<EmbedBlockProps> = {
  fields: {
    url: { type: "text" },
  },
  defaultProps: {
    url: "",
  },
  render: ({ url }) => {
    if (!url) {
      return (
        <div
          style={{
            border: "1px dashed #999",
            padding: "2rem",
            textAlign: "center",
            color: "#999",
          }}
        >
          임베드할 URL을 입력하세요
        </div>
      );
    }
    return (
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={url}
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
    );
  },
};

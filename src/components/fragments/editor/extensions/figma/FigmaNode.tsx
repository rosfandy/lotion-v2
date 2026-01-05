import React, { useCallback } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { startTransition } from "react";

export const FigmaNodeView = (props: NodeViewProps) => {
  const { node } = props;
  const { url, width, height, title, isEmbedded } = node.attrs;

  const updateAttributes = useCallback(
    (attrs: any) => {
      startTransition(() => {
        queueMicrotask(() => {
          props.updateAttributes(attrs);
        });
      });
    },
    [props]
  );

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateAttributes({ isEmbedded: true });
  };

  const nodeViewWrapperStyle: React.CSSProperties = {
    display: "inline-block",
    verticalAlign: "bottom",
    width: "100%",
  };

  const getOriginalUrl = (embedUrl: string) => {
    try {
      const urlMatch = embedUrl.match(/url=([^&]+)/);
      return urlMatch ? decodeURIComponent(urlMatch[1]) : embedUrl;
    } catch {
      return embedUrl;
    }
  };

  const originalUrl = getOriginalUrl(url);
  const displayUrl = originalUrl.replace(/^https?:\/\/(www\.)?/, "");

  // Bookmark Card View
  if (!isEmbedded) {
    return (
      <NodeViewWrapper style={nodeViewWrapperStyle}>
        <div
          style={{
            maxWidth: "400px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={handlePreviewClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{ marginRight: "8px", flexShrink: 0 }}
              >
                <path
                  d="M5 3.33333C5 2.41286 5.74619 1.66667 6.66667 1.66667H10C10.9205 1.66667 11.6667 2.41286 11.6667 3.33333V6.66667C11.6667 7.58714 10.9205 8.33333 10 8.33333H6.66667C5.74619 8.33333 5 7.58714 5 6.66667V3.33333Z"
                  fill="#F24E1E"
                />
                <path
                  d="M11.6667 3.33333C11.6667 2.41286 12.4129 1.66667 13.3333 1.66667H16.6667C17.5872 1.66667 18.3333 2.41286 18.3333 3.33333V6.66667C18.3333 7.58714 17.5872 8.33333 16.6667 8.33333H13.3333C12.4129 8.33333 11.6667 7.58714 11.6667 6.66667V3.33333Z"
                  fill="#FF7262"
                />
                <path
                  d="M5 10C5 9.07953 5.74619 8.33333 6.66667 8.33333H10C10.9205 8.33333 11.6667 9.07953 11.6667 10V13.3333C11.6667 14.2538 10.9205 15 10 15H6.66667C5.74619 15 5 14.2538 5 13.3333V10Z"
                  fill="#A259FF"
                />
                <path
                  d="M11.6667 10C11.6667 9.07953 12.4129 8.33333 13.3333 8.33333H16.6667C17.5872 8.33333 18.3333 9.07953 18.3333 10V13.3333C18.3333 14.2538 17.5872 15 16.6667 15H13.3333C12.4129 15 11.6667 14.2538 11.6667 13.3333V10Z"
                  fill="#1ABCFE"
                />
                <path
                  d="M5 16.6667C5 15.7462 5.74619 15 6.66667 15H10C10.9205 15 11.6667 15.7462 11.6667 16.6667C11.6667 17.5872 10.9205 18.3333 10 18.3333H6.66667C5.74619 18.3333 5 17.5872 5 16.6667Z"
                  fill="#0ACF83"
                />
              </svg>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1f2937",
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title || "Figma Design"}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {displayUrl}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #f3f4f6",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: "4px" }}
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Click to preview
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#ffffff",
                  backgroundColor: "#3b82f6",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: 500,
                }}
              >
                Preview
              </div>
            </div>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  // Embedded View (no highlight, no resize)
  return (
    <NodeViewWrapper style={nodeViewWrapperStyle}>
      <div
        style={{
          width: width ? `${width}px` : "400px",
          border: "1px solid #e5e7eb",
          maxWidth: "400px",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <iframe
          src={url}
          title={title || "Figma embed"}
          style={{
            width: width ? `${width}px` : "400px",
            height: height ? `${height}px` : "250px",
            border: "none",
            display: "block",
          }}
          loading="lazy"
        />

        {/* Fullscreen Button Overlay */}
        <button
          onClick={() => {
            const iframe = document.querySelector('iframe[src="' + url + '"]');
            if (iframe && iframe.requestFullscreen) {
              iframe.requestFullscreen();
            }
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            border: "none",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          }}
          title="Fullscreen"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>
    </NodeViewWrapper>
  );
};

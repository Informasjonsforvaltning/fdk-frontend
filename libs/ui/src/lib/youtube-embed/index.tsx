import React from "react";

import styles from "./youtube-embed.module.scss";

export type YoutubeEmbedProps = {
  url: string | undefined | null;
  title?: string;
};

const YOUTUBE_PATTERN =
  /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})/;

const YoutubeEmbed = ({ url, title = "YouTube-video" }: YoutubeEmbedProps) => {
  const embedId = url?.match(YOUTUBE_PATTERN)?.[1];

  if (!embedId) {
    return null;
  }

  return (
    <div className={styles.youtubeEmbed}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

export default YoutubeEmbed;

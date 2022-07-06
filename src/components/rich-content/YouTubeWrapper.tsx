import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubeWrapper(props: YouTubeProps) {
  return (
    <div className="rich-content">
      <YouTube {...props} />
    </div>
  );
}

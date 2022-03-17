import { useEffect, useState } from "react";

type ScreenSize = "small" | "medium";

export function useScreenSize(size: ScreenSize): boolean {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(getMediaQuery(size));
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, size]);

  return matches;
}

function getMediaQuery(size: ScreenSize): string {
  switch (size) {
    case "small":
      return "(max-width: 768px)";
    case "medium":
      return "(min-width: 769px)";
  }
}

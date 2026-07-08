import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll on route change (multi-page expectation).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

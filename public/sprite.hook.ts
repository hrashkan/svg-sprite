import { useEffect } from "react";

export function useSvgSprite() {
  useEffect(() => {
    const div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none"></svg>`;
    document.body.insertBefore(div, document.body.firstChild);
  }, []);
}
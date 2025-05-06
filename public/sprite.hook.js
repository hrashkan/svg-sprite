"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSvgSprite = useSvgSprite;
const react_1 = require("react");
function useSvgSprite() {
    (0, react_1.useEffect)(() => {
        const div = document.createElement("div");
        div.style.display = "none";
        div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none"></svg>`;
        document.body.insertBefore(div, document.body.firstChild);
    }, []);
}

"use strict";

const renewalUi = () => {
  const contentTab = document.querySelector("#divContentTab");
  const menuTree = document.querySelector("#divOpenMenu");
  const getWidth = () => {
    if (contentTab) {
      const maxW = contentTab.clientWidth;
      const maxH = contentTab.querySelector(".ui-tabs-nav").clientHeight;
      const tabs = contentTab.querySelectorAll(".ui-tabs-nav li");
      let tabW = 0;
      for (const item of tabs) {
        tabW += item.clientWidth
      }
      console.log(maxH);
      if (tabW > (maxW - 100)) {
        for (const item of tabs) {
          const a = item.querySelector("a");
          const w = (maxW - 100) / tabs.length;
          item.style.width = `${w}px`;
          a.style.width = `${w - 60}px`;
          a.style.overflow = "hidden";
          a.style.whiteSpace = "nowrap";
          a.style.textOverflow = "ellipsis";
          a.style.wordBreak = "break-all";
          // if (maxH > 46) {
          //   a.style.display = "none";
          // } 
        }
        console.log(maxW);
        console.log(tabW);
      }
    }
  }

  if (menuTree) {
    const menus = menuTree.querySelectorAll(".file");
    for (const item of menus) {
      item.addEventListener("click", () => {
        setTimeout(() => {
          getWidth();
        }, 0);
      })
    }
  }
}
renewalUi();
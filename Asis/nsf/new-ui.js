"use strict";

const renewalUi = () => {
  const contentTab = document.querySelector("#divContentTab");
  const menuTree = document.querySelector("#divOpenMenu");
  const btnLeft = document.querySelector(".btn-tab-left");
  const btnRight = document.querySelector(".btn-tab-right");
  let active;
  
  const getWidth = () => {
    if (contentTab) {
      active = document.querySelector(".main-tab-wrap .ui-state-active");
      active.focus();
    }
  }
  
  btnLeft.addEventListener("click", () => {
    active = document.querySelector(".main-tab-wrap .ui-state-active");
    const normal = document.querySelectorAll(".main-tab-wrap .ui-state-default");
    const label = active.getAttribute("aria-labelledby");
    const split = label.split("-");
    // const last = (label.charAt(label.length - 1) * 1) - 1;
    const last = (split[2] * 1) - 1;
    if (last >= 4) {
      const backTarget = document.querySelector(`.main-tab-wrap [aria-labelledby=ui-id-${last}]`);
      console.log(label);
      console.log(split);
      console.log(last);
      console.log(backTarget);
      backTarget.focus();
      for (const item of normal) {
        item.classList.remove("ui-state-active");
      }
      backTarget.classList.add("ui-state-active");
    }
  })

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
































































































































































const renewalUi22 = () => {
  const contentTab = document.querySelector("#divContentTab");
  const menuTree = document.querySelector("#divOpenMenu");
  const btnLeft = document.querySelector(".btn-tab-left");
  const btnRight = document.querySelector(".btn-tab-right");
  let lastTab;
  const getWidth = () => {
    if (contentTab) {
      const maxW = contentTab.clientWidth;
      const tabs = contentTab.querySelectorAll(".ui-tabs-nav li");
      let tabW = 0;
      for (const item of tabs) {
        // tabW += item.clientWidth
        lastTab = item;
      }
      console.log(lastTab);
      lastTab.focus();
      // if (tabW > (maxW - 100)) {
      //   for (const item of tabs) {
      //     const a = item.querySelector("a");
      //     const w = (maxW - 100) / tabs.length;
      //     item.style.width = `${w}px`;
      //     a.style.width = `${w - 60}px`;
      //     a.style.overflow = "hidden";
      //     a.style.whiteSpace = "nowrap";
      //     a.style.textOverflow = "ellipsis";
      //     a.style.wordBreak = "break-all";
      //     // if (maxH > 46) {
      //     //   a.style.display = "none";
      //     // } 
      //   }
      // }
    }
  }
  
  btnLeft.addEventListener("click", () => {
    const normal = document.querySelectorAll(".main-tab-wrap .ui-state-default");
    const active = document.querySelector(".main-tab-wrap .ui-state-active");
    const label = active.getAttribute("aria-labelledby");
    const split = label.split("-");
    // const last = (label.charAt(label.length - 1) * 1) - 1;
    const last = (split[2] * 1) - 1;
    if (last >= 4) {
      const backTarget = document.querySelector(`.main-tab-wrap [aria-labelledby=ui-id-${last}]`);
      console.log(label);
      console.log(split);
      console.log(last);
      console.log(backTarget);
      backTarget.focus();
      for (const item of normal) {
        item.classList.remove("ui-state-active");
      }
      backTarget.classList.add("ui-state-active");
    }
  })

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
"use strict";

const renewalUi = () => {
  const mainTab = document.querySelector(".main-tab-wrap > ul");
  const btnLeft = document.querySelector(".btn-tab-left");
  const btnRight = document.querySelector(".btn-tab-right");

  btnLeft.addEventListener("click", () => {
    let pos = mainTab.scrollLeft;
    pos -= 200
    mainTab.scrollTo({
      top: 0,
      left: pos,
      behavior: "smooth"
    })
  });
  btnRight.addEventListener("click", () => {
    let pos = mainTab.scrollLeft;
    pos += 200
    mainTab.scrollTo({
      top: 0,
      left: pos,
      behavior: "smooth"
    })
  });
};
renewalUi();

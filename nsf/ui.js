"use strict";

class TreeNode {
  constructor(label, idx, children = [], depth = 1) {
    // console.log(label);
    // console.log(children);
    this.label = label;
    this.idx = idx;
    this.children = children.map(child => {
      if (child instanceof TreeNode) {
        return child;
      } else {
        return new TreeNode(child.label, child.idx, child.children, depth + 1);
      }
    });
    this.depth = depth;
  }

  addChild(child) {
    this.children.push(child);
  }

  render() {
    const classNames = `depth-${this.depth}`;
    const idxNames = `${this.idx}`;

    if (this.children.length === 0) {
      return `<li class="${classNames} tree-page"><span id="${idxNames}">${this.label}</span></li>`;
    }

    const childNodes = this.children.map(child => child.render()).join("");
    return `
      <li class="${classNames} tree-toggle">
        <span id="${idxNames}">${this.label}</span>
        <ul class="hide">${childNodes}</ul>
      </li>
    `;
  }
}

function generateTree(menu) {
  if (Array.isArray(menu)) {
    // console.log(menu)
    return menu.map(item => new TreeNode(item.label, item.idx, item.children));
  } else if (typeof menu === "object" && menu !== null) {
    // 오브젝트형 데이터일때 실행되는 함수
    // return new TreeNode(menu.label, menu.children);
    const root = new TreeNode(menu.label, menu.idx, menu.children);
    return [root]; // Wrap the root node in an array
  } else {
    throw new Error("Invalid menu format");
  }
}

const menuData = [
  { label: "depthA-1", idx:"a1", children: [
    { label: "depth2", idx:"a2", children: [
      { label: "공통번호등록", idx:"a3", },
      { label: "부가세신고서작성", idx:"a4", },
      { label: "결의전표승인신규", idx:"a5", }
    ]},
    { label: "depth2", idx:"a6", children: [
      { label: "공지사항", idx:"a7", },
      { label: "국세청PDF자료등록2022", idx:"a8", }
    ]}
  ]},
  { label: "depthA-2", idx:"a9", children: [
    { label: "공지사항_1", idx:"a10", },
    { label: "depth2", idx:"a12", children: [
      { label: "개인별급여내역조정", idx:"a13", },
      { label: "인사자료등록", idx:"a14", }
    ]}
  ]},
  { label: "login", idx:"a15", },
];
const tree = generateTree(menuData);
const menuElement = document.querySelector(".nsf-tree");
// menuElement.innerHTML = `<ul>${tree.map(item => item.render()).join("")}</ul>`;
menuElement.innerHTML = `<ul>${tree.map((item) => {return item.render()}).join("")}</ul>`;



// 탬생성
const makeTab = (idx, label) => {
  const tabs = document.querySelectorAll(".nsf-tab-panel");
  const tabchk = document.querySelector(`.nsf-tab-panel#${idx}`);
  for (const item of tabs) {
    item.classList.add("hide");
  }
  console.log(tabchk);
  if (tabchk) {
    tabchk.classList.remove("hide");
    return
  } else {
    // 탭리스트 생성
    const tabList = document.querySelector(".nsf-tablist");
    let tabNav = document.createElement('li');
    tabNav.innerHTML = `
      <button type="button" class="tab-nav" id="tab-${idx}" data-tab-target="#panel-${idx}" role="tab"><span>${label}</span></button>
      <button type="button" class="tab-nav-close">x</button>
    `;
    tabList.appendChild(tabNav);
    // 탭패널 생성
    const tabContents = document.querySelector(".nsf-main-tab-contents");
    const tabPannel = document.createElement('div');
    tabPannel.classList.add("nsf-tab-panel");
    tabPannel.setAttribute("id", `panel-${idx}`);
    tabPannel.setAttribute("aria-labelledby", `tab-${idx}`);
    tabPannel.setAttribute("role", `tabpanel`);
    // tabPannel.textContent = idx;
    // tabPannel.innerHTML = `<iframe src="./${idx}.html" id="" name="" width="100%" height="100%"></iframe>`
    tabPannel.innerHTML = `${label}`
    tabContents.appendChild(tabPannel);
  }


}

// 작동
const nav = menuElement.querySelector("ul")
nav.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(e.target.closest("li"));
  console.log(e.target.closest("li").querySelector("ul"));
  const li = e.target.closest("li");
  const ul = e.target.closest("li").querySelector("ul");
  if (ul) {
    ul.classList.toggle("hide");
  }
  if (li.classList.contains("tree-page")) {
    makeTab(e.target.id, e.target.textContent);
    // makeTab(e.target.textContent);
    console.log(e.target.id);
  }
})


// test
const tabIntro = document.querySelector("#tab-intro");
let tabButtons = document.querySelectorAll(".nsf-tablist button.tab-nav");
let tabClose = document.querySelectorAll(".nsf-tablist button.tab-nav-close");
tabIntro.addEventListener("click", () => {
  tabButtons = document.querySelectorAll(".nsf-tablist button.tab-nav");
  tabClose = document.querySelectorAll(".nsf-tablist button.tab-nav-close");
  console.log(tabButtons);
  testtab();
})
const testtab = () => {
  for (const item of tabButtons) {
    item.addEventListener("click", () => {
      console.log(item.innerHTML);
    })
  }
  for (const item of tabClose) {
    item.addEventListener("click", () => {
      // const target = item.closest("li").querySelector("button.tab-nav");
      const target = item.closest("li");
      const target2 = document.querySelector(target.querySelector("button.tab-nav").dataset.tabTarget);
      console.log(`닫기 ${target.innerHTML}`);
      console.log(target2);
      // target.classList.add("hide");
      // target2.classList.add("hide");
    })
  }
}
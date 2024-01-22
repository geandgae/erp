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
const generateTree = (menu) => {
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
  { label: "intro", idx:"intro", },
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
    { label: "공지사항_1", idx:"notice", },
    { label: "depth2", idx:"a12", children: [
      { label: "개인별급여내역조정", idx:"a13", },
      { label: "인사자료등록", idx:"a14", }
    ]}
  ]},
  { label: "login", idx:"login", },
];
const tree = generateTree(menuData);
const menuElement = document.querySelector(".nsf-tree");
menuElement.innerHTML = `<ul>${tree.map((item) => {return item.render()}).join("")}</ul>`;


// 배열생성
let tabArray = [];
const makeArray = (idx, label) => {
const index = tabArray.findIndex(i => i.id === idx);
  if (index === -1) {
    tabArray.push(
      {
        id : idx,
        name : label,
      }
    )
  }
  // console.log(tabArray);
  makeTab(idx);
}

// 배열제거
const deleteArray = (id) => {
  tabArray.forEach((item, index)=> {
    if(item.id === id) {
      tabArray.splice(index, 1);
    }
  });
  // console.log(tabArray);
  makeTab();
}

// 탭생성
const makeTab = () => {
  const tabList = document.querySelector(".nsf-tablist");
  const tabContents = document.querySelector(".nsf-main-tab-contents");
  tabList.innerHTML = "";
  tabList.innerHTML += `
  <li class="active"><button type="button" class="tab-nav" id="tab-intro" data-tab-target="#panel-intro" role="tab"><span>intro</span></button></li>
  `;
  tabContents.innerHTML = "";
  tabContents.innerHTML += 
  `
  <div class="nsf-tab-panel active" id="panel-intro" aria-labelledby="tab-intro" role="tabpanel" >
    intro
    <!-- <iframe src="./공지사항.html" id="" name="" width="100%" height="100%">
    </iframe> -->
  </div>
  `;
  for (const item of tabArray) {
    // tabList
    tabList.innerHTML += 
    `
    <li>
      <button type="button" class="tab-nav" id="tab-${item.id}" data-tab-target="#panel-${item.id}" role="tab"><span>${item.name}</span></button>
      <button type="button" class="tab-nav-close">x</button>
    </li>
    `;
    // tabpanel
    tabContents.innerHTML +=
    `
    <div class="nsf-tab-panel" id="panel-${item.id}" aria-labelledby="tab-${item.id}" role="tabpanel" >
      ${item.name}
    </div>
    `;
  }
  makeEvent();
}

// 탭이벤트생성
const makeEvent = () => {
  const tabNavs = document.querySelectorAll(".nsf-tablist > li");
  const tabPanels = document.querySelectorAll(".nsf-tab-panel");
  for (const item of tabNavs) {
    const btn = item.querySelector(".tab-nav");
    if (btn) {
      btn.addEventListener("click", () => {
        tabNavs.forEach((el)=> {
          el.classList.remove("active");
        });
        item.classList.add("active");
        tabPanels.forEach((el)=> {
          el.classList.remove("active");
        });
        const activePanel = document.querySelector(btn.dataset.tabTarget);
        activePanel.classList.add("active");
      });
    }
  }
}

// 상태업데이트
const updateState = (id) => {
  const tabNavs = document.querySelectorAll(".nsf-tablist > li");
  const tabPanels = document.querySelectorAll(".nsf-tab-panel");
  tabNavs.forEach((el)=> {
    el.classList.remove("active");
  });
  tabPanels.forEach((el)=> {
    el.classList.remove("active");
  });
  const activeTabNav = document.querySelector(`#tab-${id}`).closest("li");
  const activeTabPanel = document.querySelector(`#panel-${id}`);
  activeTabNav.classList.add("active");
  activeTabPanel.classList.add("active");
}

// 메뉴클릭
const nav = menuElement.querySelector("ul")
nav.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const ul = e.target.closest("li").querySelector("ul");
  if (ul) {
    ul.classList.toggle("hide");
  }
  if (li.classList.contains("tree-page")) {
    makeArray(e.target.id, e.target.textContent);
    updateState(e.target.id);
    tabScroll();
  }
})


// tabScroll
const tabScroll = () => {
  const parent = document.querySelector(".nsf-tablist");
  const target = document.querySelector(".nsf-tablist .active");
  const parentLeft = parent.getBoundingClientRect().width;
  const targetLeft = target.getBoundingClientRect().left;
  const pos = Math.round((targetLeft - parentLeft) + parent.scrollLeft);

  parent.scrollTo({
    top: 0,
    left: pos,
    behavior: "smooth"
  })
}
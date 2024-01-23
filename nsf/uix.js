"use strict";

class TreeNode {
  constructor(label, idx, children = [], depth = 1) {
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
        <ul class="folded">${childNodes}</ul>
      </li>
    `;
  }
}
const generateTree = (menu) => {
  if (Array.isArray(menu)) {
    return menu.map(item => new TreeNode(item.label, item.idx, item.children));
  } else {
    throw new Error("error");
  }
}
const menuData = [
  { label: "depthA-1", idx:"a1", children: [
    { label: "depth2", idx:"a2", children: [
      { label: "0공통번호등록", idx:"a3", },
      { label: "0부가세신고서작성", idx:"a4", },
      { label: "0결의전표승인신규", idx:"a5", }
    ]},
    { label: "depth2", idx:"a6", children: [
      { label: "0공지사항", idx:"a7", },
      { label: "0국세청PDF자료등록2022", idx:"a8", }
    ]}
  ]},
  { label: "depthA-2", idx:"a9", children: [
    { label: "0공지사항_1", idx:"notice", },
    { label: "depth2", idx:"a12", children: [
      { label: "0개인별급여내역조정", idx:"a13", },
      { label: "0인사자료등록", idx:"a14", }
    ]}
  ]},
  { label: "0login", idx:"login", },
];
const tree = generateTree(menuData);
const menuElement = document.querySelector(".nsf-tree .nsf-gnb-menu");
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
  for (const item of tabNavs) {
    const btn = item.querySelector(".tab-nav");
    const close = item.querySelector(".tab-nav-close");
    if (btn) {
      btn.addEventListener("click", () => {
        const id = btn.id.split("-")[1]
        tabScroll();
        updateState(id);
      });
    }
    if(close) {
      close.addEventListener("click", () => {
        const val = close.closest("li").querySelector("button.tab-nav").id.split("-")[1];
        const prev = close.closest("li");
        const prevActive = close.closest("li").previousElementSibling.querySelector("button.tab-nav").id.split("-")[1];
        const active = document.querySelector(".nsf-tablist li.active button.tab-nav").id.split("-")[1];
        deleteArray(val);
        if (prev.classList.contains("active")) {
          updateState(prevActive);
        } else {
          updateState(active);
        }
      });
    }
  }
}

// 상태업데이트
const gnbTree = document.querySelectorAll(".nsf-gnb-menu .tree-page span");
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

  const activeGnb = document.querySelector(`#${id}`);
  gnbTree.forEach(el => {
    el.classList.remove("active");
  });
  if (activeGnb) {
    activeGnb.classList.add("active");
  }
}

// 메뉴클릭
const gnbNav = document.querySelector(".nsf-tree .nsf-gnb-menu ul");
gnbNav.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const ul = e.target.closest("li").querySelector("ul");
  if (ul) {
    ul.classList.toggle("folded");
  }
  if (li.classList.contains("tree-page")) {
    makeArray(e.target.id, e.target.textContent);
    updateState(e.target.id);
    tabScroll();
  }
})
const gnbIntro = document.querySelector(".nsf-tree .gnb-intro");
gnbIntro.addEventListener("click", () => {
  updateState("intro");
  tabScroll();
})

// tabCtrl
const tabCtrl = () => {
  const btnReset = document.querySelector(".nsf-tabctrl .tab-reset");
  btnReset.addEventListener("click", () => {
    if (tabArray.length > 0) {
      const toggles = document.querySelectorAll(".tree-toggle > ul");
      tabArray = [];
      makeTab();
      gnbTree.forEach(el => {
        el.classList.remove("active");
      });
      toggles.forEach(el => {
        el.classList.add("folded");
      });
    }
  })
  const parent = document.querySelector(".nsf-tablist");
  const btnPrev = document.querySelector(".nsf-tabctrl .tab-prev");
  const btnNext = document.querySelector(".nsf-tabctrl .tab-next");
  btnPrev.addEventListener("click", () => {
    let pos = parent.scrollLeft;
    pos -= 100
    parent.scrollTo({
      top: 0,
      left: pos,
      behavior: "smooth"
    })
  })
  btnNext.addEventListener("click", () => {
    let pos = parent.scrollLeft;
    pos += 100
    parent.scrollTo({
      top: 0,
      left: pos,
      behavior: "smooth"
    })
  })
}
tabCtrl();

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

// gnbTabs
const nsfGnbTabs = () => {
  const gnbTabs = document.querySelectorAll(".nsf-gnb-tabs button");
  const gnbPanel = document.querySelectorAll(".nsf-gnb-panel");
  for (const item of gnbTabs) {
    item.addEventListener("click", () => {
      gnbTabs.forEach(el => {
        el.classList.remove("active");
      });
      item.classList.add("active");
      gnbPanel.forEach(el => {
        el.classList.add("hide");
      });
      document.querySelector(`.nsf-gnb-panel.${item.id}`).classList.remove("hide");
    })
  }
}
nsfGnbTabs();

// gnbSearch
const gnbSearch = () => {
  const searchInput = document.querySelector(".search-menu-header input[name=menuSearch]");
  const searchBtn = document.querySelector(".search-menu-header button.gnb-search");
  const searchBody = document.querySelector(".search-menu-body");
  searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
      searchBody.innerHTML = `<div class="search-log">검색어없음</div>`;
      return;
    }
    searchBody.innerHTML = "";
    for (const item of gnbTree) {
      const itemText = item.textContent.toLowerCase();
      if (itemText.includes(searchTerm)) {
        const searchNav = document.createElement("div");
        searchNav.setAttribute("data-search-id", item.id);
        searchNav.classList.add("search-result-nav");
        searchNav.innerHTML = item.textContent;
        searchBody.appendChild(searchNav);
      }
    }
    // 결과없음
    const newNav = document.querySelectorAll(".search-menu-body .search-result-nav");
    if (newNav.length === 0) {
      searchBody.innerHTML = `<div class="search-log">결과없음</div>`;
    } else {
      searchBody.addEventListener("click", (e) => {
        const folded = document.querySelectorAll(".nsf-gnb-menu .folded");
        if (folded.length > 0) {
          folded.forEach(el => {
            el.classList.remove("folded");
          });
        }
        makeArray(e.target.dataset.searchId, e.target.textContent);
        updateState(e.target.dataset.searchId);
        tabScroll();
      })
    }
  })
}
gnbSearch();

// favorite
const favorite = () => {
  let saveValue = [];
  if (localStorage.length === 0) {
    localStorage.setItem("key", JSON.stringify(saveValue));
  }
  let output = localStorage.getItem("key");		
  localStorage.setItem("key", JSON.stringify(saveValue)); 
  saveValue = JSON.parse(output);
  const favoriteBtn = document.querySelector(".favorite-header button.gnb-favorite");
  const favoriteBody = document.querySelector(".favorite-body");
  const makeList = () => {
    for (const item of saveValue) {
      const list = document.createElement("div");
      list.classList.add("favorit-list");
      list.innerHTML = `
        <span data-favorit-id="${item.id}">${item.name}</span>
        <button type="button" class="del-favorite">del</button>
      `;
      favoriteBody.appendChild(list);
    }
  }
  makeList();
  favoriteBtn.addEventListener("click", () => {
    favoriteBody.innerHTML = "";
    const active = gnbNav.querySelector(".tree-page .active");
    if (active) {
      const idx = active.id
      const text = active.textContent;
      if (saveValue.findIndex(i => i.id === idx) === -1) {
        saveValue.push({ id : idx, name : text, });
      }
      localStorage.setItem("key", JSON.stringify(saveValue)); 
      makeList();
    }
  })
  favoriteBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-favorite")) {
      const delId = e.target.closest(".favorit-list").querySelector("span").dataset.favoritId;
      saveValue.forEach((item, index)=> {
        if(item.id === delId) {
          saveValue.splice(index, 1);
        }
      });
      favoriteBody.innerHTML = "";
      localStorage.setItem("key", JSON.stringify(saveValue)); 
      makeList();
    } else {
      const folded = document.querySelectorAll(".nsf-gnb-menu .folded");
        if (folded.length > 0) {
          folded.forEach(el => {
            el.classList.remove("folded");
          });
        }
        makeArray(e.target.dataset.favoritId, e.target.textContent);
        updateState(e.target.dataset.favoritId);
        tabScroll();
    }
  })
}
favorite();
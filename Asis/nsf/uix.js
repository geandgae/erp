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

    // const root = new TreeNode(menu.label);
    // if (Array.isArray(menu.children)) {
    //   root.children = menu.children.map(child => generateTree(child)[0]); // Recursive call
    // }
    // return [root]; // Wrap the root node in an arra
  } else {
    throw new Error("Invalid menu format");
  }
}

const menuData = [
  { label: "depthA-1", idx:"a1", children: [
    { label: "depth2", idx:"a2", children: [
      { label: "depth3", idx:"a3", },
      { label: "depth3", idx:"a4", },
      { label: "depth3", idx:"a5", }
    ]},
    { label: "depth2", idx:"a6", children: [
      { label: "depth3", idx:"a7", },
      { label: "depth3", idx:"a8", }
    ]}
  ]},
  { label: "depthA-2", idx:"a9", children: [
    { label: "depth2", idx:"a10", },
    { label: "depth2", idx:"a12", children: [
      { label: "depth3", idx:"a13", },
      { label: "depth3", idx:"a14", }
    ]}
  ]},
  { label: "depthA-3", idx:"a15", },
];

// const menuData = {
//   label: 'Root',
//   children: [
//     { label: 'Node 1' },
//     { label: 'Node 2', children: [
//       { label: 'Node 2.1' },
//       { label: 'Node 2.2' }
//     ]}
//   ]
// };

const tree = generateTree(menuData);
const menuElement = document.querySelector(".nsf-tree");
// menuElement.innerHTML = `<ul>${tree.map(item => item.render()).join("")}</ul>`;
menuElement.innerHTML = `<ul>${tree.map((item) => {return item.render()}).join("")}</ul>`;

// 작동부
const nav = menuElement.querySelector("ul")
nav.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(e.target.closest("li"));
  console.log(e.target.closest("li").querySelector("ul"));
  const ul = e.target.closest("li").querySelector("ul");
  if (ul) {
    ul.classList.toggle("hide");
  }
})
















// map
// const array1 = [1, 4, 9, 16];
// const map1 = array1.map((x) => x * 2);
// console.log(map1);
// Expected output: Array [2, 8, 18, 32]

const arrt = [1, 4, 9, 16];

const test = arrt.map((el) => {return el * 3});
const test2 = arrt.map(el => el * 3);
// console.log(test);
// console.log(test2);

let arr = [2, 3, 5, 7]
// arr.map(function(element, index, array){  }, this);
arr.map(function(element, index, array){
	// console.log(this) // 80
}, 80);
arr.map(function(element, index, array){
  // console.log(element);
  // console.log(index);
  // console.log(array);
  // return element;
}, 80);

// 트리메뉴 참조
// https://www.w3schools.com/howto/howto_js_treeview.asp

// 재귀 https://data-marketing-bk.tistory.com/27
function factorial(n) {
  // 기본 종료 조건
  if (n <= 1) {
    return 1;
  } else {
    // 재귀 호출
    return n * factorial(n - 1);
  }
}

// 예제: 5! 계산
const result = factorial(5);
console.log(result); // 출력: 120

// https://sora9z.tistory.com/73 꼬리재귀
// // Basic Recursion
// int factorial(int n, int total) { 
//   if (n === 1) { 
//       return 1; 
//   } 
//   return n * factorial(n-1);
// }

// // Tail Recursion
// int factorial(int n, total) {
//   if (n === 1) { 
//       return 1; 
//   } 
//   return factorial(n - 1, n * total);
// }
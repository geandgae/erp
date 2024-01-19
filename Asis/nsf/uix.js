"use strict";
class TreeNode {
  constructor(label, children = [], depth = 1) {
    console.log(label);
    console.log(children);
    this.label = label;
    this.children = children.map(child => {
      if (child instanceof TreeNode) {
        return child;
      } else {
        return new TreeNode(child.label, child.children, depth + 1);
      }
    });
    this.depth = depth;
  }

  addChild(child) {
    this.children.push(child);
  }

  render() {
    const classNames = `depth-${this.depth}`;

    if (this.children.length === 0) {
      return `<li class="${classNames}"><span>${this.label}</span></li>`;
    }

    const childNodes = this.children.map(child => child.render()).join("");
    return `
      <li class="${classNames}">
        <span>${this.label}</span>
        <ul>${childNodes}</ul>
      </li>
    `;
  }
}

function generateTree(menu) {
  if (Array.isArray(menu)) {
    // console.log(menu)
    return menu.map(item => new TreeNode(item.label, item.children));
  } else if (typeof menu === "object" && menu !== null) {
    // 오브젝트형 데이터일때 실행되는 함수
    // return new TreeNode(menu.label, menu.children);
    const root = new TreeNode(menu.label, menu.children);
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
  { label: "depthA-1", children: [
    { label: "depth2" , children: [
      { label: "depth3" },
      { label: "depth3" },
      { label: "depth3" }
    ]},
    { label: "depth2", children: [
      { label: "depth3" },
      { label: "depth3" }
    ]}
  ]},
  { label: "depthA-2", children: [
    { label: "depth2" , children: [
      { label: "depth3" }
    ]},
    { label: "depth2", children: [
      { label: "depth3" },
      { label: "depth3" }
    ]}
  ]},
  { label: "depthA-3" },
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

const menuElement = document.querySelector(".nsf-tree > ul");
menuElement.innerHTML = `<ul>${tree.map(node => node.render()).join("")}</ul>`;

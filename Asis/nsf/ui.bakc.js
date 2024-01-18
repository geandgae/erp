"use strict";

const gnbTree = () => {
  // const menu = [

  // ];
  // const tree = document.querySelector(".nsf-tree");
  // console.log(tree);

  // 뎁스 추가 전
  // class TreeNode {
  //   constructor(label, children = []) {
  //     this.label = label;
  //     this.children = children.map((child) => {
  //       if (child instanceof TreeNode) {
  //         return child;
  //       } else {
  //         return new TreeNode(child.label, child.children);
  //       }
  //     });
  //   }

  //   addChild(child) {
  //     this.children.push(child);
  //   }

  //   render() {
  //     if (this.children.length === 0) {
  //       return `<li><span>${this.label}</span></li>`;
  //     }

  //     const childNodes = this.children.map((child) => child.render()).join("");
  //     return `
  //       <li>
  //         <span>${this.label}</span>
  //         <ul>${childNodes}</ul>
  //       </li>
  //     `;
  //   }
  // }

  // function generateTree(menu) {
  //   if (Array.isArray(menu)) {
  //     return new TreeNode(
  //       "Root",
  //       menu.map((item) => new TreeNode(item.label, item.children))
  //     );
  //   } else if (typeof menu === "object" && menu !== null) {
  //     return new TreeNode(menu.label, menu.children);
  //   } else {
  //     throw new Error("Invalid menu format");
  //   }
  // }

  // 뎁스 추가
  // class TreeNode {
  //   constructor(label, children = [], depth = 1) {
  //     this.label = label;
  //     this.children = children.map((child) => {
  //       if (child instanceof TreeNode) {
  //         return child;
  //       } else {
  //         return new TreeNode(child.label, child.children, depth + 1);
  //       }
  //     });
  //     this.depth = depth;
  //   }

  //   addChild(child) {
  //     this.children.push(child);
  //   }

  //   render() {
  //     const classNames = `depth-${this.depth}`;

  //     if (this.children.length === 0) {
  //       return `<li class="${classNames}"><span>${this.label}</span></li>`;
  //     }

  //     const childNodes = this.children.map((child) => child.render()).join("");
  //     return `
  //       <li class="${classNames}">
  //         <span>${this.label}</span>
  //         <ul>${childNodes}</ul>
  //       </li>
  //     `;
  //   }
  // }

  // function generateTree(menu) {
  //   if (Array.isArray(menu)) {
  //     return new TreeNode(
  //       "Root",
  //       menu.map((item) => new TreeNode(item.label, item.children, 1))
  //     );
  //   } else if (typeof menu === "object" && menu !== null) {
  //     return new TreeNode(menu.label, menu.children, 1);
  //   } else {
  //     throw new Error("Invalid menu format");
  //   }
  // }

  class TreeNode {
    constructor(label, children = [], depth = 0, isOpen = false) {
      this.label = label;
      this.children = children.map((child) => {
        if (child instanceof TreeNode) {
          return child;
        } else {
          return new TreeNode(child.label, child.children, depth + 1);
        }
      });
      this.depth = depth;
      this.isOpen = isOpen;
    }

    addChild(child) {
      this.children.push(child);
    }

    toggle() {
      this.isOpen = !this.isOpen;
    }

    render() {
      const classNames = `depth-${this.depth} ${this.isOpen ? "open" : "closed"}`;

      let childNodes = "";
      if (this.children.length > 0) {
        childNodes = `<ul>${this.children.map((child) => child.render()).join("")}</ul>`;
      }

      return `
        <li class="${classNames}">
          <span class="toggle" onclick="treeNodeClicked(${this.depth})">${this.label}</span>
          ${childNodes}
        </li>
      `;
    }
  }

  function generateTree(menu) {
    if (Array.isArray(menu)) {
      return new TreeNode(
        "Root",
        menu.map((item) => new TreeNode(item.label, item.children, 1))
      );
    } else if (typeof menu === "object" && menu !== null) {
      return new TreeNode(menu.label, menu.children, 1);
    } else {
      throw new Error("Invalid menu format");
    }
  }

  function treeNodeClicked(depth) {
    tree.toggleNode(depth);
    const menuElement = document.getElementById("menu");
    menuElement.innerHTML = tree.render();
  }

  TreeNode.prototype.toggleNode = function (depth) {
    if (this.depth === depth) {
      this.toggle();
    } else {
      this.children.forEach((child) => child.toggleNode(depth));
    }
  };

  // data
  const menuData = [
    { label: "Node 1" },
    {
      label: "Node 2",
      children: [{ label: "Node 2.1" }, { label: "Node 2.2", children: [{ label: "Node 2.2.1" }, { label: "Node 2.2.2" }] }],
    },
    { label: "Node 3" },
  ];
  // const menuData2 = [
  //   { label: 'Node 1' },
  //   { label: 'Node 2', children: [
  //     { label: 'Node 2.1' },
  //     { label: 'Node 2.2', children: [
  //       { label: 'Node 2.2.1' },
  //       { label: 'Node 2.2.2' }
  //     ]}
  //   ]},
  //   { label: 'Node 3' }
  // ];

  // dom
  const tree = generateTree(menuData);
  const menuElement = document.getElementById("menu");
  menuElement.innerHTML = tree.render();
};
gnbTree();

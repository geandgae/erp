class TreeNode {
  constructor(label, children = [], depth = 1) {
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

    const childNodes = this.children.map(child => child.render()).join('');
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
    return menu.map(item => new TreeNode(item.label, item.children));
  } else if (typeof menu === 'object' && menu !== null) {
    return new TreeNode(menu.label, menu.children);
  } else {
    throw new Error('Invalid menu format');
  }
}

const menuData = [
  { label: 'Node 1' },
  { label: 'Node 2', children: [
    { label: 'Node 2.1' },
    { label: 'Node 2.2', children: [
      { label: 'Node 2.2.1' },
      { label: 'Node 2.2.2' }
    ]}
  ]},
  { label: 'Node 3' }
];

const tree = generateTree(menuData);

const menuElement = document.getElementById('menu');
menuElement.innerHTML = `<ul>${tree.map(node => node.render()).join('')}</ul>`;

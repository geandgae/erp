// left menu
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
  { label: 'Node 1', children: [
    { label: 'Node 1.1' , children: [
      { label: 'Node 1.1.1' },
      { label: 'Node 1.1.2' },
      { label: 'Node 1.1.3' }
    ]},
    { label: 'Node 1.2', children: [
      { label: 'Node 1.2.1' },
      { label: 'Node 1.2.2' }
    ]}
]},
  { label: 'Node 2', children: [
    { label: 'Node 2.1' , children: [
      { label: 'Node 2.1.1' }
    ]},
    { label: 'Node 2.2', children: [
      { label: 'Node 2.2.1' },
      { label: 'Node 2.2.2', children: [
        { label: 'Node 2.2.2.1' },
        { label: 'Node 2.2.2.2' },
        { label: 'Node 2.2.2.3' }
      ] }
    ]}
  ]},
  { label: 'Node 3' }
];

const tree = generateTree(menuData);

const menuElement = document.getElementById('menu');
menuElement.innerHTML = `<ul>${tree.map(node => node.render()).join('')}</ul>`;




// 함수를 사용하여 마지막 li 요소들을 배열로 저장
function getLiDepthFromMainList(liElement) {
  let depth = 0;
  let currentElement = liElement;

  while (currentElement && currentElement.tagName === 'LI' && !currentElement.id.includes('menu')) {
    if (currentElement.parentElement.tagName === 'UL') {
      depth++;
    }
    currentElement = currentElement.parentElement.closest('li');
  }

  return depth;
}


function hasChildUl(liElement) {
  return liElement.querySelector('ul') !== null;
}

// 각 li 요소의 깊이를 계산하여 콘솔에 출력
const liElements = document.querySelectorAll('.nsf-tree li');
const liWithoutUl = [];

liElements.forEach(li => {
  if (!hasChildUl(li)) {
    liWithoutUl.push(li);
  }
});

console.log(liWithoutUl);



// 각 li 요소의 깊이를 계산하여 콘솔에 출력
liElements.forEach(li => {
  const depth = getLiDepthFromMainList(li);
  console.log(`"${li.textContent.trim()}"의 깊이: ${depth}`);
});



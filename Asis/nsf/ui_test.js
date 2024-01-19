// 함수를 사용하여 마지막 li 요소들을 배열로 저장
function getLiDepth(liElement) {
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
  console.log(li)
  const depth = getLiDepth(li);
  // console.log(`"${li.textContent.trim()}"의 깊이: ${depth}`);
});

console.log(liElements)
// menu toggle
liElements.forEach(li => {
  if(li.className.includes("depth-1")){
    li.classList.add('on')
  }
  li.addEventListener('click', () => {
    const elAll = li.querySelectorAll("li")
    elAll.forEach(m => {
      console.log(hasChildUl(m))
      if(hasChildUl(m)){
        m.classList.toggle("on")
      }
    })
    // childLi(li).classList.toggle('on')
  })
});
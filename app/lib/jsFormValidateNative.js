
// 选取可见元素
function visibleEles(eles) {
  const myEles = [];
  for (let i = 0; i < eles.length; i++) {
    if (eles[i].offsetWidth <= 0 || eles[i].offsetHeight <= 0) {
      continue;
    }
    myEles.push(eles[i]);
  }
  return myEles;
}

// 判断是否有某个classname
function hasClass(obj, cls) {
  return obj.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

// 添加某个classname
function addClass(obj, cls) {
  if (!hasClass(obj, cls)) {
    obj.className += ` ${cls}`;
  }
}

// 移除某个classname
function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
    obj.className = obj.className.replace(reg, ' ');
  }
}

// 移除validate-message
function removeNext(ele) {
  const eleParent = ele.parentNode;
  let delTipsele = ele.nextSibling; // 判断是否有相应元素
  while (delTipsele) {
    if (delTipsele.nodeType === 1) {
      break;
    }
    delTipsele = delTipsele.nextSibling;
  }
  if (delTipsele && hasClass(delTipsele, 'validate-message')) {
    eleParent.removeChild(delTipsele);
  }
}

// jquery after
function insertAfter(newElement, targetElement) { // newElement是要追加的元素 targetElement 是指定元素的位置
  const parent = targetElement.parentNode; // 找到指定元素的父节点
  if (parent.lastChild === targetElement) { // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
    parent.appendChild(newElement, targetElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling); // insertBefor js原生是有的
  }
}

function vali(ele, eles) {
  const defaultData = {
    errorClass: 'input-error',
    successClass: 'input-success',
  };
  const emptyTxt = ele.getAttribute('data-empty') || '';
  const errorTxt = ele.getAttribute('data-error') || '';
  const pattern = eval(ele.getAttribute('data-pattern'));
  const value = ele.value.trim();
  const relaTxt = ele.getAttribute('data-relatext');
  const relation = ele.getAttribute('data-relation') || '';

  let nextEle = ele.nextSibling;
  let tipsElement;
  while (nextEle) {
    if (nextEle.nodeType === 1) {
      break;
    }
    nextEle = nextEle.nextSibling;
  }

  if (nextEle && hasClass(nextEle, 'validate-message')) {
    tipsElement = nextEle;
  } else {
    tipsElement = document.createElement('p');
    tipsElement.setAttribute('class', 'validate-message');
  }
  if (value === '' && emptyTxt !== '') {
    tipsElement.innerHTML = emptyTxt;
    insertAfter(tipsElement, ele);
    addClass(ele, defaultData.errorClass);
    removeClass(ele, defaultData.successClass);
  } else if (pattern) {
    if (!pattern.test(value)) {
      tipsElement.innerHTML = errorTxt;
      insertAfter(tipsElement, ele);
      addClass(ele, defaultData.errorClass);
      removeClass(ele, defaultData.successClass);
    } else {
      removeClass(ele, defaultData.errorClass);
      addClass(ele, defaultData.successClass);
      removeNext(ele);
    }
  } else if (!pattern && value !== '') {
    removeClass(ele, defaultData.errorClass);
    addClass(ele, defaultData.successClass);
    removeNext(ele);
  }
  if (relation && relation === 'end') {
    for (let i = 0; i < eles.length; i++) {
      if (eles[i].getAttribute('data-relation') === 'start') {
        const start = eles[i];
        if (ele.value.trim() !== start.value.trim() && start.value.trim()) {
          tipsElement.innerHTML = relaTxt;
          insertAfter(tipsElement, ele);
          addClass(ele, defaultData.errorClass);
          removeClass(ele, defaultData.successClass);
        } else if (start.value.trim()) {
          removeClass(start, defaultData.errorClass);
          addClass(start, defaultData.successClass);
          removeNext(start);
        }
        break;
      }
    }
  } else if (relation === 'start') {
    for (let i = 0; i < eles.length; i++) {
      if (eles[i].getAttribute('data-relation') === 'end') {
        const end = eles[i];
        if (ele.value.trim() !== end.value.trim() && end.value.trim()) {
          tipsElement.innerHTML = relaTxt;
          insertAfter(tipsElement, ele);
          addClass(ele, defaultData.errorClass);
          removeClass(ele, defaultData.successClass);
        } else if (end.value.trim()) {
          removeClass(end, defaultData.errorClass);
          addClass(end, defaultData.successClass);
          removeNext(end);
        }
        break;
      }
    }
  }
}

function listenerChange(ele, eles) {
  ele.addEventListener('keyup', () => {
    vali(ele, eles);
  });
  // ele.addEventListener('change', () => {
  //   vali(ele, eles);
  // });
}

export const valiCheckForm = function (eles) {
  for (let i = 0; i < eles.length; i++) {
    listenerChange(eles[i], eles);
  }
};

export const valiFormSubmit = function (eles, cb) {
  let flag = true;
  for (let i = 0; i < eles.length; i++) {
    vali(eles[i], eles);
  }
  const inputError = document.querySelectorAll('.input-error');
  const visInpErr = visibleEles(inputError);
  if (visInpErr.length) {
    flag = false;
    visInpErr[0].focus();
  }
  if (flag && cb && cb()) {
    cb();
  }
};

export const removeValiCheckForm = function (eles) {
  for (let i = 0; i < eles.length; i++) {
    eles[i].removeListener('keyup', listenerChange);
  }
};

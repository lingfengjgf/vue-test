// vdom 虚拟dom
// old 老节点
// new 新节点
// old array  a b c d e f g
// new array  a b e c d h f g

// mountElement 新增元素 h
// patch  复用元素 a b c d e f g
// unmount 删除元素
// todo
// move 元素移动 ?

exports.diffArray = (c1, c2, { mountElement, patch, unmount, move }) => {
  function isSameVnodeType(n1, n2) {
    return n1.key === n2.key; // && n1.type === n2.type;
  }

  let l1 = c1.length;
  let l2 = c2.length;
  let i = 0;
  let e1 = l1 - 1;
  let e2 = l2 - 1;

  // 1、从左向右，如果元素可以复用就继续往右，否则停止
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (isSameVnodeType(n1, n2)) {
      patch(n1.key);
    } else {
      break;
    }
    i++;
  }

  // 2、从右向左，如果元素可以复用就继续往左，否则停止
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = c2[e2];
    if (isSameVnodeType(n1, n2)) {
      patch(n1.key);
    } else {
      break;
    }
    e1--;
    e2--;
  }

  // 3、老节点没了，新节点还有
  if (i > e1) {
    if (i <= e2) {
      while (i <= e2) {
        const n2 = c2[i];
        mountElement(n2.key);
        i++;
      }
    }
  }

  // 4、老节点还有，新节点没了
  else if (i > e2) {
    if (i <= e1) {
      while (i <= e1) {
        const n1 = c1[i];
        unmount(n1.key);
        i++;
      }
    }
  }

  // 5、新老节点都有，但是顺序不稳定
  else {
    // 5.1 把新节点做成Map
    const s1 = i;
    const s2 = i;

    const keyToNewIndexMap = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = c2[i];
      keyToNewIndexMap.set(nextChild.key, i);
    }

    // 记录新节点有多少个还没处理
    const toBePatch = e2 - s2 + 1;
    let patched = 0;

    let moved = false; // 是否需要移动元素
    let maxNewIndexSoFar = 0; // 表示keyToNewIndexMap中的最大的一个元素下标

    // 5.2 记录新老节点的相对下标
    const newIndexToOldIndexMap = new Array(toBePatch);
    // 数组的下标是新元素的相对下标，值在5.3更新为老元素的下标+1
    // 如果没有更新，仍然是0，则需要mountElement
    for (i = 0; i < toBePatch; i++) {
      newIndexToOldIndexMap[i] = 0;
    }

    // 5.3 遍历老节点，查找可复用的节点(patch、unmout)
    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];

      // 新节点处理完了，还有多余的老节点
      if (patched >= toBePatch) {
        unmount(prevChild.key);
        continue;
      }
      const newIndex = keyToNewIndexMap.get(prevChild.key);

      if (newIndex === undefined) {
        // 没有找到要复用的节点，删除
        unmount(prevChild.key);
      } else {
        // 找到可复用的节点，更新

        if (newIndex >= maxNewIndexSoFar) {
          // 1 3 5 10
          maxNewIndexSoFar = newIndex;
        } else {
          // 1 3 5 10 2
          moved = true;
        }

        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        patch(prevChild.key);
        patched++;
      }
    }

    // 获取最长递增子序列
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : [];
    let lastIndex = increasingNewIndexSequence.length - 1;

    // 5.4 遍历新节点(mountElement、move)
    for (i = toBePatch - 1; i >= 0; i--) {
      const nextChild = c2[s2 + i];

      // 判断节点需要mount还是move
      if (newIndexToOldIndexMap[i] === 0) {
        mountElement(nextChild.key);
      } else {
        // 可能move
        if (lastIndex < 0 || i !== increasingNewIndexSequence[lastIndex]) {
          move(nextChild.key);
        } else {
          lastIndex--;
        }
      }
    }
  }

  function getSequence() {
    return [2, 3];
  }
};

class Node {
  data: number
  left: Node = null
  right: Node = null
  count: number = 0

  constructor(data: number) {
    this.data = data
  }

  show() {
    console.log('Node: ', this.data)
    return this.data
  }
}

class BST {
  root: Node = null
  length: number = 0

  // 插入节点
  insert(data: number) {
    const node = new Node(data)

    if (this.root === null) {
      this.root = node
    } else {
      let currentNode = this.root
      let parentNode

      while (true) {
        parentNode = currentNode
        console.log('currentNode :', currentNode)
        if (data < currentNode.data) {
          currentNode = currentNode.left
          if (currentNode === null) {
            parentNode.left = node
            break
          }
        } else {
          currentNode = currentNode.right
          if (currentNode === null) {
            parentNode.right = node
            break
          }
        }
      }
    }
  }

  // 中序遍历
  inOrder(node: Node) {
    if (node !== null) {
      this.inOrder(node.left)
      node.show()
      this.inOrder(node.right)
    }
  }

  // 先序遍历
  preOrder(node: Node) {
    if (node !== null) {
      node.show()
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  // 后序遍历
  postOrder(node: Node) {
    if (node !== null) {
      this.postOrder(node.left)
      this.postOrder(node.right)
      node.show()
    }
  }

  // 最小值节点
  min(node: Node = this.root): Node {
    let currentNode = node
    while (currentNode.left !== null) {
      currentNode = currentNode.left
    }
    return currentNode
  }

  // 最大值节点
  max(node: Node = this.root): Node {
    let currentNode = node
    while (currentNode.right !== null) {
      currentNode = currentNode.right
    }
    return currentNode
  }

  // 查找节点
  find(data: number) {
    let currentNode = this.root

    while (currentNode !== null) {
      if (currentNode.data === data) {
        return currentNode
      } else if (currentNode.data > data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    return null
  }

  // 删除节点
  remove(data: number) {
    this.root = this.removeNode(this.root, data)
  }

  removeNode(node: Node, data: number): Node {
    if (node === null) {
      return null
    }
    if (data === node.data) {
      // 没有子节点
      if (node.left === null && node.right === null) {
        return null
      }
      // 没有左子节点
      if (node.left === null) {
        return node.right
      }
      // 没有右子节点
      if (node.right === null) {
        return node.left
      }
      // 有左右两个节点
      const tempNode = this.min(node.right)
      node.data = tempNode.data
      node.right = this.removeNode(node.right, tempNode.data)
      return node
    } else if (node.data > data) {
      node.left = this.removeNode(node.left, data)
      return node
    } else {
      node.right = this.removeNode(node.right, data)
      return node
    }
  }

  // 更新节点
  update(data: number) {
    const node = this.find(data)
    node.count++
    return node
  }
}

const bst = new BST()

bst.insert(10)
bst.insert(12)
bst.insert(56)
bst.insert(7)
bst.insert(9)

bst.inOrder(bst.root)

---
title: 数据结构与算法之哈希表
date: 2019-09-08 16:26:45
tags:
  - DSA
categories:
  - DSA
---

哈希表是一种常用的数据结构，可以快速的插入和取用，但是查询数据效率低下

<!--more-->

## 前言

哈希表是一种常用的数据结构，可以快速的插入和取用，但是查询数据效率低下。

## 实现

基于数组实现哈希表，数组的长度是预先设定的，有需要是增加。最常见的是将数组的长度设为一个质数

```ts
class HashTable {
  table = <any>[]

  constructor() {
    this.table = Array.from({
      length: 137
    })
  }

  // 将字符串的 ASCLL 码相加对数组长度求余
  hash(data: string) {
    let total = 0
    for (let index = 0; index < data.length; index++) {
      total += data.charCodeAt(index)
    }
    return total % this.table.length
  }

  // 更优的 hash 方法
  betterHash(data: string) {
    const H = 37
    let total = 0

    for (let index = 0; index < data.length; index++) {
      total += H * total + data.charCodeAt(index)
    }

    total = total % this.table.length

    if (total < 0) {
      total += this.table.length - 1
    }

    return parseInt(total.toString())
  }

  // 存储数据
  put(key: string, data: any) {
    const pos = this.betterHash(key)
    this.table[pos] = data
  }

  // 获取数据
  get(key: string) {
    return this.table[this.betterHash(key)]
  }

  // 显示数据
  show() {
    for (let index = 0; index < this.table.length; index++) {
      const item = this.table[index]
      if (item) {
        console.log(`${index}: ${item}`)
      }
    }
  }
}
```

测试下

```ts
const hashTable = new HashTable()

hashTable.put('David', 'David')
hashTable.put('Jennifer', 'Jennifer')
hashTable.put('Donnie', 'Donnie')
hashTable.put('Raymond', 'Raymond')
hashTable.put('Cynthia', 'Cynthia')
hashTable.put('Mike', 'Mike')
hashTable.put('Clayton', 'Clayton')
hashTable.put('Danny', 'Danny')
hashTable.put('Jonathan', 'Jonathan')

hashTable.show()

console.log('Jonathan: ', hashTable.get('Jonathan'))
```

输出

```ts
12: Jennifer
22: Raymond
55: Donnie
58: Clayton
80: Jonathan
82: Mike
103: Cynthia
110: Danny
Jonathan:  Jonathan
```

## 碰撞处理

当哈希方法对于多个输入产生了相同的输出是就会出现碰撞，两种可以解决键的碰撞问题开链法以及线性探测法

### 开链法

### 线性探测法

未完待续...

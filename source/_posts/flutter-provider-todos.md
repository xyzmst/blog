---
title: 使用 Provider 管理 Flutter 应用状态
date: 2019-09-11 21:48:56
tags:
  - Flutter
categories:
  - Flutter
---

一个应用内通常会有两种数据，单个组件内部的使用的数据，很多组件共同使用的数据

<!--more-->

## 前言

一个应用内通常会有两种数据，单个组件内部的使用的数据，很多组件共同使用的数据

## 什么是 Provider

官方的定义是： A mixture between dependency injection (DI) and state management, built with widgets for widgets.

## 为什么要使用 Provider

应用中通常会有一些很多部件都需要的数据，如用户的登录信息，用户设置，地理位置等，如果只是使用 StatefullWeight 的话就需要将状态提升到一个父部件中然后向下进行传递，会很繁琐，

## 如何使用 Provider

首先在项目的 pubspec.yml 的 dependecies 中定义要使用的 provider 版本

创建一个 store 文件夹

```yml
dependencies:
  ...
  provider: ^3.1.0
  ...
```

## 总结

未完待续...

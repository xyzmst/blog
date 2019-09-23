---
title: 使用 Provider 管理 Flutter 应用状态 (上)
date: 2019-09-11 21:48:56
tags:
  - Flutter
categories:
  - Flutter
---

一个应用内通常会有两种数据，组件内部的使用的数据以及很多组件共同使用的数据，组件内部使用的数据可以通过 StatefulWidget 来实现，但是很多组件共同使用的数据就需要一个状态管理工具来进行管理了，本文说明如何使用 Provider 来管理这种应用的全局状态数据

<!--more-->

## 前言

一个应用内通常会有两种数据，组件内部的使用的数据以及很多组件共同使用的数据，组件内部使用的数据可以通过 StatefulWidget 来实现，但是很多组件共同使用的数据就需要一个状态管理工具来进行管理了，本文说明如何使用 Provider 来管理这种应用的全局状态数据

## 什么是 Provider

官方的定义是： A mixture between dependency injection (DI) and state management, built with widgets for widgets.

## 为什么要使用 Provider

应用中通常会有一些很多部件都需要的数据，如用户的登录信息，用户设置，地理位置等，如果只是使用 StatefullWeight 的话就需要将状态提升到一个父部件中然后向下进行传递，会很繁琐，

## 一个例子 🌰

使用一个 todo 应用来说明如何在 Flutter 应用中使用 Provider，最终的完成的应用是这样的

首先使用命令行创建一个项目

```sh
flutter create flutter_provider_todos
```

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

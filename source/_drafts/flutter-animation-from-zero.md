---
title: 从零开始的 Flutter 动画
categories:
  - 技术
tags:
  - Flutter
  - Animation
date: 2020-01-08 15:01:23
---

设计巧妙的动画可以使UI体验更加直观，使应用程序拥有华丽的视觉效果和感受，提供更好的用户体验

<!--more-->

## 前言

设计巧妙的动画可以使UI体验更加直观，使应用程序拥有华丽的视觉效果和感受，提供更好的用户体验

<div>
  <video src="videos/app_store.mp4" controls width="320" autoplay muted loop />
</div>

## 基本的动画概念

动画分为两类：补间动画和基于物理动画

### 补间动画

补间动画是物体从开始状态运动到结束状态中间的表现形式， 在补间动画中定义了物体运动起点和终点以及运动实践，再定义过渡时间和速度的曲线，然后框架会计算如何从起点过渡到终点。

补间动画本身只定义了如何在两个值之间进行插值。要获取动画当前帧的具体值，还需要一个动画来确定当前状态。有两种方法可以将补间动画与动画组合在一起以获得动画的具体值：

- 你可以用 evaluate 方法处理动画的当前值从而得到对应的插值。这种方法对于已经监听动画并因此在动画改变值时重新构建的 widgets 是最有效的。

- 你可以用 animate 方法处理一个动画。相对于返回单个值，animate 方法返回一个包含补间动画插值的新的 Animation。这种方法对于当你想要将新创建的动画提供给另一个 widget 时最有效，它可以直接读取包含补间动画的插值以及监听对应插值的更改。

### 基于物理动画

基于物理基础的动画是物体模拟真实世界的行为来进行建模的。举个例子，当您抛球时，球落地的时间和位置取决于抛出的速度和距离地面的高度。类似地，附在弹簧上的球和附在绳子上的球掉落（和反弹）方式是不一样的。

## 曲线
Curve 抽象类将名义范围为 0.0-1.0 的双精度值映射到名义范围为 0.0-1.0 的双精度值。

Curve 类是无状态和不可变的。

## Flutter 中的动画

Flutter 中的动画系统基于 Animation。Widgets 可以直接将这些动画合并到自己的 build 方法中来读取它们的当前值或者监听它们的状态变化，或者可以将其作为的更复杂动画的基础传递给其他 widgets。

## Implicit Animations 隐式动画

使用Flutter的动画库，您可以在UI中为小部件添加动作并创建视觉效果。 库中设置的一个小部件可以为您管理动画。 这些窗口小部件从它们实现的ImplicitlyAnimatedWidget 类派生而来统称为隐式动画或隐式动画小部件。 对于隐式动画，您可以通过设置目标值来设置小部件属性的动画。 每当目标值更改时，小部件就会将属性从旧值设置为新值。 通过这种方式，隐式动画为方便起见而对控件进行了交易-它们管理动画效果，因此您不必这样做。

这些小部件会自动为其属性进行动画更改。当您使用新的属性值（例如StatefulWidget的setState）重建窗口小部件时，该窗口小部件会处理将动画从以前的值驱动到新值的过程。

这些小部件称为隐式动画小部件。当您需要向应用程序中添加动画时，它们通常是您要做的第一件事。它们提供了一种在不增加额外复杂性的情况下添加动画的方法。

AnimatedContainer是一个功能强大的隐式动画小部件，因为它具有许多会影响其外观的属性，并且所有这些属性都会自动插值。

```dart
import 'package:flutter/material.dart';

const owl_url = 'https://raw.githubusercontent.com/flutter/website/master/src/images/owl.jpg';

class FadeInDemo extends StatefulWidget {
  _FadeInDemoState createState() => _FadeInDemoState();
}

class _FadeInDemoState extends State<FadeInDemo> {
  double opacityLevel = 0.0;

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Image.network(owl_url),
      MaterialButton(
        child: Text(
          'Show details',
          style: TextStyle(color: Colors.blueAccent),
        ),
        onPressed: () => setState(() {
          opacityLevel = 1.0;
        }),
      ),
      AnimatedOpacity(
        duration: Duration(seconds: 3),
        opacity: opacityLevel,
        child: Column(
          children: <Widget>[
            Text('Type: Owl'),
            Text('Age: 39'),
            Text('Employment: None'),
          ],
        ),
      )
    ]);
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: FadeInDemo(),
        ),
      ),
    );
  }
}

Future<void> main() async {
  runApp(
    MyApp(),
  );
}


```

```dart
import 'dart:math';

import 'package:flutter/material.dart';

const _duration = Duration(milliseconds: 400);

double randomBorderRadius() {
  return Random().nextDouble() * 64;
}

double randomMargin() {
  return Random().nextDouble() * 64;
}

Color randomColor() {
  return Color(0xFFFFFFFF & Random().nextInt(0xFFFFFFFF));
}

class AnimatedContainerDemo extends StatefulWidget {
  _AnimatedContainerDemoState createState() => _AnimatedContainerDemoState();
}

class _AnimatedContainerDemoState extends State<AnimatedContainerDemo> {
  Color color;
  double borderRadius;
  double margin;

  @override
  void initState() {
    super.initState();
    color = Colors.deepPurple;
    borderRadius = randomBorderRadius();
    margin = randomMargin();
  }

  void change() {
    setState(() {
      color = randomColor();
      borderRadius = randomBorderRadius();
      margin = randomMargin();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            SizedBox(
              width: 128,
              height: 128,
              child: AnimatedContainer(
                margin: EdgeInsets.all(margin),
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(borderRadius),
                ),
                duration: _duration,
              ),
            ),
            MaterialButton(
              color: Theme.of(context).primaryColor,
              child: Text(
                'change',
                style: TextStyle(color: Colors.white),
              ),
              onPressed: () => change(),
            ),
          ],
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AnimatedContainerDemo(),
    );
  }
}

Future<void> main() async {
  runApp(
    MyApp(),
  );
}

```



## Custom Implicit Animations 自定义隐式动画

## Built-in Explicit Animations 内置显式动画

## custom explicit animations 自定义显式动画

## 基于物理的动画

## Hero 动画

## 交织动画

动画被分解成较小的动作，其中一些动作被延迟。这些小动画可以是连续的，也可以部分或完全重叠。

## Animation deep dive 动画原理

Flutter 中的动画系统基于类型化的 Animation 对象。Widgets 既可以通过读取当前值和监听状态变化直接合并动画到 build 函数，也可以作为传递给其他 widgets 的更精细动画的基础。

Ticker run every frame

## Flutter Flare

SchedulerBinding 是一个暴露出 Flutter 调度原语的单例类。

在这一节，关键原语是帧回调。每当一帧需要在屏幕上显示时，Flutter 的引擎会触发一个 “开始帧” 回调，调度程序会将其多路传输给所有使用 scheduleFrameCallback() 注册的监听器。所有这些回调不管在任意状态或任意时刻都可以收到这一帧的绝对时间戳。由于所有回调收到时间戳都相同，因此这些回调触发的任何动画看起来都是完全同步的，即使它们需要几毫秒才能执行。

运行器
Ticker 类挂载在调度器的 scheduleFrameCallback() 的机制上，来达到每次运行都会触发回调的效果。

一个 Ticker 可以被启动和停止. 启动时，它会返回一个 Future，这个 Future 在 Ticker 停止时会被改为完成状态。

每次运行, Ticker 都会为回调函数提供从 Ticker 开始运行到现在的持续时间。

因为运行器总是会提供在自它们开始运行以来的持续时间，所以所有运行器都是同步的。如果你在两帧之间的不同时刻启动三个运行器，它们都会被同步到相同的开始时间，并随后同步运行。

## 结语

## 参考

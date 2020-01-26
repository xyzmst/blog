---
title: 在 Flutter 应用中实现搜索
categories:
  - 技术
tags:
  - Flutter
date: 2020-01-26 17:34:54
---

<img src="images/flutter_show_search.png" height="320" style="height: 340px; object-fit: cover;">

使用 `SearchDelegate` 给 Flutter 应用添加搜索功能

<!--more-->

## 前言

`SearchDelegate` 是 Flutter 框架提供的一个实现搜索功能的类，本文说明如何使用 `SearchDelegate` 进行搜索。

创建项目，初始化代码如下

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Search App',
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search App'),
      ),
    );
  }
}

```

## 使用 `showSearch()` 方法

`showSearch` 方法用来显示一个搜索页面，并在关闭页面时返回用户选择的搜索结果。搜索页面由一个带有搜索框的 `AppBar` 和可以显示搜索建议或搜索结果的 `body` 组成。它有两个必要参数 `context` 和 `delegate`，`context` 即为当前的应用上下文，`delegate` 是一个实现了 `SearchDelegate` 抽象类自定义的部件，这个自定义部件定义了搜索页面的内容。

在 `AppBar` 的 `actions` 数组里面添加一个 `IconButton`，按下时调用 `showSearch` 方法，进入搜索页面。

```dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search App'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              showSearch(context: context, delegate: CustomSearchDelegate());
            },
          )
        ],
      ),
    );
  }
}

class CustomSearchDelegate extends SearchDelegate {
  @override
  List<Widget> buildActions(BuildContext context) {
    // TODO: implement buildActions
    throw UnimplementedError();
  }

  @override
  Widget buildLeading(BuildContext context) {
    // TODO: implement buildLeading
    throw UnimplementedError();
  }

  @override
  Widget buildResults(BuildContext context) {
    // TODO: implement buildResults
    throw UnimplementedError();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // TODO: implement buildSuggestions
    throw UnimplementedError();
  }
}

```

## 实现 `SearchDelegate`

`CustomSearchDelegate` 需要实现四个方法

- `buildLeading`     显示在输入框之前的部件，一般显示返回前一个页面箭头按钮
- `buildActions`     显示在输入框之后的部件
- `buildResults`     显示搜索后的结果
- `buildSuggestions` 显示搜索建议

先实现 `buildActions` 和 `buildLeading`，`buildActions` 显示一个清除按钮，把当前的 `query` 搜索内容清空，并显示搜索建议；`buildLeading` 显示一个箭头的按钮，使用 `close` 方法关闭搜索页面，`close` 方法第二个参数是选定的搜索结果，如果使用系统后退按钮关闭搜索页面，则返回 null。

```dart
List<Widget> buildActions(BuildContext context) {
  return [
    IconButton(
      tooltip: 'Clear',
      icon: const Icon(Icons.clear),
      onPressed: () {
        query = '';
        showSuggestions(context);
      },
    )
  ];
}

@override
Widget buildLeading(BuildContext context) {
  return IconButton(
    tooltip: 'Back',
    icon: AnimatedIcon(
      icon: AnimatedIcons.menu_arrow,
      progress: transitionAnimation,
    ),
    onPressed: () {
      close(context, null);
    },
  );
}

@override
Widget buildResults(BuildContext context) {
  return ListView();
}

@override
Widget buildSuggestions(BuildContext context) {
  return ListView();
}
```

<img src="images/search_01.png" width="240" style="width: 240px;">

然后实现 `buildResults` 和 `buildSuggestions`，这两个方法可以使用多种形式来展现内容，这里使用 `ListView` 部件来展示内容。

```dart
@override
Widget buildResults(BuildContext context) {
  return ListView.builder(
    itemCount: Random().nextInt(10),
    itemBuilder: (context, index) {
      return ListTile(
        title: Text('result $index'),
      );
    },
  );
}

@override
Widget buildSuggestions(BuildContext context) {
  return ListView(
    children: <Widget>[
      ListTile(title: Text('Suggest 01')),
      ListTile(title: Text('Suggest 02')),
      ListTile(title: Text('Suggest 03')),
      ListTile(title: Text('Suggest 04')),
      ListTile(title: Text('Suggest 05')),
    ],
  );
}

```

搜索结果

<img src="images/search_result.png" width="240" style="width: 240px;">

搜索建议

<img src="images/search_suggestion.png" width="240" style="width: 240px;">


## 获取远程数据

搜索一般需要请求后端的搜索接口来获取数据，此时可以使用 `FutureBuilder` 部件来请求数据然后渲染结果。首先需要定义一个请求接口的方法，返回一个 `Future`，然后在 `buildResults` 方法中使用 `FutureBuilder` 来展示结果。

先添加 `http` 包

```yml
dependencies:
  http: <latest_version>
```

引入需要的依赖包

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
```

将输入类型设置为数字，定义一个 `_fetchPosts` 方法用来获取远端数据，在 `buildResults` 方法里使用 `FutureBuilder` 渲染搜索结果。

```dart
@override
TextInputType get keyboardType => TextInputType.number;

Future _fetchPosts() async {
  http.Response response =
      await http.get('https://jsonplaceholder.typicode.com/posts/$query');
  final data = await json.decode(response.body);
  return data;
}

@override
Widget buildResults(BuildContext context) {
  if (int.parse(query) >= 100) {
    return Center(child: Text('请输入小于 100 的数字'));
  }

  return FutureBuilder(
    future: _fetchPosts(),
    builder: (context, AsyncSnapshot snapshot) {
      if (snapshot.hasData) {
        final post = snapshot.data;

        return ListTile(
          title: Text(post['title'], maxLines: 1),
          subtitle: Text(post['body'], maxLines: 3),
        );
      }
      return Center(child: CircularProgressIndicator());
    },
  );
}
```

<img src="images/search_server.png" width="240" style="width: 240px;">

## 最终效果

<div>
  <video src="videos/show_search.mov" controls width="240" autoplay muted loop />
</div>

## 完整代码

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Search App',
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search App'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              showSearch(context: context, delegate: CustomSearchDelegate());
            },
          )
        ],
      ),
    );
  }
}

class CustomSearchDelegate extends SearchDelegate {
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        tooltip: 'Clear',
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
          showSuggestions(context);
        },
      )
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      tooltip: 'Back',
      icon: AnimatedIcon(
        icon: AnimatedIcons.menu_arrow,
        progress: transitionAnimation,
      ),
      onPressed: () {
        this.close(context, null);
      },
    );
  }

  @override
  TextInputType get keyboardType => TextInputType.number;

  Future _fetchPosts() async {
    http.Response response =
        await http.get('https://jsonplaceholder.typicode.com/posts/$query');
    final data = await json.decode(response.body);

    return data;
  }

  @override
  Widget buildResults(BuildContext context) {
    if (int.parse(query) >= 100) {
      return Center(child: Text('请输入小于 100 的数字'));
    }

    return FutureBuilder(
      future: _fetchPosts(),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.hasData) {
          final post = snapshot.data;

          return ListTile(
            title: Text(post['title'], maxLines: 1),
            subtitle: Text(post['body'], maxLines: 3),
          );
        }

        return Center(child: CircularProgressIndicator());
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return ListView(
      children: <Widget>[
        ListTile(title: Text('Suggest 01')),
        ListTile(title: Text('Suggest 02')),
        ListTile(title: Text('Suggest 03')),
        ListTile(title: Text('Suggest 04')),
        ListTile(title: Text('Suggest 05')),
      ],
    );
  }
}

```

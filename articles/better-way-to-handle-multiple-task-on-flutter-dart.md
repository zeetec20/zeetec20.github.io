---
title: Better way to handle multiple task on Flutter / Dart
description: Concurrency, in computer science concurrency is a the abillity to dealing with lots or multiple things at once. By using concurrency we can increase performance and speed application, in this article we will try implement to Flutter / Dart.
thumbnail: /article/better-way-to-handle-multiple-task-on-flutter-dart/thumbnail.jpg
createdAt: 16-08-2022
writer: zeetec20
tag: [Flutter, Dart, Mobile App, Concurrency]
---

# **Better way to handle multiple task on Flutter / Dart**

<br/>

[Concurrency](https://en.wikipedia.org/wiki/Concurrency_(computer_science)), in this article we will discuss about this topic, and it’s key to run multiple task in better way. Then what is concurrency, in computer science concurrency is a the abillity to dealing with lots or multiple things at once. Dart is able you to use concurrency, automaticlly you can also use on Flutter. By the way before you read all this article you must understanding about fundamental dart, future function. 

If we talk about concurrency, I have some reason why you must implement on your application:

1. Increase your speed execute task
2. Code is more clean
3. Code is more less
4. Less code is a less space used

Okay after you understanding about concurrency lets enter code section, I will code in one file, cause we will just need little code to try concurrency, for the task we will use API for the sample. And on the code you will meet 3 function with name concurrency, mediocre, once these function we will describe and comparing when we use concurrency and when not use it, then we still have 3 other function with first name getUsers these functions is have a role for the task.

<br/>

This the code what we talked about earlier, you can check it. And for make easier to explaining I will split the code.

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map> getUsers1() async {
  http.Response res =
      await http.get(Uri.parse('https://reqres.in/api/users/?page=1?test=${DateTime.now().toIso8601String()}'));
  return jsonDecode(res.body);
}

Future<Map> getUsers2() async {
  http.Response res =
      await http.get(Uri.parse('https://reqres.in/api/users/?page=2?test=${DateTime.now().toIso8601String()}'));
  return jsonDecode(res.body);
}

Future<Map> getUsers3() async {
  http.Response res =
      await http.get(Uri.parse('https://reqres.in/api/users/?page=3?test=${DateTime.now().toIso8601String()}'));
  return jsonDecode(res.body);
}

Future concurrency() async {
  print('=== Concurrency ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await Future.wait<Map>([
    getUsers1(),
    getUsers2(),
    getUsers3(),
  ]);

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}

Future mediocre() async {
  print('=== Mediocre ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await getUsers1();
  await getUsers2();
  await getUsers3();

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}

Future once() async {
  print('=== Once ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await getUsers1();

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}

void main(List<String> args) async {
  await once();
  await mediocre();
  await concurrency();
}
```
<br/>

By the way if you want try the code you must installed dart, and make some file with name main.dart then put the code into the new file. After this just run the file like below on your terminal.

```bash
dart main.dart

```

<br/>
<br/>

### **Concurrency**

Function concurrency, this is a where I make multiple task to execute concurrency, you can look function **Future.wait**, this function have a List parameter this is place to put the task to execute, for the return all of task it will come on return **Future.wait**, the value return will wrapped with List and the list value is be in order of tasks.

```dart
Future concurrency() async {
  print('=== Concurrency ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await Future.wait<Map>([
    getUsers1(),
    getUsers2(),
    getUsers3(),
  ]);

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}

```

<br/>
<br/>

### **Mediocre**

Function mediocre, this is a usual method to execute multiple task in there I just call in sequence.

```dart
Future mediocre() async {
  print('=== Mediocre ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await getUsers1();
  await getUsers2();
  await getUsers3();

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}
```

<br/>
<br/>

### **Once**

Function once is I writing for comparing speed execution with other function

```dart
Future once() async {
  print('=== Once ===');
  Stopwatch stopwatch = Stopwatch();
  stopwatch.start();

  await getUsers1();

  stopwatch.stop();
  print('\nDuration: ${stopwatch.elapsed.inMilliseconds}ms\n');
}
```

<br/>
<br/>

### **Comparing speed execution**

After we try to execute all functions concurrency, mediocre and once, we got this. You can see on below we have some image to describe perform concurrency when measured by time. In function concurrency we run 3 task but time execute is not very different with function once which them run 1 task.

<div align="middle">
    <img class="img-thumbnail radius" src="/article/better-way-to-handle-multiple-task-on-flutter-dart/comparing.png" alt="Comparing Result Execute" style="width: 95%;">
</div>

<br/>

Learn concurrency is important if you aware with your application performance, you can see is not hard to implement on your application even your condition is on mid development cause the code so simple you just need to call **Future.wait** and put in the all task on parameter. In this case we use the API for the task but you can adapt it to your application needs.
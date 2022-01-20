---
title: Tulung
description: Tulung is a mobile app with the goal to contribute on social to help many people and make social to have a habit of helping others.
thumbnail: /portfolio/tulung/thumbnail.png
createdAt: 20-1-2022
app: https://play.google.com/store/apps/details?id=com.pixeldev.tulung
tag: [Mobile Developer, Android, Flutter, Dart, Firebase, Firestore]
---

## **Project Purpose and Goal**

Tulung is a mobile app with the goal to contribute on social to help many people and make social to have a habit of helping others and who have an idea for making the app ? It is PT. Anthropos Digital Indonesia, they contact our Pixel Dev Factory to realize the idea, and now you can see the app on [play store](https://play.google.com/store/apps/details?id=com.pixeldev.tulung). My team and I started development on Agustus 2019, in project Tulung we mostly used technology Dart for programming language and Flutter Framework from Dart.

<br/>

## **User Interface**

These are some pictures from Tulung app that can give you an imagining of the app.

<img class="" src="/portfolio/tulung/image1.png" alt="UI Tulung" style="display: inline-block;">
<img class="" src="/portfolio/tulung/image2.png" alt="UI Tulung" style="display: inline-block;">
<img class="" src="/portfolio/tulung/image3.png" alt="UI Tulung" style="display: inline-block;">
<img class="" src="/portfolio/tulung/image4.png" alt="UI Tulung" style="display: inline-block;">

<br/>
<br/>

## **Tech Stack**

Project Tulung use some technology for the development

- Dart (Programming Language)
    
    Dart is a programming language for building the app, this programming language comes from Google and supports multi-platform.
    
- Flutter (Framework)
    
    Creating UI on dart is easier with Flutter and inside this framework have many widgets can we use. Flutter has many advantages like hot reload, in flutter if you changes the code can auto-refresh the app on your phone. And the structure flutter is so pretty.
    
- Firestore (Database)
    
    Firestore is the solution for database we chose, because firestore is a database that can access anywhere and can for multi-app.
    
<br/>

## **Contribute**

In the project Tulung I mostly got tasks on section back end and a little more on front end. In Flutter back end create a function for processing data and getting any data from the database. Is like one of the feature on project Tulung I make, it is a searching helping feature. The feature has a lifecycle process (send notifications to all users with location radius 30 Km from location user request and with same district → user can view detail the problem from probable request help, which user want to solve →  user want to solve the request help → send a notification to user request help → Tulung have 2 type request help question (helper answer on chat the question), action (helper come on location user request help, with a guide from Tulung and solve the problem) → helper reports finished the request help → user verify and reports the helper finished the request help → user request give review and rate). 

Okay, I will disassembly how features work on section get a helper and send notification, first detect radius I use plugin [geolocator](https://pub.dev/packages/geolocator) with this plugin I can get a current latitude longitude device and calculate how long distance user with a helper, and if the data match app will show data request help. For send notification I use [firebase cloud messaging](https://firebase.google.com/products/cloud-messaging), all user subscribe channel can receive signals for notification, and if app wants to send notification on user, just send data on the channel subscribed by user want to send notification. For other section on this feature is just manipulation database firestore without plugin I think it is too long if we discuss it.
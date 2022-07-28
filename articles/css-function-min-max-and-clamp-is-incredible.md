---
title: CSS Function min(), max(), and clamp() is Incredible
description: Website responsive is a thing to do if you be Web Developer, on making a website become responsive have many methods one of them is using these functions, but you still need media query and etc cause this function is great but it is not enough. Even so, it's still worth learning.
thumbnail: /article/css-function-min-max-and-clamp-is-incredible/thumbnail.jpg
createdAt: 28-07-2022
writer: zeetec20
tag: [CSS, Responsive, HTML, Website]
---
# **CSS function min(), max(), and clamp() is incredible**

CSS has many cool functions but for now, we will spotlight these three functions **min,** **max, and clamp.** With this, you can make your responsive website easy and so smooth, in this article I will show you how to use it and I will give you a usage sample.

Website in general for making responsive used a media query, but if you write all CSS for resized elements on a media query the code is too much, then from now on you can try using these functions for making your code less and simple.

<br/>
<br/>

## **Min Usage**

<br/>
<div align="middle">
    <img class="img-thumbnail radius" src="/article/css-function-min-max-and-clamp-is-incredible/min.gif" alt="Sample Cool GitHub Profile" style="width: 95%;">
</div>
<br/>

Min function has a two-parameter, which one is dynamic number you can use dimensions (%, vw, vh, rem) and for the second parameter is a maximal biggest value, if you use on width the second parameter works like  **max-width**  and if you use on font size it will be maximal font size, on simply being can understand like that.

<br/>
<br/>

## **Max Usage**

<br/>
<div align="middle">
    <img class="img-thumbnail radius" src="/article/css-function-min-max-and-clamp-is-incredible/max.gif" alt="Sample Cool GitHub Profile" style="width: 95%;">
</div>
<br/>

Max function, this function does not have the bigger difference, you can think this function is like Min function but it’s reverse version. If on Min function the second parameter works like max-width and for font size is be maximal size, but on Max function is reversed. The second parameter on Max function is be  **min-width**  on width and be minimum size on font size.

<br/>
<br/>

## **Clamp Usage**

<br/>
<div align="middle">
    <img class="img-thumbnail radius" src="/article/css-function-min-max-and-clamp-is-incredible/clamp.gif" alt="Sample Cool GitHub Profile" style="width: 95%;">
</div>
<br/>

The clamp function is my favorite if you ask where the function to prefer use, but you not should do like me, you can use the two functions above according to the needs. And why clamp is my favorite cause in this function you can control minimum and maximal not just only one and if you use this function you not need to think where I should pick to control resize element. After you see the advantages let me explain on technical clamp, this function has a three parameter in first parameter is set for minimum, in second parameter is set for dynamic number, and for third parameter is set for maximum.

<br/>
<br/>

## **Browser Support**

<br/>

**Chrome**
- Desktop (79)
- Android (79)

**Edge**

- Desktop (79)

**Firefox**

- Desktop (75)
- Android (79)

**Opera**

- Desktop (66)
- Android (57)

**Safari**

- Desktop (11.1)
- Android (11.3)
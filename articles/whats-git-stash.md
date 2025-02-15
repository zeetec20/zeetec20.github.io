---
title: What's git stash?
description: Git stash is one of features from Git Version Control, you can use this feature for saving your work temporally on your device without committing.
thumbnail: /article/whats-git-stash/thumbnail.jpg
createdAt: 11-06-2023
writer: zeetec20
tag: [Git, Version Control, Tips and Trick]
---

# **What's git stash?**

<br/>

Git stash is one of features from Git Version Control, you can use this feature for saving your work temporally on your device without committing. Sometimes programmers need to switch tasks immediately even if the changes don’t ready to commit, and the sad truth is git can’t provide checkout to another branch or create a new branch without having previous changes when your current branch still has changed, so it’s the time you need to use git stash.

<br/>
<div align="middle">
    <img class="img-thumbnail radius" src="/article/whats-git-stash/image1.png" alt="Life Cycle Files" style="width: 95%;">
</div>
<br/>

Before you stash changes in your project, you need to know the life cycle of status files in git. So I will explain the meaning of life cycle status files, in git files have few statuses (untracked, unmodified, modified, staged) when you create a new file it will be stated untracked and after you complete the content then need to commit the file, you need to run command **`git add <your file>`**, it is called state staged. So staged is a condition before commit, then after all files are ready on staged you can commit all staged files. After the process before, every file will be stated unmodified and when you change it again the file will be stated as modified. And what after modified? Absolutely the life cycle will continue to repeat.

<br/>
<br/>

### **Stash Files**

Back to the stash file, when files have many statuses absolutely git stash also has many options to stash files. 
<div align="middle">
    <img class="img-thumbnail radius" src="/article/whats-git-stash/image2.png" alt="Option of Git Stash" style="width: 95%;">
</div>
<br/>

- **Stash Modified**
    
    The basic stash is only stashed files modified not including untracked and Ignored files, for do this you need to run the command **`git stash`** it will reset your changes and back your files to before you change.
    
- **Stash Untracked**
    
    Untracked files are not added to reset changes when you just run **`git stash`** you need to add an additional option to your command **`git stash -u`** or the more descriptive version you can use **`—include-untracked`**.
    
- **Stash Ignored**

    Sometimes files need to be ignored in our project to make it flexible and make changes just affect a device, not all devices to run a project. For stash ignored files, is also need the additional option to your command **`-a`** or **`—all`** and the command will be **`git stash -a`** . But you need to be aware of this action cause if you stash ignored files, the files will be deleted, cause git just detects the file, not the content if the file is listed on **`.gitignore`** and the life cycle above is not implemented in this file.
    

And I have some tips about stashing files, For your information you can add a message when you do stash files, for a sample **`git stash save “some descriptive text” -u`**, It will help you to find out the important stash from your list.

<br/>
<br/>

### **Apply Stash**

So after we stash files, how do we apply again the stash? First, we need to check the list of stash and pick the stash which you need to apply for your branch. 

1. **List of Stash**
    
    To check the list stash you can run the command **`git stash list`** it will show the list like the image below.
    <div align="middle">
        <img class="img-thumbnail radius" src="/article/whats-git-stash/image3.png" alt="List of Stash" style="width: 95%;">
    </div>
    <br/>
    
2. **Apply Stash**
    
    After you know which stash is needed to apply on a branch, you directly apply it with the command **`git stash pop stash@{0}`** this command will be applied and also remove it from your list. And if you want to apply stash without removing it from a list you can use the command **`git stash apply stash@{0}`**.
    

It’s not a mandatory thing but I think you need to know about checking the diff stash file, It can help you to show the all changes in your stash before you apply or remove it from your stash list. So for to do that just run the command **`git stash show stash@{0}`** and the changes will be like in the image below.

<div align="middle">
    <img class="img-thumbnail radius" src="/article/whats-git-stash/image4.png" alt="Stash Diff Files" style="width: 95%;">
</div>
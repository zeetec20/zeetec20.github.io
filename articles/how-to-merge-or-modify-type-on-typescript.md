---
title: How to merge or modify type on Typescript
description: Concurrency, in computer science concurrency is a the abillity to dealing with lots or multiple things at once. By using concurrency we can increase performance and speed application, in this article we will try implement to Flutter / Dart.
thumbnail: /article/how-to-merge-or-modify-type-on-typescript/thumbnail.jpg
createdAt: 17-02-2023
writer: zeetec20
tag: [Typescript, Tips and Trick]
---

# **How to merge or modify type on Typescript**

<br/>

[Typescript](https://www.typescriptlang.org), is it Javascript? No, it’s a different language but we can say it’s similar to javascript, the big difference is typescript static type and javascript is dynamic type. One of the reasons I love typescript is cause static type, In language static type you need to declare type on every variable and parameter Besides that, you also need value with the same type if you want re-assignment some variables and when you create some algorithm you must use appropriate type.

Cause we have behavior like that, now we can know or predict the input value and output value it will be useful cause we can reduce the bug when we get information like this. As a sample when you just started learning programming, you will meet errors caused by error type. Further, you will not meet the error type again, cause before you run the program your text editor will check the type and report when your type is wrong. 

So after I explain Typescript let’s enter the topic, sometimes when you use typescript you need to merge or modify your type. for the sample, I will use type object cause this type will be most often used. 

```tsx
type Overwrite<A, B> = Omit<A, keyof B> & B
```

So above I have some code types, inside here I have type [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) its utility type for removing a key from a type of object. Well let’s see the code, here we have [generic types](https://www.typescriptlang.org/docs/handbook/2/generics.html) `A` and `B` it’s for storing the type we need to modify. Generic type `A` is for a target type and `B` is for the second type which will be merged.

```tsx
type User = {
    id: number,
    name: string,
    email: string,
}

type ListUser = Overwrite<User, { id?: null, profile: number }>[]
```

Above is a sample for the usage of the type we build before, in here I create type `User` and type ListUser with use `Ovewrite` type to modify type `User`. To check the final type let's implement on variable.

```tsx
const user: ListUser = [
    {
        name: 'Firman',
        email: 'jusles363@gmail.com',
        profile: 11,
    },
    {
        name: 'Walter White',
        email: 'walterwhite@gmail.com',
        profile: 12,
    },
    {
        name: 'Rick Sanchez',
        email: 'ricksanchez@gmail.com',
        profile: 13,
    }
]
```

It’s a sample if I used type before, then look after I make the id of type object is nullable, I can write data user with no need to write id. So it’s how I modify the type object, you can keep this article, it will be very helpful.
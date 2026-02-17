## Table of Contents

1. [Null vs Undefined](#1-null-vs-undefined)
2. [map() vs forEach()](#2-map-vs-foreach)
3. [== vs ===](#3---vs-)
4. [async/await](#4-asyncawait-in-api-fetching)
5. [Scope in JavaScript](#5-scope-in-javascript)

---

## 1. Null vs Undefined

### Overview

`null` এবং `undefined`—দুটোই JavaScript-এ value না থাকা বোঝাতে ব্যবহৃত হয়, কিন্তু এদের ব্যবহার ও অর্থ আলাদা।

### undefined

JavaScript নিজে থেকে কোনো ভ্যারিয়েবলকে `undefined` দেয়। মানে, ভ্যারিয়েবল ঘোষণা করা হয়েছে, কিন্তু কোনো মান অ্যাসাইন করা হয়নি।

**উদাহরণ:**

```javascript
let x;
console.log(x);
// output: undefined
```

### null

`null` হচ্ছে ডেভেলপার দ্বারা ইচ্ছাকৃতভাবে দেওয়া একটি মান। এটি স্পষ্টভাবে নির্দেশ করে যে কোনো মান নেই।

**উদাহরণ:**

```javascript
let y = null;
console.log(y);
// output: null
```

---

## 2. map() vs forEach()

### map()

`map()` একটি array method যা একটি array-এর প্রতিটি element-এর উপর একটি function চালায় এবং একটি **নতুন array রিটার্ন করে**।

**উদাহরণ:**

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
// output: [2, 4, 6, 8]
```

**ব্যবহার:** নতুন array দরকার হলে `map()` ব্যবহার করব।

### forEach()

`forEach()` ও প্রতিটি element-এর উপর function চালায়, কিন্তু **কিছুই return করে না** (`undefined` রিটার্ন করে)।

**উদাহরণ:**

```javascript
const numbers = [1, 2, 3, 4];
numbers.forEach((num) => {
  console.log(num * 2);
});
```

**ব্যবহার:** শুধু loop চালিয়ে কাজ করতে হলে `forEach()` ব্যবহার করব।

### তুলনা

| বৈশিষ্ট্য  | map()                     | forEach()                   |
| ---------- | ------------------------- | --------------------------- |
| Return মান | নতুন array                | undefined                   |
| ব্যবহার    | ডেটা ট্রান্সফরম করার সময় | শুধু operation চালানোর সময় |
| চেইনিং     | সম্ভব                     | সম্ভব নয়                   |

---

## 3. == vs ===

### == (Loose Equality)

`==` অপারেটর টাইপ কনভার্সন (type coercion) করে তারপর ভ্যালু তুলনা করে। শুধু ভ্যালু চেক করে, bug হওয়ার সম্ভাবনা বেশি।

**উদাহরণ:**

```javascript
5 == "5"; // true
null == undefined; // true
```

### === (Strict Equality)

`===` অপারেটর টাইপ কনভার্সন করে না। **টাইপ এবং ভ্যালু—দুটোই একই হতে হবে**। টাইপ + ভ্যালু চেক করে, bug হওয়ার সম্ভাবনা কম।

**উদাহরণ:**

```javascript
5 === "5"; // false
null === undefined; // false
```

### সুপারিশ

**সর্বদা `===` ব্যবহার করুন** কারণ এটি আরও নিরাপদ এবং পূর্বাভাসযোগ্য।

---

## 4. async/await in API Fetching

### সংজ্ঞা

`async`/`await` আমাদের asynchronous কোডকে synchronous-এর মতো পরিষ্কার ও সহজভাবে লিখতে দেয়।

- **async** → একটি function কে asynchronous করে
- **await** → Promise resolve না হওয়া পর্যন্ত অপেক্ষা করে

### API Fetching উদাহরণ

```javascript
async function getUsers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### async/await এর গুরুত্ব

| সুবিধা                      | বিবরণ                                                         |
| --------------------------- | ------------------------------------------------------------- |
| **কোড readability**         | Asynchronous হলেও কোড দেখতে synchronous-এর মতো                |
| **Error handling**          | `try...catch` দিয়ে error ধরা যায়                            |
| **Callback hell এড়ানো**    | Nested `.then()` বা callback দরকার হয় না                     |
| **Debug সহজ**               | Line-by-line debug করা যায়                                   |
| **Real-world API handling** | Multiple API call sequential বা parallel ভাবে handle করা যায় |

---

## 5. Scope in JavaScript

### সংজ্ঞা

Scope হলো JavaScript-এর সেই জায়গা (area), যেখানে কোনো variable বা function access করা যায়। "কোন ভ্যারিয়েবল কোথা থেকে ব্যবহার করা যাবে"—এটাই Scope।

### Global Scope

যেসব ভ্যারিয়েবল বা function **সব জায়গা থেকে ব্যবহার করা যায়**, সেগুলো Global Scope-এ থাকে।

**উদাহরণ:**

```javascript
let siteName = "My Website";

function showName() {
  console.log(siteName);
}

showName();
// output: My Website
```

### Function Scope

যেসব ভ্যারিয়েবল **function-এর ভেতরে declare করা হয়**, সেগুলো শুধু সেই function-এর ভেতরেই ব্যবহারযোগ্য।

**উদাহরণ:**

```javascript
function calculate() {
  var total = 100;
  console.log(total);
}

calculate();
console.log(total);
// Error: total is not defined
```

### Block Scope

`{ }` (block)-এর ভেতরে declare করা ভ্যারিয়েবল block-এর বাইরে থেকে access করা যায় না।

**উদাহরণ:**

```javascript
if (true) {
  let x = 10;
  const y = 20;
  console.log(x, y);
}

console.log(x, y);
// Error: x and y are not defined
```

**নোট:** `let` ও `const` → block-scoped; `var` → function-scoped

### সারসংক্ষেপ

```
Global  → সব জায়গায় পাওয়া যায়
Function → শুধু function-এর ভেতরে
Block   → শুধু { } এর ভেতরে
```

---

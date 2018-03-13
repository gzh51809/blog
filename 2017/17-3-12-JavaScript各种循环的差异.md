# JavaScript各种循环的差异

## 能不能break？

### forEach

```js
const flagArray = [
  false,
  null,
  0,
  true,
  false
]

const check = function(arr) {
  arr.forEach(function(item, index) {
    console.log(index)
  if(item){
    console.log('enter, index = ' + index)
    return true
  }
})
  return false 
}


console.log('result: ' + check(flagArray))

// 0
// 1
// 2
// 3
// "enter, index = 3"
// 4
// "result: false"
```


### for

```js
var flagArray = [
  false,
  null,
  0,
  true,
  undefined
]

var check = function(arr) {
  for(var i = 0, l = arr.length; i < l; i++){
   console.log(i)
   if(arr[i]){
    console.log('enter, index = ' + i)
    return true
  }
 }
}

console.log(check(flagArray))

// 0
// 1
// 2
// 3
// "enter, index = 3"
// true
```


### for...in

```js
const flagArray = [
  false,
  null,
  0,
  true,
  undefined
]

const check = function(arr) {
  for(var key in arr){
   console.log(arr[key]); 
   if(arr[key]){
    console.log('enter, index = ' + arr[key])
    return true
  } 
 }
}

console.log('result: ' + check(flagArray))

// false
// null
// 0
// true
// "enter, index = true"
// "result: true"
```

### for...of

```js
const flagArray = [
  false,
  null,
  0,
  true,
  false
]

const check = function(arr) {
    for (var flag of arr) {
        console.log(flag)
        if (flag) { 
            console.log('enter, value = ' + flag)      
            return true;
        }
     }

  return false

  }

console.log('result: ' + check(flagArray))

// false
// null
// 0
// true
// enter, value = true
// result: true
```

综合以上测试结果，得出结论：

1. forEach 无法 break 出当前循环，也就说：在 return 之后仍然会继续执行剩下的所有循环，这实际上和 forEach 的实现机制有关。
2. for, for...in, for...of 均能 break 出当前循环。


# Shell疑难杂症

## shell中 $( ) 与 `` 的区别 ?

作用：都用作`命令替换` —— 也就是先完成里面的命令行，再将结果替换出来，组成新的命令行。
区别：``在某些情况下需要转义，而`$()`不用，但不是所有的类unix系统都支持`$()`

## shell获取类似`node`的`__dirname`和`process.cwd()` ?

`__dirname`: 

```bash
echo $(cd `dirname $0`; pwd;)                   # __dirname
echo $(`cd $(cd \`dirname $0\`; pwd)`; pwd;)    # __dirname 的上一层
```

## 获取类似`nodejs`的`__filename`：

```bash
echo $(basename $0)
```

## 获取文件夹下的所有文件：

```bash
#!bin/sh

# 这种方式获取的都是绝对路径
for file in $dir_tmp/* 
do
    if test ##f $file
    then
        echo $file is File
    fi
    if test ##d $file
    then
        echo $file is Dir
    fi
done
```

这种方式可以只获取文件名：

    NF 表示的是浏览记录的域的个数 
    $NF 表示的最后一个Field（列），即输出最后一个字段的内容

```bash
    for bash in `ls ##lh $dir_name | grep "^##" | awk ##F ' ' '{print $NF}'`
    # ...
```

## shell 函数

```bash
fn () {
    # code
}

fn params
```

!## 注意：Shell 函数返回值只能是整数，一般用来表示函数执行成功与否，0表示成功，其他值表示失败。如果 return 其 他数据，比如一个字符串，往往会得到错误提示:`numeric argument required`。

## shell 重定向 >> 和 > 的区别？

- `>`: 是定向输出到文件，如果文件不存在，就创建文件；如果文件存在，就将其清空；
- `>>`: 将输出内容追加到目标文件中。如果文件不存在，就创建文件；如果文件存在，则将新的内容追加到那个文件的末尾，该文件中的原有内容不受影响。

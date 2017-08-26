# Stream

举个例子，如果把文件比作装水的桶，把文件的内容比作水，我们想要从把文件A的内容传递给文件B，就好像我们要把桶A中的水放到桶B中去，我们可以用一个管子（pipe）来连接两个桶————这就是流。

![](img/img-01.png)

回顾一下`nodejs`中流的类型:

- Readable: 可读流
- Writable：可写流
- Duplex：可读写的流
- Transform: 在读写过程中可以修改和变换数据的Duplex流

## 可读流

```js
var data = '';
var readerStream = fs.createReadStream('input.txt','utf-8'); // 或 readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err);
});
```
    
## 可写流 
   
```js
var data = 'ulivz - Open Source';
var writeStream = fs.createWriteStream('output', 'utf-8');

writeStream.write(data);
writeStream.end();

writeStream.on('finish', function() {
    console.log("写入完成。");
});

writeStream.on('error', function(err){
   console.log(err.stack);
});
```   

## 管道流

```js
var readerStream = fs.createReadStream('input.txt');
var writerStream = fs.createWriteStream('output.txt');

readerStream.pipe(writerStream);
```

## 链式流

```js
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

## Stream的一些点

- Writeable 和 Readable 流都会将数据存储到内部的储存（Buffer）中；

- 当可读流的实现调用 `stream.push(chunk)`，如果流的消费者没有调用 `stream.read()` ，这些数据会始终存在内部队列中，直到被消费；

- 当可读缓存达到 `highWaterMark` 指定的阈值时，流会停止从底层资源读取数据；

- 同理，可写流调用 `writable.write(chunk)` 也会将数据放到缓存；

- 当可写缓存 < highWaterMark 时，writable.write() 返回true；
- 当可写缓存 > highWaterMark 时，writable.write() 返回false；__同时在恰当的时机将触发 drain 事件，这时才能继续向流中写入数据。__

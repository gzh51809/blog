# SourceTree 跳坑攻略

标签（空格分隔）： SourceTree

---

## 是福还是坑

用过`SourceTree`的人都会选择放弃掉Github官方难看又难看的GUI，但是它也有一点非常坑，一般可能需要登陆多次才能通过账户验证。唯一的建议是：
> 请去官网下载最新正版。



## 用户名和邮箱地址的作用

如果不全局设定用户名和邮箱地址，Github会禁止你的提交（因为G不知道你是谁）

## 查看

用户名和邮箱地址是本地git客户端的一个可配置的变量，你可以这样查看：

```
git config user.name

git config user.email
```

## 修改

修改直接在上述命令中添加赋值即可：

```
git config --global user.name "name"

git config --global user.email "email"
```

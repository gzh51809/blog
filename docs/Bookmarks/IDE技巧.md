# IDE技巧

## WebStrom

Title|Links
---|---
Emmet：HTML/CSS代码快速编写神器|[Click Here](http://www.iteye.com/news/27580)


## cmder

解决cmder中文乱码：
打开设置; Startup-Environment; 添加 set LANG=zh_CN.UTF-8

## cmder Alias

```markdown
gitconfig=vi C:\Users\Administrator\.gitconfig
cmdalias=vim D:\Electron Program Files\Cmder\config\user-aliases.cmd
```

## cmder默认启动目录

`win + alt + p`打开设置，进入`Startup > Tasks`:

<img style="width: 70%" src="./Bookmarks/img/bm-01.png" alt="">

修改内容如下：
```cmd
cmd /k "%ConEmuDir%\..\init.bat"  -new_console:d:%USERPROFILE%
```

```cmd
cmd /k "%ConEmuDir%\..\init.bat"  -new_console:d:D:\
```



## Git Alias

```markdown
[user]
	email = 472590061@qq.com
	name = toxichl
[alias]
  # readme = "!f(){echo '# New App' > README.md;};f"
	ad = add .
	au = "!f(){ git add . && git commit -m 'Simple Update' && git push;};f"
	c = commit -m 'Simple Update'
	cm = commit
	p = push
	pu = push -u origin master
	st = status
  ck = checkout
	br = branch
	addre = remote add origin
	confg = config --global
	confgls = config --global -l
```



# 我的git常用命令

> `git commit -am`

`git commit -m`用于提交所有暂存区的文件；而`git commit -am`用于提交所有跟踪过的文件（如果是跟踪过的文件会立即添加到暂存区中）



> `git pull`


我们都知道`git pull`等于`git fetch` + `git merge`，但当你在一个分支上`git pull`的时候，实际上运行的是`git pull origin master`，因此，你并不能将分支上的修改pull下来，正确的姿势是：

    $ git pull origin branchName
   

> `git log master..dev`

查看`dev`比`master`多提交了哪些内容
     
    
> `git log master..dev`

查看`master`比`dev`多提交了哪些内容
    
    
> `git log dev...master`    

比较两者commit的差异
   
    
> `git diff dev master`
    
比较两者code的差异，也可以在dev分支上直接 git diff master...
    
    
> `git branch -m a b`
    
将分支a重命名为b

> `git reset HEAD^`

撤销最近的一次commit

> `git commit --amend`

重新修改最近的一次commit

> `git config`

    $ git config --global user.name "ulivz"
    $ git config --global user.email chl814@foxmail.com
    
    
    
    




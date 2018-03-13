# 在gitconfig中写自定义脚本

```bash
blog2 = "!node -r fs -e \" console.log(fs.readdirSync(__dirname)); \" "
```

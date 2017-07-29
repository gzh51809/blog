# CircleCI

## 相关书签

描述|链接
---|---
Docs 2.0|[Docs 2.0](https://circleci.com/docs/2.0/)


## 基本配置（2.0）

```yaml
version: 2
jobs:
  build:
    working_directory: ~/circulate
    docker:
      - image: python:3.6.0
    steps:
      - checkout
      - run: pip install -r requirements/dev.txt
```

每一个 `config.yml` 都应该有一个名为 `build` 的 `job` 包含以下：
- 命令将要执行的工作目录
- 底层技术的执行者，在例子中是`docker`

- Working directory where commands will be executed.

Every `config.yml` file must have a job named `build` that includes the following:
 
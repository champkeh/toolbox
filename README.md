# playground

## 该项目的搭建过程
```shell script
# 添加对 toolbox 仓库的远程引用
git remote add toolbox git@github.com:champkeh/toolbox.git

# 把 dist 目录作为 subtree 设置为 toolbox 仓库
git subtree add --prefix dist toolbox master

# 修改项目下面的 .gitignore 文件，确保 dist 目录被 git 托管

# 编译该项目，生成最新的 dist 目录
npm run build

# 推送到 subtree
git subtree push --prefix dist toolbox master
```

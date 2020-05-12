# playground

### 项目部署
```shell script
npm run build
git checkout -b gh-pages
git add -f dist
git commit -m 'first commit'
git subtree push --prefix dist origin gh-pages
```

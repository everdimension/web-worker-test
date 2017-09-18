git checkout gh-pages

# copy all files from master branch
git checkout master -- ./

# we should remove "build" path from .gitignore
gitignoreContents=$(cat .gitignore)
echo ${gitignoreContents/build} > .gitignore

npm i
rm -rf build/*
npm run build
git add .
git commit -m 'build'
git push

git checkout master

git checkout gh-pages
git checkout master -- ./
npm i
rm -rf build/*
npm run build
git add .
git commit -m 'build'
git push

git checkout master

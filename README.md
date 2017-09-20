## UPDATE
Read this issue for explanation and solution: https://github.com/webpack/webpack/issues/5697  
*TLDR*: babel transpiles code and reads `arguments` variable, this operation is slow in Chrome.

Solution: use `babel-plugin-transform-es2015-parameters@^v7.0.0` and use
["loose" mode](https://github.com/babel/babel-preset-env#loose)

## Intro

The code here measures performance of a
[function](https://github.com/everdimension/web-worker-test/blob/master/src/doComputations.js)
that does some heavy computations with lots
of iterations&nbsp;(100&#8239;000&#8239;000 by default).

The performance of the function itself does not matter. The main purpose is
to compare how long it takes to run this function in different conditions:
code bundled with webpack and code untouched by webpack.

## Surprisingly bad Chrome performance
**The peculiarity that I've noticed** is that the function takes **much** longer
to run in Chrome (latest version, `61.0.3163.91`) when it is *bundled* with webpack.
See [source code](https://github.com/everdimension/web-worker-test/tree/master/src)
for details.

My results in different browsers (on mac os `10.12.6`):

#### Safari (`10.1.2`):
* Not bundled: 4625ms (slower)
* Bundled with webpack: 3078ms (faster)

#### Firefox (`55.0.3`):
* Not bundled: 5543ms
* Bundled with webpack: 5470ms

#### Chrome (`61.0.3163.91`):
* Not bundled: 7539ms (faster)
* Bundled with webpack: 39781ms (**5 times slower**)

Why does chrome perform so much worse when the code is wrapped
with standard webpack bootstrapping stuff?...

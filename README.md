## Intro

The code here measures performance of a
[function](https://github.com/everdimension/web-worker-test/blob/master/src/doComputations.js)
that does some heavy computations with lots
of iterations&nbsp;(100&#8239;000&#8239;000 by default).

The performance of the function itself does not matter. The main purpose is
to compare how long it takes to run this function in different conditions:
in the main thread and in the main worker.

As expected, it takes approximately the same time in a Worker and in the main
thread, but when it is executed in a Worker the interface is not blocked.

## Surprisingly bad Chrome performance
**The peculiarity that I've noticed** is that the function takes **much** longer
to run in Chrome (latest version, `61.0.3163.91`) when it is `imported` with webpack.
See [source code](https://github.com/everdimension/web-worker-test/tree/master/src)
for details.

My results in different browsers (on mac os `10.12.6`):

#### Safari (`10.1.2`):
* Web Worker without imports and not bundled with webpack: 4131ms
* Web Worker with imports bundled with webpack: 4058ms
* Main thread: 3060ms

#### Firefox (`55.0.3`):
* Web Worker without imports and not bundled with webpack: 7726ms
* Web Worker with imports bundled with webpack: 7334ms
* Main thread: 5410ms

#### Chrome (`61.0.3163.91`):
* Web Worker without imports and not bundled with webpack: 13329ms
* **Web Worker with imports bundled with webpack: 45890ms**
* **Main thread: 38866ms**

The last two chrome results are extremely slow. I wonder why.

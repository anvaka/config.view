# config.view

Adds view settings to [ngraph.pixel](https://github.com/anvaka/ngraph.pixel)

![View configuration UI](https://raw.githubusercontent.com/anvaka/config.view/master/demo.png)

# usage
If you are using `ngraph.pixel` this widget comes included by default (starting
from version `0.1.5`). To enable it in the `ngraph.pixel` pass the `settings: true`
argument to the renderer constructor:

``` js
var render = require('ngraph.pixel');
var renderer = render(graph, {
  settings: true
});
```

# install

With [npm](https://npmjs.org) do:

```
npm install config.view
```

# license

MIT

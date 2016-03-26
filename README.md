# file-change-watcher

Installation:

```
npm install file-change-watcher
```

Example of usage:

```JavaScript
var fcw = require('file-change-watcher')
// ..	
fcw.watchFileChange('test.txt', function(err, data, fileSizeDiff, mtime) {
      console.log('err:', err, 'data:', data,
              'fileSizeDiff:', fileSizeDiff, 'mtime:', mtime);
});
```

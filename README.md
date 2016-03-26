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
      console.log('err:', err, // null if no error
                  'data:', data, // content that has been added 
                                 //  to the watched file(null if fileSizeDiff <= 0)
                  'fileSizeDiff:', fileSizeDiff, // difference between current and
                                                 //  past file size
                  'mtime:', mtime); // Modification time
});
```

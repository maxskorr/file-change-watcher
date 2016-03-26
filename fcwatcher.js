var fs = require('fs');
var cproc = require('child_process');

// Return tail of a file specified
//
// * filepath - target file to get tail of
// * mode - specifies the meaning of `param`;
//    put 'b' for bytes, 'l' for lines
// * param - number of lines(mode = 'l'), or bytes(mode = 'b')
//    to read from the end of the file specified
// * callback - takes `err` - if there is any error,
//    and `data`(result of tail operation) params
function tailFile(filepath, mode, param, callback) {
	cproc.exec(`tail -${mode == 'b' ? 'c' : 'n'} ${param} ${filepath}`, 
		(err, stdout, stderr) => {
        
        callback(err, err ? stderr : stdout);
    });
}

//
// Invoked when a change to the file specified
//  has just happend.
//
// * filepath - the file watched
// * callback - takes `err` if there was an error,
//    `data` for the data read from the file,
//    `fileSizeDiff` for the difference between
//    file size and present, `mtime` - the time
//    of last file modification
function watchFileChange(filepath, callback) {
	fs.watchFile(filepath, (curr, prev) => {
	  var fileSizeDiff = curr.size - prev.size;

	  tailFile(filepath, 'b', fileSizeDiff, (err, data) => {
	  	callback(err, fileSizeDiff > 0 ? data : null, fileSizeDiff, curr.mtime);
	  });
	});
}

module.exports = {
	watchFileChange: watchFileChange,
	tailFile: tailFile
}

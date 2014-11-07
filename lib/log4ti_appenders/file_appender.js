/******************************************************************************
* Copyright         : 2014 Ophir Oren (WEBe)
* File Name         : console_appender.js
* Description       : This file is an implementation of an appender for log4ti
* 					  logging engine.
* 					  This appender logs messages to the a text file on disk
* 					  and also implements sending the data to a remote server.
*                    
* Revision History  :
* Date				Author    		Comments
* ---------------------------------------------------------------------------
* 06/11/2014		Ophir Oren		Created.
*
/*****************************************************************************/

var _fullFilename,
	_maxFileSize,
	_serverUrl;

module.exports = {
	configure: function(cfg) {
		if (!cfg) { // default values
			cfg = { };
		}
		
		var filename = cfg.filename || 'log.txt';
		var fileDirectory = cfg.filedirectory || '';
		_maxFileSize = cfg.maxFileSize || 512;
		_serverUrl = cfg.serverUrl || null;
		
		_fullFilename = Ti.Filesystem.applicationDataDirectory + '//' + (fileDirectory ? fileDirectory + '//' : '') + filename;
	},
	
	write: function(l, m) {
		try {
			if (!m) return; // if no data was sent to be written don't do anything
			
			var data;
			
			// first, check if the file exists
			var file = Ti.Filesystem.getFile(_fullFilename);
			if (file.exists()) { // file exists
				if (file.size / 1024 >= _maxFileSize) { // log file size exeeds max file size
					if (_serverUrl) { // if has server url post the file to the url
						var httpClient = Ti.Network.createHTTPClient({
							onload: function() {
								file.deleteFile();
								data = getLogHeader();
								writeFile();
							}
						});
						httpClient.open("POST", _serverUrl);
						httpClient.send(file);
						
						httpClient = null;
					}
				}
				else {
					data = file.read();
					writeFile();
				}
			}
			else { // file doesn't exist
				data = getLogHeader();
				writeFile();
			}
			
			function getLogHeader() {
				return '';
			};
			
			function writeFile() {
				Ti.API.info('writing file...' + m);
				file.write(data + '\n' + m);
				file = null;
			};
		}
		catch(ex) {
			Ti.API.error(ex);
		}
	},
	
	dispose: function() {
		
	}
};
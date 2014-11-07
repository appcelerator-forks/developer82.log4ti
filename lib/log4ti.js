/******************************************************************************
* Copyright         : 2014 Ophir Oren (WEBe)
* File Name         : log4ti.js
* Description       : The main loggin engine.
*                    
* Revision History  :
* Date				Author    		Comments
* ---------------------------------------------------------------------------
* 06/11/2014		Ophir Oren		Created.
*
/*****************************************************************************/

var logger;
var _needRebuild = true;
var _appenders = [];
var _appendersMapping = [];
var _loggingLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'stackTrace'];

exports.configuration = {
	includeLineNumbers: false,
	
	addLevel: function(level) {
		_loggingLevels.push(level);
		_needRebuild = true;
	},
	
	loadAppender: function(name, appender, configuration) {
		// validate appender name
		if (!name) throw 'bad appender name';
		if (_appenders[name]) throw 'appender name already in use';
		
		// validate appender
		if (!appender) throw 'no appender was supplied';
		
		// initiate appender
		var obj = require(appender);
		switch (typeof obj) {
			case 'object':
				_appenders[name] = appender;
				break;
			case 'function':
				_appenders[name] = new (require(appender))();
				break;
			default:
				throw 'unknown appender object';
		}
			
		obj.configure(configuration);
	},
	
	mapAppender: function(name, levels) {
		// validate appender name
		if (!name) throw 'bad appender name';
		if (!_appenders[name]) throw 'appender "' + name + '" was not found. you must load appenders before mapping them.';
		
		for (var i = 0; i < levels.length; i++) {
			var levelName = levels[i];
			if (!_appendersMapping[levelName])
				_appendersMapping[levelName] = [];
			
			_appendersMapping[levelName].push(name);
			
			levelName = null;
		}
		
		_needRebuild = true;
	}
};

exports.createLogger = function() {
	if (!logger || _needRebuild) {
		buildLogger();
	}
	
	return logger;
};

function buildLogger() {
	logger = {};
	
	function functionMaker(level) {
		return function(m) {
			var appenderMap = _appendersMapping[level];
			if (!appenderMap) return;
			
			if (exports.configuration.includeLineNumbers && level != 'stackTrace') {
				var lineNumber = getLineNumber();
				if (lineNumber) m += ' line ' + lineNumber;
			}
			
			if (level == 'stackTrace') {
				var stacktrace = getStacktrace();
				if (stacktrace) m += '\n' + stacktrace;
			}
			
			for (var i = 0; i < appenderMap.length; i++) {
				var appender = _appenders[appenderMap[i]];
				if (typeof appender === 'string')
					appender = require(appender);
				
				
				appender.write(level, m);
			}
		};
	};
	
	for (var i = 0; i < _loggingLevels.length; i++) {
		var level = _loggingLevels[i];
		logger[level] = functionMaker(level);
	}
	
	_needRebuild = false;
};

function getStacktrace() {
	var error = new Error();
	if (error.stack) return error.stack;
	return null;
};

function getLineNumber() {
	var stacktrace = getStacktrace();
	if (!stacktrace) return null;
	
	var errorLines = stacktrace.split("\n");
	var errorIndex = Math.min(3, errorLines.length-1);
	var errorLine = errorLines[errorIndex];
	return errorLine;
};

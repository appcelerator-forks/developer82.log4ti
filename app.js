/******************************************************************************
* Copyright         : 2014 Ophir Oren (WEBe)
* File Name         : app.js
* Description       : Test script for log4ti
*                    
* Revision History  :
* Date				Author    		Comments
* ---------------------------------------------------------------------------
* 06/11/2014		Ophir Oren		Created.
*
/*****************************************************************************/

//
// log4ti configuration
// this should be configured only once
//
var log4ti = require('log4ti'); // require the module
	log4ti.configuration.includeLineNumbers = true; // include line numbers (when possible)
		
	log4ti.configuration.addLevel('myCustomLevel'); // adding a custom logging level
	
	// load appenders
	log4ti.configuration.loadAppender('consoleAppender', 'log4ti_appenders/console_appender');
	log4ti.configuration.loadAppender('fileAppender', 'log4ti_appenders/file_appender');
	
	// attach appenders to levels
	log4ti.configuration.mapAppender('consoleAppender', ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'stackTrace']);
	log4ti.configuration.mapAppender('fileAppender', ['warn', 'error', 'fatal', 'myCustomLevel']);
	

//
// Usage example
//
var logger = require('log4ti').createLogger(); // get the logger object

	logger.trace('trace level logging example'); // will be outputed to console appender
	logger.debug('debug level logging example'); // will be outputed to console appender 
	logger.info('info level logging example'); // will be outputed to console appender
	logger.warn('warn level logging example'); // will be outputed to console appender and file appender
	logger.error('error level logging example'); // will be outputed to console appender and file appender
	logger.fatal('fatal level logging example'); // will be outputed to console appender and file appender
	logger.stackTrace('stacktrace level logging example'); // will be outputed to console appender
	logger.myCustomLevel('custom level logging example'); // will be outputed to file appender


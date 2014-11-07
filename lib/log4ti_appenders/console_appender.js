/******************************************************************************
* Copyright         : 2014 Ophir Oren (WEBe)
* File Name         : console_appender.js
* Description       : This file is an implementation of an appender for log4ti
* 					  logging engine.
* 					  This appender logs messages to the console.
*                    
* Revision History  :
* Date				Author    		Comments
* ---------------------------------------------------------------------------
* 06/11/2014		Ophir Oren		Created.
*
/*****************************************************************************/

module.exports = {
	configure: function(cfg) { },
	
	write: function(l, m) {
		switch(l) {
			case 'trace':
				Ti.API.trace(m);
				break;
				
			case 'debug':
				Ti.API.debug(m);
				break;
				
			case 'info':
				Ti.API.info(m);
				break;
				
			case 'warn':
				Ti.API.warn(m);
				break;
				
			case 'error':
				Ti.API.error(m);
				break;
				
			case 'fatal':
				Ti.API.error(m);
				break;
				
			case 'stackTrace':
				break;
				
			default:
		}
	},
	
	dispose: function() { }
};

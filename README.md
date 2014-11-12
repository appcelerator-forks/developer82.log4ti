# log4ti - Titanium logger
##### A log4j/log4net logger class implementation for Appcelerator Titanium projects
This project is a logger class for Titanium projects in the style of log4x. It allows specifing logging levels and attaching them to different log appenders.


## How to use

You can find a working example in attached app.js file.

First configure log4ti (you can do that only once when starting your app)
```
// configure log4ti in self calling anonymous function
(function() {
    var log4ti = require('log4ti'); // require the module
        log4ti.configuration.includeLineNumbers = true; // include line numbers (when possible)
    
        log4ti.configuration.addLevel('myCustomLevel'); // adding a custom logging level
        
        // load appenders
        log4ti.configuration.loadAppender('consoleAppender', 'log4ti_appenders/console_appender');
        log4ti.configuration.loadAppender('fileAppender', 'log4ti_appenders/file_appender');
        
        // attach appenders to levels
        log4ti.configuration.mapAppender('consoleAppender', ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'stackTrace']);
        log4ti.configuration.mapAppender('fileAppender', ['warn', 'error', 'fatal', 'myCustomLevel']);
})();
```

When you want to log somewhere in your code
```
var logger = require('log4ti').createLogger(); // get the logger object
    logger.trace('trace level logging example');
    logger.debug('debug level logging example');
    logger.info('info level logging example');
    logger.warn('warn level logging example');
    logger.error('error level logging example');
    logger.fatal('fatal level logging example');
    logger.stackTrace('stacktrace level logging example');
    logger.myCustomLevel('custom level logging example');
```

## TODO

* Add AlertAppender
* Add header feature to file appender
* Add option to configuration logger with json object
* Add option to load configuration from configuration file (should be done after json configuration is implemented)

## Further Reading

You can have more information about this project (and other stuff I do) on my blog at http://developer82.webe.co.il

## License

The MIT License (MIT)

Copyright (c) 2014 Ophir Oren

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

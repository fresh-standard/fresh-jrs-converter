fresh-jrs-converter
===================
[![Latest release][img-release]][latest-release]
[![Build status (MASTER)][img-master]][travis-url-master]

*Convert résumés and CVs between FRESH and JSON Resume formats.*

## Use

```javascript
var conv = require('fresh-jrs-converter');
var resume = { /* A FRESH or JSON Resume object */ };

// Convert to FRESH
var freshResume = conv.toFRESH( resume );

// Convert to JSON Resume
var jrsResume = conv.toJRS( resume );
```

## License

MIT. See [LICENSE.md][lic] for details.

[lic]: https://github.com/fluentdesk/fresh-jrs-converter/blob/master/LICENSE.md
[img-release]: https://img.shields.io/github/release/fluentdesk/fresh-jrs-converter.svg?label=version
[img-master]: https://img.shields.io/travis/fluentdesk/fresh-jrs-converter/master.svg
[travis-url-master]: https://travis-ci.org/fluentdesk/fresh-jrs-converter?branch=master
[latest-release]: https://github.com/fluentdesk/fresh-jrs-converter/releases/latest

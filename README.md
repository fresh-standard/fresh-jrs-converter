fresh-jrs-converter
===================
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

MIT. See [LICENSE.md][1] for details.

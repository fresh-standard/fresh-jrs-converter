fresh-jrs-converter
===================
[![Latest release][img-release]][latest-release]
[![Build status (MASTER)][img-master]][travis-url-master]

*Convert résumés and CVs between [FRESH][f] and [JSON Resume][j] formats.*

## Use

### Command Line

Install [HackMyResume][hmr] and run the `CONVERT` command.

```bash
hackmyresume convert resume.json converted-resume.json
```

### API

Install the `fresh-jrs-converter` module:

```bash
npm i fresh-jrs-converter
```

Call the `toFRESH` or `toJRS` method:

```javascript
var converter = require('fresh-jrs-converter');
var resume = { /* A FRESH or JSON Resume object */ };

// Convert to FRESH
var freshResume = converter.toFRESH( resume );

// Convert to JSON Resume
var jrsResume = converter.toJRS( resume );
```

## License

MIT. See [LICENSE.txt][lic] for details.

[lic]: LICENSE.txt
[img-release]: https://img.shields.io/github/release/fresh-standard/fresh-jrs-converter.svg?label=version
[img-master]: https://img.shields.io/travis/fresh-standard/fresh-jrs-converter/master.svg
[travis-url-master]: https://travis-ci.org/fresh-standard/fresh-jrs-converter?branch=master
[latest-release]: https://github.com/fresh-standard/fresh-jrs-converter/releases/latest
[f]: https://resume.freshstandard.org
[j]: http://jsonresume.org
[hmr]: https://fluentdesk.com/hackmyresume

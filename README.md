fresh-jrs-converter
===================
[![Latest release][img-release]][latest-release]
[![Build status (MASTER)][img-master]][travis-url-master]

*Convert résumés and CVs between [FRESH Résumé Schema][f] and [JSON Résumé][j].*

## Use

### Command Line

The easiest way to use the converter is to install [HackMyResume][hmr] and run
the `CONVERT` command.

```bash
hackmyresume convert resume.json converted-resume.json
```

### API

To use the module in code, first install the `fresh-jrs-converter` module via
NPM.

```bash
npm i fresh-jrs-converter --save
```

Then call the `toFRESH` or `toJRS` method:

```javascript
var converter = require('fresh-jrs-converter');
var resume = { /* A FRESH or JSON Resume object */ };

// Convert to FRESH
var freshResume = converter.toFRESH( resume );

// Convert to JSON Resume
var jrsResume = converter.toJRS( resume, opts );
```
That's it!

#### Preliminary JSON Resume 1.0.0 support

When converting a resume from FRESH to JSON Resume, set the `edge` option to
`true` to emit resume properties, like `projects` and `meta`, that appear in the
latest [1.0.0 candidate version of the JSON Resume schema][1] but which are
missing from the [latest official 0.16.0 NPM release][2].

```js
// Convert to JSON Resume
var jrsResume = converter.toJRS( resume, { edge: true } );
```

When converting from JSON Resume to FRESH, this consideration doesn't apply
because the FRESH schema provides an equivalent representation of all JSON
Resume sections, collections, and properties.

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
[1]: https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json
[2]: https://www.npmjs.com/package/resume-schema

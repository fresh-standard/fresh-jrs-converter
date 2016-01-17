/**
Test routines for fresh-jrs-converter.
@module text-converter.js
@license MIT. See LICENSE.md for details.
*/

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , CONVERTER = require('../src/index')
  , validator = require('is-my-json-valid')
  , FRESCA = require('fresca')
  , _ = require('underscore');

// Get a dossier of test resumes
var resumes = require('fresh-test-resumes');

var _rF, _rJ;

function isValid( r ) {
  // https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // Allow YYYY, YYYY-MM, and YYYY-MM-DD date formats
  // Allow empty string "" or " " etc as URI
  var validate = validator( FRESCA, {
    formats: {
      date: /^\d{4}(?:-(?:0[0-9]{1}|1[0-2]{1})(?:-[0-9]{2})?)?$/,
      uri: /^(?:[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*)|\s*$/
    }
  });
  var ret = !!validate( r );
  if( !ret )
    console.log(validate.errors);
  return ret;
}

describe('CONVERT', function () {

    _.each( resumes.fresh, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) { //[1]
        it( key + ' to JSON Resume format', function () {
          expect(function() {
            _rJ = CONVERTER.toJRS( val );
            _rF = CONVERTER.toFRESH( _rJ );
          }).to.not.throw();
        });
      }

    });

    _.each( resumes.jrs, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) {//[1]
        it( key + ' to FRESH format', function () {
          expect(function() {
            _rF = CONVERTER.toFRESH( val );
            _rJ = CONVERTER.toJRS( _rF );
          }).to.not.throw();

          var isv = isValid( _rF );
          expect(isv).to.be[ key !== 'empty' ? 'true' : 'false' ];
        });
      }

    });

});

// [1]: Ignore broken resumes (invalid JSON), which are loaded as strings
//      instead of objects by fresh-test-resumes.

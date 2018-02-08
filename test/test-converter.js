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
  , FRESCA = require('fresh-resume-schema')
  , _ = require('underscore')
  , resumes = require('fresh-test-resumes');

var _rF, _rJ;



/**
Determine if the specified FRESH resume is valid.
# TODO: relocate / refactor
*/
function isValidFRESH( r ) {
  // https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // Allow YYYY, YYYY-MM, and YYYY-MM-DD date formats
  // Allow empty string "" or " " etc as URI
  // TODO: replace this with a validator like `ajv`
  // TODO: express these format restrictions at the schema level
  var validate = validator( FRESCA, {
    formats: {
      date: /^\d{4}(?:-(?:0[0-9]{1}|1[0-2]{1})(?:-[0-9]{2})?)?$/,
      uri: /^(?:[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*)|\s*$/
    }
  });
  var ret = !!validate( r );
  if( !ret )
    console.error(validate.errors);
  return ret;
}



/**
Determine if the specified JRS resume is valid.
# TODO: relocate / refactor
*/
function isValidJRS( r ) {
  // https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // TODO: replace this with a validator like `ajv`
  var JRS = require( '../src/schema/jrs-0.0.16.json' );
  var validate = validator( JRS, {
    formats: {
      date: /^\d{4}(?:-(?:0[0-9]{1}|1[0-2]{1})(?:-[0-9]{2})?)?$/,
      uri: /^(?:[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*)|\s*$/
    }
  });
  var ret = !!validate( r );
  if( !ret )
    console.error(validate.errors);
  return ret;
}



/**
Set up a basic conversion test suite.
*/
describe('CONVERT', function () {

    // Test each resume mounted on the resumes.fresh collection
    _.each( resumes.fresh, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) { //[1]
        if( key === "empty" )
          return;
        it( key + ' to JSON Resume format', function () {
          expect(function() {
            _rJ = CONVERTER.toJRS( val, null, "0" );
            _rF = CONVERTER.toFRESH( _rJ );
          }).to.not.throw();

          var isvf = isValidFRESH( _rF );
          var isvj = isValidJRS( _rJ );
          expect(isvf).to.be.true;
          expect(isvj).to.be.true;
        });
      }

    });

    // Test each resume mounted on the resumes.jrs collection
    _.each( resumes.jrs, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) {//[1]
        if( key === "empty" )
          return;
        it( key + ' to FRESH format', function () {
          expect(function() {
            _rF = CONVERTER.toFRESH( val );
            _rJ = CONVERTER.toJRS( _rF, null, "0" );
          }).to.not.throw();

          var isvf = isValidFRESH( _rF );
          var isvj = isValidJRS( _rJ );
          expect(isvf).to.be.true;
          expect(isvj).to.be.true;
        });
      }

    });

});

// [1]: Ignore broken resumes (invalid JSON), which are loaded as strings
//      instead of objects by fresh-test-resumes.

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
  , resumes = require('fresh-test-resumes')
  , freshValidator = require('fresh-resume-validator');

var _rF0, _rF1, _rJ0, _rJ1;


/**
Determine if the specified JRS resume is valid.
# TODO: relocate / refactor
*/
function isValidJRS( r, ver ) {
  // https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // TODO: replace this with a validator like `ajv`
  var JRS = ver === '0' ?
    require( '../src/schema/jrs-0.0.16.json' ) :
    require( '../src/schema/jrs-latest.json' );
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

    // Test each FRESH resume mounted on the resumes.fresh collection
    _.each( resumes.fresh, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) { //[1]
        if( key === "empty" || key === "janeinc" )
          return;
        it( key + ' to JSON Resume format', function () {
          expect(function() {
            _rJ0 = CONVERTER.toJRS( val, null, "0" );
            _rJ1 = CONVERTER.toJRS( val, null, "1" );
            _rF0 = CONVERTER.toFRESH( _rJ0 );
            _rF1 = CONVERTER.toFRESH( _rJ1 );
          }).to.not.throw();

          var isvf = freshValidator.isValid( _rF0 ) && freshValidator.isValid( _rF1 );
          if( !isvf ) console.error(freshValidator.errors);
          expect(isvf).to.be.true;

          var isvj = isValidJRS( _rJ0, "0" ) && isValidJRS( _rJ1, "1" );
          expect(isvj).to.be.true;
        });
      }

    });

    // Test each JRS resume mounted on the resumes.jrs collection
    _.each( resumes.jrs, function(val, key) {

      if( !(typeof val === 'string' || val instanceof String )) {//[1]
        if( key === "empty" || key === "janeinc" )
          return;
        it( key + ' to FRESH format', function () {
          expect(function() {
            _rF0 = CONVERTER.toFRESH( val );
            _rJ0 = CONVERTER.toJRS( _rF0, null, "0" );
            _rJ1 = CONVERTER.toJRS( _rF0, null, "1" );
          }).to.not.throw();

          var isvf = freshValidator.isValid( _rF0 );
          var isvj = isValidJRS( _rJ0 ) && isValidJRS( _rJ1 );
          expect(isvf && isvj).to.be.true;
        });
      }

    });

});

// [1]: Ignore broken resumes (invalid JSON), which are loaded as strings
//      instead of objects by fresh-test-resumes.

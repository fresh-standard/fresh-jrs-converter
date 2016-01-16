/**
Test routines for fresh-jrs-converter.
@module text-converter.js
@license MIT. See LICENSE.md for details.
*/

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , CONVERTER = require('../src/index')
  , _ = require('underscore');

// Get a dossier of test resumes
var resumes = require('fresh-test-resumes');

describe('CONVERT', function () {

    _.each( resumes.fresh, function(val, key) {

      // Ignore broken resumes (invalid JSON), which are loaded as strings
      // instead of objects by fresh-test-resumes. fresh-jrs-converter handles
      // only well-formed JSON.
      if( !(typeof val === 'string' || val instanceof String )) {

        it( key + ' to JSON Resume format.', function () {
          expect(function() {
            var jrs = CONVERTER.toJRS( val );
            var fresh = CONVERTER.toFRESH( jrs );
          }).to.not.throw();
        });

      }

    });

    _.each( resumes.jrs, function(val, key) {

      // Ignore broken resumes (invalid JSON), which are loaded as strings
      // instead of objects by fresh-test-resumes. fresh-jrs-converter handles
      // only well-formed JSON.
      if( !(typeof val === 'string' || val instanceof String )) {

        it( key + ' to FRESH format.', function () {
          expect(function() {
            var fresh = CONVERTER.toFRESH( val );
            var jrs = CONVERTER.toJRS( fresh );
          }).to.not.throw();
        });

      }

    });




});

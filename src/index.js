/**
FRESH to JSON Resume conversion routines.
@license MIT. See LICENSE.md for details.
@module index.js
*/



(function() {



  var _ = require('underscore');
  var __ = require('lodash');
  var sect = {
    jrs: require('./to-jrs'),
    fresh: require('./to-fresh')
  };



  /**
  Convert between FRESH and JRS resume/CV formats.
  We could do this with an object mapper like [node-object-mapper][o1]
  or [explicitobjectmap-node][o2] but in practice we end up needing a lot
  of custom conversion code anyway (defeating the purpose of an object
  mapper) or else we end up creating specific rules or having to do
  multipass conversions, etc, because of idiosyncracies in the mapping
  libraries and the FRESH/JRS formats.
  [o1]: https://github.com/wankdanker/node-object-mapper
  [o2]: https://github.com/opentable/explicitobjectmap-node
  @class FRESHConverter
  */
  var FRESHConverter = module.exports = {



    /**
    Convert from JSON Resume format to FRESH.
    @method toFresh
    @todo Refactor
    */
    toFRESH: function( src, foreign ) {

      return {
        name: src.basics.name,
        info: sect.fresh.info( src, src.basics ),
        contact: sect.fresh.contact( src, src.basics ),
        meta: sect.fresh.meta( src, src.meta ),
        location: sect.fresh.location( src, __.get( src, 'basics.location' ) ),
        employment: sect.fresh.employment( src, src.work ),
        education: sect.fresh.education( src, src.education ),
        service: sect.fresh.service( src, src.volunteer ),
        skills: sect.fresh.skills( src, src.skills ),
        writing: sect.fresh.writing( src, src.publications ),
        recognition: sect.fresh.recognition( src, src.awards ),
        social: sect.fresh.social( src, src.basics.profiles ),
        interests: src.interests,
        testimonials: sect.fresh.testimonials( src, src.references ),
        languages: src.languages,
        disposition: src.disposition // <--> round-trip
      };
    },



    /**
    Convert from FRESH format to a specific JSON Resume format.
    @param src The source FRESH resume object.
    @param foreign Currently unused.
    @param ver The JSON Resume version. If specified, must be "0", "1", or
    "edge". If omitted, defaults to "edge" (the latest JSON Resume schema).
    @returns The converted resume object in JSON Resume format.
    */
    toJRS: function( src, foreign, ver ) {

      switch( ver || "edge" ) {

        case "0":
          return {
            //meta: not in this version
            basics: sect.jrs.basics( src ),
            work: sect.jrs.work( src, src.employment ),
            education: sect.jrs.education( src, src.education ),
            //projects: not in this version
            skills: sect.jrs.skills( src, src.skills ),
            volunteer: sect.jrs.volunteer( src, src.service ),
            awards: sect.jrs.awards( src, src.recognition ),
            publications: sect.jrs.publications( src, src.writing ),
            interests: src.interests,
            references: sect.jrs.references( src, src.testimonials ),
            languages: src.languages
          };

        case "1":
        case "edge":
          return {
            meta: sect.jrs.meta( src, src.meta ),
            basics: sect.jrs.basics( src ),
            work: sect.jrs.work( src, src.employment ),
            education: sect.jrs.education( src, src.education ),
            projects: sect.jrs.projects( src, src.projects ),
            skills: sect.jrs.skills( src, src.skills ),
            volunteer: sect.jrs.volunteer( src, src.service ),
            awards: sect.jrs.awards( src, src.recognition ),
            publications: sect.jrs.publications( src, src.writing ),
            interests: src.interests,
            references: sect.jrs.references( src, src.testimonials ),
            languages: src.languages
          };

        default:
          // TODO: error
          return null;
      }

    },



    toSTRING: function( src ) {
      function replacerJRS( key,value ) { // Exclude these keys
        return _.some(['imp', 'warnings', 'computed', 'filt', 'ctrl', 'index',
          'safeStartDate', 'safeEndDate', 'safeDate', 'safeReleaseDate',
          'result', 'isModified', 'htmlPreview', 'display_progress_bar'],
          function( val ) { return key.trim() === val; }
        ) ? undefined : value;
      }
      function replacerFRESH( key,value ) { // Exclude these keys
        return _.some(['imp', 'warnings', 'computed', 'filt', 'ctrl', 'index',
          'safe', 'result', 'isModified', 'htmlPreview', 'display_progress_bar'],
          function( val ) { return key.trim() === val; }
        ) ? undefined : value;
      }

      return JSON.stringify( src, src.basics ? replacerJRS : replacerFRESH, 2 );
    }

  }; // end module.exports






}());

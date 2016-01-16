/**
FRESH to JSON Resume conversion routiens.
@license MIT. See LICENSE.md for details.
@module index.js
*/



(function(){ // TODO: refactor everything



  var _ = require('underscore');
  var sect = require('./sections');



  /**
  Convert between FRESH and JRS resume/CV formats.
  @class FRESHConverter
  */
  var FRESHConverter = module.exports = {



    /**
    Convert from JSON Resume format to FRESH.
    @method toFresh
    @todo Refactor
    */
    toFRESH: function( src, foreign ) {

      foreign = (foreign === undefined || foreign === null) ? true : foreign;

      var ret = _.mapObject( src, function( val, key ) {

        // Underscore will hand us every top-level key in the object, most
        // of which are resume sections / sub-objects

      });


      return {
        name: src.basics.name,
        imp: src.basics.imp,
        info: {
          label: src.basics.label,
          class: src.basics.class, // <--> round-trip
          image: src.basics.picture,
          brief: src.basics.summary
        },
        contact: {
          email: src.basics.email,
          phone: src.basics.phone,
          website: src.basics.website,
          other: src.basics.other // <--> round-trip
        },
        meta: sect.meta( true, src.meta ),
        location: {
          city: src.basics.location.city,
          region: src.basics.location.region,
          country: src.basics.location.countryCode,
          code: src.basics.location.postalCode,
          address: src.basics.location.address
        },
        employment: sect.employment( src.work, true ),
        education: sect.education( src.education, true),
        service: sect.service( src.volunteer, true),
        skills: sect.skillsToFRESH( src.skills ),
        writing: sect.writing( src.publications, true),
        recognition: sect.recognition( src.awards, true, foreign ),
        social: sect.social( src.basics.profiles, true ),
        interests: src.interests,
        testimonials: sect.references( src.references, true ),
        languages: src.languages,
        disposition: src.disposition // <--> round-trip
      };
    },



    /**
    Convert from FRESH format to JSON Resume.
    @param foreign True if non-JSON-Resume properties should be included in
    the result, false if those properties should be excluded.
    @todo Refactor
    */
    toJRS: function( src, foreign ) {

      foreign = (foreign === undefined || foreign === null) ? false : foreign;

      return {
        basics: {
          name: src.name,
          label: src.info.label,
          class: foreign ? src.info.class : undefined,
          summary: src.info.brief,
          website: src.contact.website,
          phone: src.contact.phone,
          email: src.contact.email,
          picture: src.info.image,
          location: {
            address: src.location.address,
            postalCode: src.location.code,
            city: src.location.city,
            countryCode: src.location.country,
            region: src.location.region
          },
          profiles: sect.social( src.social, false ),
          imp: src.imp
        },
        work: sect.employment( src.employment, false ),
        education: sect.education( src.education, false ),
        skills: sect.skillsToJRS( src.skills, false ),
        volunteer: sect.service( src.service, false ),
        awards: sect.recognition( src.recognition, false, foreign ),
        publications: sect.writing( src.writing, false ),
        interests: src.interests,
        references: sect.references( src.testimonials, false ),
        samples: foreign ? src.samples : undefined,
        disposition: foreign ? src.disposition : undefined,
        languages: src.languages
      };

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

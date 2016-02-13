/**
Convert JRS resume sections to FRESH.
@module to-fresh.js
@license MIT. See LICENSE.md for details.
*/

(function(){

  __ = require('lodash');
  PKG = require('../package.json');

  module.exports = {

    meta: function( r, obj ) {
      obj = obj || { };
      obj.format = obj.format || "FRESH@" + PKG.devDependencies.fresca;
      obj.version = obj.version || "0.1.0";
      return obj;
    },

    info: function( r, obj ) {
      if( !obj ) return { };
      var ref = r.basics || { };
      return {
        label: ref.label,
        class: ref.class,// round-trip
        image: ref.picture,
        brief: ref.summary
      };
    },

    contact: function( r, obj ) {
      if( !obj ) return obj;
      var ref = r.basics || { };
      return {
        email: ref.email,
        phone: ref.phone,
        website: ref.website,
        other: ref.other // <--> round-trip
      };
    },

    employment: function( r, obj ) {
      if( !obj ) return obj;
      return {
        history: obj && obj.length ?
          obj.map( function( job ) {
            return {
              position: job.position,
              employer: job.company,
              summary: job.summary,
              current: (!job.endDate || !job.endDate.trim() ||
                job.endDate.trim().toLowerCase() === 'current') || undefined,
              start: job.startDate,
              end: job.endDate,
              url: job.website,
              keywords: [],
              highlights: job.highlights
            };
          }) : undefined
      };
    },

    education: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length ? {
        level: "",
        history: obj.map(function(edu){
          return {
            institution: edu.institution,
            start: edu.startDate,
            end: edu.endDate,
            grade: edu.gpa,
            curriculum: edu.courses,
            url: edu.website || edu.url || undefined,
            summary: edu.summary || "",
            area: edu.area,
            studyType: edu.studyType
          };
        })
      } : undefined;
    },


    service: function( r, obj ) {
      if( !obj ) return obj;
      return {
        history: obj && obj.length ? obj.map(function(vol) {
          return {
            type: 'volunteer',
            position: vol.position,
            organization: vol.organization,
            start: vol.startDate,
            end: vol.endDate,
            url: vol.website,
            summary: vol.summary,
            highlights: vol.highlights
          };
        }) : undefined
      };
    },

    social: function( r, obj ) {
      if( !obj ) return obj;
      return obj.map(function(pro){
        return {
          label: pro.network,
          network: pro.network,
          url: pro.url,
          user: pro.username
        };
      });
    },

    skills: function( r, skills ) {
      if( !skills ) return skills;
      return {
        sets: skills.map(function( set ) {
          return {
            name: set.name,
            level: set.level,
            skills: set.keywords
          };
        })
      };
    },

    recognition: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length ? obj.map(
        function(awd){
          return {
            flavor: awd.flavor,
            url: awd.url,
            title: awd.title,
            date: awd.date,
            from: awd.awarder,
            summary: awd.summary
          };
      }) : undefined;
    },


    writing: function( r, obj ) {
      if( !obj ) return obj;
      return obj.map(function( pub ) {
        return {
          title: pub.name,
          flavor: undefined,
          publisher: pub.publisher,
          url: pub.website,
          date: pub.releaseDate,
          summary: pub.summary
        };
      });
    },

    testimonials: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length && obj.map(function(ref){
        return {
          name: ref.name,
          flavor: 'professional',
          quote: ref.reference,
          private: false
        };
      });
    },


    location: function( r, obj ) {
      if ( !obj ) return obj;
      return {
        city: obj.city,
        region: obj.region,
        country: obj.countryCode,
        code: obj.postalCode,
        address: obj.address
      };
    }


  };

}());

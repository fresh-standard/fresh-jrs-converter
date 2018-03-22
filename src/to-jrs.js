/**
Convert FRESH resume sections to JRS.
@module to-jrs.js
@license MIT. See LICENSE.md for details.
*/

(function(){

  _ = require('lodash');
  moment = require('moment');
  extend = require('extend');

  /**
  A dedicated FRESH-to-JRS resume converter for the latest JRS (1.0.0 candidate)
  resumes.
  */
  module.exports = {

    meta: function( r, obj ) {

      // Copy ALL properties across by default. Tools / users may have inserted
      // custom properties that we need to preserve.
      var m = obj ? _.clone( obj ) : { };

      // Conversion always updates the modified timestamp
      m.lastModified = moment().toISOString();

      // Special handling for certain properties. We could handle
      // this more elegantly through an object mapper / filter, but
      // most of the patterns end up being less intelligible so why bother

      // modified -> lastModified
      if( m.hasOwnProperty('modified') )
        delete m.modified;

      // canonical -> url
      if( m.hasOwnProperty('url') ) {
        m.canonical = m.url;
        delete m.url;
      }

      // remove `FRESH@x.y.z` format property on JRS resumes
      delete m.format;

      return m;
    },

    basics: function( r ) {
      // Preserve all properties from the info and contact subobjects
      var newBasics = extend( true, { }, r.info, r.contact );
      // Name
      newBasics.name = r.name;
      // Rename 'brief' to 'summary'
      if(newBasics.hasOwnProperty('brief')) {
        newBasics.summary = newBasics.brief;
        delete newBasics.brief;
      }
      // Rename 'image' to 'picture'
      if(newBasics.hasOwnProperty('image')) {
        newBasics.picture = newBasics.image;
        delete newBasics.image;
      }
      // Transform 'location' & 'profiles'
      newBasics.location = this.location(r, r.location);
      newBasics.profiles = this.social(r, r.social);
      return newBasics;
    },

    work: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.history ?
        obj.history.map(function(emp){
          return {
            company: emp.employer,
            website: emp.url,
            position: emp.position,
            startDate: emp.start,
            endDate: emp.end,
            summary: emp.summary,
            highlights: emp.highlights
          };
        }) : undefined;
    },

    education: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.history ?
        obj.history.map(function(edu){
          return {
            institution: edu.institution,
            gpa: edu.grade,
            courses: edu.curriculum,
            startDate: edu.start,
            endDate: edu.end,
            area: edu.area,
            studyType: edu.studyType
          };
        }) : undefined;
    },

    volunteer: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.history ?
        obj.history.map(function(srv){
          return {
            flavor: srv.flavor,
            organization: srv.organization,
            position: srv.position,
            startDate: srv.start,
            endDate: srv.end,
            website: srv.url,
            summary: srv.summary,
            highlights: srv.highlights
          };
        }) : undefined;
    },

    social: function( r, obj ) {
      if( !obj ) return obj;
      return obj.map( function( soc ) {
        return {
          network: soc.network,
          username: soc.user,
          url: soc.url
        };
      });
    },


    skills: function( r, skills ) {
      if( !skills ) return skills;
      var ret = [];
      if( skills.sets && skills.sets.length ) {
        ret = skills.sets.map(function(set){
          return {
            name: set.name,
            level: set.level,
            keywords: set.skills
          };
        });
      }
      else if( skills.list ) {
        ret = skills.list.map(function(sk){
          return {
            name: sk.name,
            level: sk.level,
            keywords: sk.keywords
          };
        });
      }
      return ret;
    },

    awards: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length ? obj.map(function(awd){
        return {
          flavor: awd.flavor,
          url: awd.url,
          title: awd.title,
          date: awd.date,
          awarder: awd.from,
          summary: awd.summary
        };
      }) : undefined;
    },

    publications: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length ? obj.map(function(pub){
        return {
          name: pub.title,
          publisher: pub.publisher &&
            pub.publisher.name ? pub.publisher.name : pub.publisher,
          releaseDate: pub.date,
          website: pub.url,
          summary: pub.summary
        };
      }) : undefined;
    },

    references: function( r, obj ) {
      if( !obj ) return obj;
      return obj && obj.length && obj.map(function(ref){
        return {
          name: ref.name,
          reference: ref.quote
        };
      });
    },

    location: function( r, obj ) {
      if( !obj ) return obj;
      return {
        address: obj.address,
        postalCode: obj.code,
        city: obj.city,
        countryCode: obj.country,
        region: obj.region
      };
    },

    projects: function( r, obj ) {
      if( !obj ) return obj;
      return obj.map(function(pro){
        return {
          name: pro.title,
          description: pro.description || pro.summary,
          highlights: pro.highlights,
          keywords: pro.keywords,
          startDate: pro.start,
          endDate: pro.end,
          url: pro.url,
          roles: [pro.role]
        };
      });
    }

  };
}());

/**
Convert FRESH resume sections to JRS 0.0.16.
@module to-jrs.js
@license MIT. See LICENSE.md for details.
*/

(function(){

  _ = require('lodash');

  /**
  A dedicated FRESH-to-JRS resume converter for JRS 0.0.16 resumes.
  */
  module.exports = {

    basics: function( r ) {
      var that = this;
      // TODO: Update this logic to carry over additional (legal) properties
      // in r.info and r.contact. Similarly for the other conversion funcs.

      return {
        name: r.name,
        label: _.get( r, 'info.label' ),
        class: _.get( r, 'info.class' ),
        summary: _.get( r, 'info.brief' ),
        website: _.get( r, 'contact.website' ),
        phone: _.get( r, 'contact.phone' ),
        email: _.get( r, 'contact.email' ),
        picture: _.get( r, 'info.image' ),
        location: that.location( r, r.location ),
        profiles: that.social( r, r.social ),
        imp: r.imp
      };
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
    }

    // projects: function( r, obj ) {
    //   if( !obj ) return obj;
    //   return obj.map(function(pro){
    //     return {
    //       name: pro.title,
    //       description: pro.description || pro.summary,
    //       highlights: pro.highlights,
    //       keywords: pro.keywords,
    //       startDate: pro.start,
    //       endDate: pro.end,
    //       url: pro.url,
    //       roles: [pro.role]
    //     };
    //   });
    // }

  };
}());

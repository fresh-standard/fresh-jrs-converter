/**
Convert FRESH resume sections to JRS.
@module to-jrs.js
@license MIT. See LICENSE.md for details.
*/

(function(){

  __ = require('lodash');

  module.exports = {

    basics: function( r ) {
      var that = this;
      return {
        name: r.name,
        label: __.get( r, 'info.label' ),
        class: __.get( r, 'info.class' ),
        summary: __.get( r, 'info.brief' ),
        website: __.get( r, 'contact.website' ),
        phone: __.get( r, 'contact.phone' ),
        email: __.get( r, 'contact.email' ),
        picture: __.get( r, 'info.image' ),
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


  };
}());

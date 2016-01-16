/**
FRESH to JSON Resume conversion routines for individual sections.
@license MIT. See LICENSE.md for details.
@module sections.js
*/

(function() {



  module.exports = {



    meta: function( direction, obj ) {
      //if( !obj ) return obj; // preserve null and undefined
      if( direction ) {
        obj = obj || { };
        obj.format = obj.format || "FRESH@0.1.0";
        obj.version = obj.version || "0.1.0";
      }
      return obj;
    },



    employment: function( obj, direction ) {
      if( !obj ) return obj;
      if( !direction ) {
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
      }
      else {
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
      }
    },



    education: function( obj, direction ) {
      if( !obj ) return obj;
      if( direction ) {
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
      }
      else {
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
      }
    },



    service: function( obj, direction, foreign ) {
      if( !obj ) return obj;
      if( direction ) {
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
      }
      else {
        return obj && obj.history ?
          obj.history.map(function(srv){
            return {
              flavor: foreign ? srv.flavor : undefined,
              organization: srv.organization,
              position: srv.position,
              startDate: srv.start,
              endDate: srv.end,
              website: srv.url,
              summary: srv.summary,
              highlights: srv.highlights
            };
          }) : undefined;
      }
    },



    social: function( obj, direction ) {
      if( !obj ) return obj;
      if( direction ) {
        return obj.map(function(pro){
          return {
            label: pro.network,
            network: pro.network,
            url: pro.url,
            user: pro.username
          };
        });
      }
      else {
        return obj.map( function( soc ) {
          return {
            network: soc.network,
            username: soc.user,
            url: soc.url
          };
        });
      }
    },



    recognition: function( obj, direction, foreign ) {
      if( !obj ) return obj;
      if( direction ) {
        return obj && obj.length ? obj.map(
          function(awd){
            return {
              flavor: foreign ? awd.flavor : undefined,
              url: foreign ? awd.url: undefined,
              title: awd.title,
              date: awd.date,
              from: awd.awarder,
              summary: awd.summary
            };
        }) : undefined;
      }
      else {
        return obj && obj.length ? obj.map(function(awd){
          return {
            flavor: foreign ? awd.flavor : undefined,
            url: foreign ? awd.url: undefined,
            title: awd.title,
            date: awd.date,
            awarder: awd.from,
            summary: awd.summary
          };
        }) : undefined;
      }
    },



    references: function( obj, direction ) {
      if( !obj ) return obj;
      if( direction ) {
        return obj && obj.length && obj.map(function(ref){
          return {
            name: ref.name,
            flavor: 'professional',
            quote: ref.reference,
            private: false
          };
        });
      }
      else {
        return obj && obj.length && obj.map(function(ref){
          return {
            name: ref.name,
            reference: ref.quote
          };
        });
      }
    },



    writing: function( obj, direction ) {
      if( !obj ) return obj;
      if( direction ) {
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
      }
      else {
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
      }
    },



    skillsToFRESH: function( skills ) {
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



    skillsToJRS: function( skills ) {
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
    }



  }; // end module.exports
}());

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["css/less"],
          yuicompress: true
        },
        files: {
          "css/app.css": "css/less/app.less"
        }
      }
    },
    react: {
      combined_file_output: {
        files: {
          'js/components/components.js': [
          ]
        }
      }
    },
    watch: {
      files: ['css/less/*', 'js/components/*'],
      tasks: ['less', 'react']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-react');
};

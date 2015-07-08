/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["public/css/less"],
          yuicompress: true
        },
        files: {
          "public/css/app.css": "public/css/less/app.less"
        }
      }
    },
    react: {
      combined_file_output: {
        files: {
          'public/js/components/components.js': [
            'public/js/components/terminal.jsx'
          ]
        }
      }
    },
    watch: {
      files: ['public/css/less/*', 'public/js/components/*'],
      tasks: ['less', 'react']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-react');
};

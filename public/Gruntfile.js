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
    watch: {
      files: 'css/less/*',
      tasks: ['less']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
};

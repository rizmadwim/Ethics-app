var app = angular.module("ethics-app", [

    // App Settings
    "config",

    // External Modules
    "ngRoute",
    "ngSanitize",
    "ngBootbox",
    "pascalprecht.translate",
    "angular-momentjs",

    // Own Modules
    "filters",
    "routes",
    "languages",

    // Services
    "authenticationService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "reviewService",
    "userService",
    "recoveryService",
    "fileService",
    "membersService"

]);


/**
 * Log Provider
 * turn on/off debug logging
 */
app.config(function($logProvider, config) {
    $logProvider.debugEnabled(config.debugMode);
});


/**
 * Start application
 */
app.run(function($translate, config) {

    // Use Translator and set Language
    $translate.use(config.appLanguage);

});

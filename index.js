/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */

 // Create New Branch on issue number
const createNewBranch = require('./lib/create-new-branch')


module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')


  // Add a branch on issue name
  robot.on(`issues.opened`, createNewBranch)

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

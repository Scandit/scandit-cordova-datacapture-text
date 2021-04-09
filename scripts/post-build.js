const copyRecursive = require('../../scandit-cordova-datacapture-core/scripts/copy-recursive')
const removeRecursive = require('../../scandit-cordova-datacapture-core/scripts/remove-recursive')

const postBuild = () => {
   copyRecursive('./www/js/scandit-cordova-datacapture-text/www/ts/src', './www/js')
   removeRecursive('www/js/scandit-cordova-datacapture-text')
   removeRecursive('www/js/scandit-cordova-datacapture-core')
}

postBuild()

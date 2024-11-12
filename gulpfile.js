'use strict';
const path = require('path');
const build = require('@microsoft/sp-build-web');

build.addSuppression(
	`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`,
);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
	var result = getTasks.call(build.rig);

	result.set('serve', result.get('serve-deprecated'));

	return result;
};

/* fast-serve */
const { addFastServe } = require('spfx-fast-serve-helpers');
addFastServe(build);
/* end of fast-serve */

build.configureWebpack.mergeConfig({
	additionalConfiguration: (generatedConfiguration) => {
		generatedConfiguration.resolve.alias['@vehiclesList'] = path.resolve(
			__dirname,
			'lib/webparts/flotadminVehiclesList/',
		);

		return generatedConfiguration;
	},
});

build.initialize(require('gulp'));

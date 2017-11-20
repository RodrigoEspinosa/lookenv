'use strict';

module.export = (varName, context = process.env) => context[varName];

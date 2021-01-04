'use strict';

const path = require('path');
const goblinName = path.basename(module.parent.filename, '.js');
const Goblin = require('xcraft-core-goblin');
const {appId} = require('xcraft-core-host');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {};

Goblin.registerQuest(goblinName, `${appId}.heapdump`, function* (
  quest,
  output,
  next
) {
  const heapdump = require('heapdump');
  const timestamp = Date.now();
  yield heapdump.writeSnapshot(
    path.join(output, `${appId}.${timestamp}.heapsnapshot`),
    next
  );
});

// Singleton
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
Goblin.createSingle(goblinName);

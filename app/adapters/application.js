import config from '../config/environment';

var adapter = EmberCouchDBKit.DocumentAdapter.extend({
    host: config.dbHost,
    db: config.dbName
});

adapter.reopen({
    /**
     * Creates an RFC 4122 UUID for newly created models.
     * @see https://github.com/emberjs/data/blob/9d6173c48829439aae71bfe6d8a5bf9fffc1dd1b/packages/ember-data/lib/system/adapter.js#L607-L630
     */
    generateIdForRecord: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
});

export default adapter;

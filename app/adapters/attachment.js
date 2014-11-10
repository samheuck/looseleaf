import config from '../config/environment';

export default EmberCouchDBKit.AttachmentAdapter.extend({
    host: config.dbHost,
    db: config.dbName
});

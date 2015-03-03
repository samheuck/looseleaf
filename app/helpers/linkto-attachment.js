import config from '../config/environment';
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (attachment) {
    var html = "<a href='%@' target='_blank'>%@</a>",
        url = "%@/%@/%@".fmt(config.dbHost, config.dbName, attachment.get('id'));

    return new Ember.Handlebars.SafeString(html.fmt(url, attachment.get('file_name')));
});
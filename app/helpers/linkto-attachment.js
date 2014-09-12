import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (attachment) {
    var html = "<a href='%@' target='_blank'>%@</a>",
        url = "%@/%@/%@".fmt(LooseleafENV.dbHost, attachment.get('_data.db'), attachment.get('id'));

    return new Ember.Handlebars.SafeString(html.fmt(url, attachment.get('file_name')));
});
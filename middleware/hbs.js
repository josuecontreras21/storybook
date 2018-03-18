const moment = require('moment');
moment().format();

module.exports = {
    truncate: (str, length = 50, ending = '...') => {
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        }
        return str;
    },
    formatDate: function(date, format){
        return moment(date).format(format)
    },
    fromNow: function(date){
        return moment(date).fromNow();
    },
    select: function(selected, option){
        return option.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
    },
    editIcon: function(author_id, currentUser_id, story_id, floating = true){         
        if(author_id.equals(currentUser_id)){
            if(floating){
                return `<a href="/stories/${story_id}/edit" class="btn-floating halfway-fab waves-effect waves-light red">
                <i class="material-icons">create</i>
            </a>`
            }else{
                return `<a href="/stories/${story_id}/edit"> <i class="material-icons">create</i> </a>`
            }
        }
        else{
            return " ";
        }
    }
}
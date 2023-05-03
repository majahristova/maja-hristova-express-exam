const db = require('./../db_connection');

class Comment {

    constructor({id, post_id, content}) {
        this.id = id;
        this.post_id = title;
        this.content = content;
    }

    static async  testMethod() {
        return new Promise((resolve, reject) => {
            resolve('Lorem ipusm')
        })
    }

}


module.exports = Comment;
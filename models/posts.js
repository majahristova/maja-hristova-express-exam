const db = require('./../db_connection');

class Post {

    constructor({id, title, slug, content}) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }

    static async  getBySlug(slug) {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM posts WHERE slug = ?';
            const values = [slug];
            db.query(sql, values, function (error, results, fields) {
                if (error) {
                    reject(error)
                }else{
                    if(results.length > 0){
                        resolve(results)
                    }else{
                        reject(new Error('None found'))
                    }
                }
            });
        })
    }

    static async  getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts', function (error, results, fields) {
                if (error) {
                    reject(error)
                }else{
                    if(results.length > 0){
                        resolve(results)
                    }else{
                        reject(new Error('None found'))
                    }
                }
            });
        })
    }


    async create(){
        const sql = `
            INSERT INTO posts
                (user_id, title, slug, content)
            VALUES
                (?, ?, ?, ?)
            `;
        const values = [1, this.title, this.slug, this.content]

        const result = await db.query(sql, values, function (error, results, fields) {
            if (error) throw error;
        });
    }

}


module.exports = Post;
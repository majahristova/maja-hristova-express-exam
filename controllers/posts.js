const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const authMiddleware = require('./../middlewares/auth');
const Post = require('./../models/posts');

// Get all posts

    router.get('/posts',authMiddleware, async (req, res) => {
      
        try {
            const posts = await Post.getAll();
            res.render('posts', {
                posts: posts,
                message: req.flash('message')
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
     




//CREATE
router.get('/posts/create', authMiddleware, (req, res) => {
    if(req.isAuthenticated === false){
        res.redirect('/login')

    }
    res.render('posts/create')
})

// router.post('/posts', async (req, res) => {
//     try {
//         const title = req.body.title;
//         const content = req.body.content;
//         const slug = slugify(title);
//         const post = new Post({title, slug, content})
//         await post.create();

//         res.redirect('/posts')
//     } catch (err) {
//         res.send(err)
//     }
// })



router.post('/posts', async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const slug = slugify(title);
        const post = new Post({title, slug, content})
        await post.create();

        res.redirect('/posts')
    } catch (err) {
        res.send(err)
    }
})


// READ
router.get('/posts/slug/:slug', async (req, res) => {
    const slug = req.params.slug;

    try {
        const [post] = await Post.getBySlug(slug);

        // VG TODO
        // Get Comments

        res.render('posts/show', {
            post: post
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})


// UPDATE

// DELETE



// // Get a specific post
// router.get('/posts:id', async (req, res) => {
//   try {
//     const post = await Post.getById(req.params.id);
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update a post
// router.put('/posts:id', async (req, res) => {
//   try {
//     const post = await Post.getById(req.params.id);
//     post.title = req.body.title;
//     post.content = req.body.content;
//     await post.update();
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete a post
// router.delete('/posts:id', async (req, res) => {
//   try {
//     const post = await Post.getById(req.params.id);
//     await post.delete();
//     res.json({ message: 'Post deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });




module.exports = router;
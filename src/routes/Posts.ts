import  { Request, Response, Router } from 'express';
import Post from '../models/Post';

class Posts {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async createPost(req: Request, res: Response) {

        let { body } = req;

        const post = new Post({
            title: body.title,
            url: body.url,
            content: body.content,
            image: body.image,
        });

        try {
            const postSaved = await post.save();
            res.json({
                ok: true,
                post: postSaved
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async getPosts(req: Request, res: Response) {

        const posts = await Post.find();
        res.json(posts);
    }

    async getPost(req: Request, res: Response) {

        let { url } = req.params;

        try {
            const post = await Post.find({ url });
            res.json({
                ok: true,
                post: post
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async updatePost(req: Request, res: Response) {

        let { url } = req.params;
        let { body } = req;

        try {
            const post = await Post.findOneAndUpdate( {url} , body, {new: true});
            res.json({
                ok: true,
                post
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async deletePost(req: Request, res: Response) {

        let { url } = req.params;

        try {
            const post = await Post.findOneAndRemove({ url });
            res.json({
                ok: true,
                post,
                message: 'Post eliminado con éxito'
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const posts = new Posts();
export default posts.router;
import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { BaseEntity, Repository } from 'typeorm'
import { Post } from '../entities/Post'
import { User } from '../entities/User'

interface PostRequest {
    desc: string
    image: string
    currentUserId: string
}

class PostController {
    async createPost (req: Request, res: Response) {
        const postRequest: PostRequest = req.body
        const { desc, image, currentUserId } = postRequest
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user = await userRepo.findOne({ where: { id: parseInt(currentUserId) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'Not authoriztion'})
            }
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const newPost: Post = await new Post()
            newPost.desc = desc
            newPost.image = image
            newPost.user = user
            await postRepo.save(newPost)
            res.status(201).json({ status: 'success', data: newPost })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getPost (req: Request, res: Response) {
        const id = req.params.id
        try {
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const post = await postRepo.findOne({ where: { id: parseInt(id) }})
            if (!post) {
                return res.status(400).json({ status: 'fail', msg: 'Post not found' })
            } 
            const user = await post.user
            res.status(200).json({ status: 'success', data: post, user })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getPosts (req: Request, res: Response) {
        try {
            const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
            const posts = await postRepo.find()
            if (posts.length === 0) {
                return res.status(200).json({ status: 'success', data: 'Posts list is empty' })
            } 
            res.status(200).json({ status: 'success', data: posts })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    // async getPostsOfUser (req: Request, res: Response) {
    //     const postRequest: PostRequest = req.body
    //     const { userId } = postRequest
    //     try {
    //         const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
    //         const posts = await postRepo.find({ where: { userId: parseInt(userId) }})
    //         if (posts.length === 0) {
    //             return res.status(200).json({ status: 'success', data: 'The user has no posts'})
    //         }
    //         res.status(201).json({ status: 'success', data: posts })
    //     } catch (error) {
    //         let msg
    //         if (error instanceof Error) {
    //             msg = error.message
    //         }
    //         res.status(500).json({ status: 'fail', msg })
    //     }
    // }
}

export default new PostController()
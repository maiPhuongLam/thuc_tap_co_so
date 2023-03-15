"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../configs/db");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
class PostController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postRequest = req.body;
            const { desc, image } = postRequest;
            const currentUserId = req.userId;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(currentUserId) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authoriztion' });
                }
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const newPost = yield new Post_1.Post();
                newPost.desc = desc;
                newPost.image = image;
                newPost.user = user;
                yield postRepo.save(newPost);
                res.status(201).json({ status: 'success', data: newPost });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            try {
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const post = yield postRepo.findOne({
                    relations: {
                        user: true,
                        likes: true
                    },
                    where: {
                        id: parseInt(postId),
                    }
                });
                if (!post) {
                    return res.status(400).json({ status: 'fail', msg: 'Post not found' });
                }
                res.status(200).json({ status: 'success', data: post });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const posts = yield postRepo.find({
                    relations: {
                        user: true,
                        likes: true
                    }
                });
                if (posts.length === 0) {
                    return res.status(200).json({ status: 'success', data: 'Posts list is empty' });
                }
                res.status(200).json({ status: 'success', data: posts });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    // async getTimelinePost (req: Request, res: Response) {
    //     const currentUserId = '2'
    //     try {
    //         const followRepo: Repository<Follow> = await AppDataSource.getRepository(Follow)
    //         const userFollowing: Follow[] = await followRepo.find({ where: { userFollowing: parseInt(currentUserId) }})
    //         const postRepo: Repository<Post> = await AppDataSource.getRepository(Post)
    //         const postList: [Post[]] =[[]]
    //         userFollowing.forEach(async u => {
    //             const posts: Post[] = await postRepo.find({
    //                 relations: {
    //                     user: true,
    //                     likes: true
    //                 },
    //                 where: {
    //                     userId: u.userFollowed
    //                 }
    //             })
    //             if (posts.length === 0) {
    //                 return res.status(200).json({ status: 'success', data: 'Posts list is empty' })
    //             } 
    //             postList.push(posts)
    //         })
    //         res.status(200).json({ status: 'success', data: postList })
    //     } catch (error) {
    //         let msg
    //         if (error instanceof Error) {
    //             msg = error.message
    //         }
    //         res.status(500).json({ status: 'fail', msg })
    //     }
    // }
    getPostsOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const posts = yield postRepo.find({
                    relations: {
                        user: true,
                        likes: true
                    },
                    where: {
                        userId: parseInt(userId)
                    }
                });
                if (posts.length === 0) {
                    return res.status(200).json({ status: 'success', data: 'The user has no posts' });
                }
                res.status(201).json({ status: 'success', data: posts });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postRequest = req.body;
            const { desc, image } = postRequest;
            const currentUserId = req.userId;
            const postId = req.params.postId;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(currentUserId) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authoriztion' });
                }
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const post = yield postRepo.findOne({
                    relations: {
                        user: true,
                        likes: true
                    },
                    where: {
                        id: parseInt(postId),
                        userId: parseInt(currentUserId)
                    }
                });
                if (!post) {
                    return res.status(200).json({ status: 'fail', msg: 'Acttion forbidden' });
                }
                post.desc = desc;
                post.image = image;
                yield postRepo.save(post);
                res.status(200).json({ status: 'success', data: post });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUserId = req.userId;
            const postId = req.params.postId;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(currentUserId) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authoriztion' });
                }
                const postRepo = yield db_1.AppDataSource.getRepository(Post_1.Post);
                const post = yield postRepo.findOne({
                    relations: {
                        user: true,
                        likes: true
                    },
                    where: {
                        id: parseInt(postId),
                    }
                });
                if (!post) {
                    return res.status(400).json({ status: 'fail', msg: 'Post not found' });
                }
                yield postRepo.delete({ id: parseInt(postId) });
                res.status(200).json({ status: 'success', data: post });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
}
exports.default = new PostController();

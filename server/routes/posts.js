import express from 'express';
import {getPostsBySearch,getPost,getPosts,createPosts,updatePost,deletePost,likePost,commentPost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router=express.Router();
 
router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth,createPosts);//auth middleware
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost);

export default router;
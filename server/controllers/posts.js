import PostMessage from '../models/postMessage.js'; 
import mongoose from 'mongoose';
 export const getPosts=async (req,res)=>{
   const {page}=req.query;//Eventhough it is number but as we pass as query it became string
    try{
      const LIMIT=6;
      const startIndex=(Number(page)-1)*LIMIT;
      const total=await PostMessage.countDocuments({});
      const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
      res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    } catch(error){
       res.status(404).json({message:error.message});
    }
}

export const getPost=async (req,res)=>{
   const {id}=req.params;
   try {
      const post=await PostMessage.findById(id);
      res.status(200).json(post);
   } catch (error) {
      res.status(404).json({message:error.message});
   }
}
//Params->/posts/:id->/posts/123->id=123
//Query-> /posts?page=1 ->page=1
export const getPostsBySearch=async (req,res)=>{
   const {searchQuery,tags}=req.query;
   try {
      const title=new RegExp(searchQuery,'i'); //test TEST Test all are same
      const decodedTags = decodeURIComponent(tags);
      const posts=await PostMessage.find({$or:[{title},{tags:{$in:decodedTags.split(',')}}]});
      res.json({data:posts});
   } catch (error) {
      res.status(404).json({message:error})
   }
}
export const createPosts=async (req,res)=>{
    const post=req.body;
    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
    try{
       await newPost.save();
       res.status(201).json(newPost);
    }catch{
       res.status(409).json({message: error.message})
    }
}

export const updatePost=async (req,res)=>{
   const {id:_id}=req.params;
   const post =req.body;

   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

   const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

   res.json(updatedPost);
}

export const deletePost=async (req,res)=>{
   const {id}=req.params;

   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

   // await PostMessage.findByIdAndRemove(id);
   await PostMessage.findOneAndDelete({ _id: id });
   res.json({message: 'Post deleted Successfully'});
}

export const likePost=async (req,res)=>{
   const {id}=req.params;
   if(!req.userId) return res.json({message:'Unauthenticated User'});
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
   const post=await PostMessage.findById(id);

   const index=post.likes.findIndex((id)=>id===String(req.userId));
   if(index===-1){
      //wants to like
      post.likes.push(req.userId);
   }else{
      //wants to remove the likes
      post.likes=post.likes.filter((id)=>id!==String(req.userId));
   }
   const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});

   res.json(updatedPost);
}

export const commentPost=async (req,res)=>{
   const {id}=req.params;
   const {value}=req.body;
   const post=await PostMessage.findById(id);
   post.comments.push(value);
   const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
   res.json(updatedPost);
}


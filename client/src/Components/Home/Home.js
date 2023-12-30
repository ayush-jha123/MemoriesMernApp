import React,{useState,useEffect} from 'react'
import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
// import useStyles from '../../styles';
import {getPosts,getPostsBySearch} from '../../actions/posts';
import Pagination from '../Pagination';
import useStyles from './styles';


function useQuery(){
  return new URLSearchParams(useLocation().search); 
}
const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();
    const query =useQuery();
    const history=useHistory();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
  
    // useEffect(()=>{
    //   dispatch(getPosts()); 
    // },[currentId,dispatch]);

    const searchPost=(e)=>{
      if(search.trim() || tags){
        // dispatch--> fetch search post
        //you used to dispatch a action
        dispatch(getPostsBySearch({search,tags:tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        history.push('/')
      }
    }

    const handlekeyPress=(e)=>{
      if(e.keyCode==13){  //13 for enter key
        //search post
        searchPost();
      }
    };
    const handleAdd=(tag)=>setTags([...tags,tag]);
    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent="space-between"   alignItems="stretch" spacing={3} className={classes.gridContainer}> {/*container: If true, it creates a flex container.*/}
            <Grid item xs={12} sm={6} md={9}> {/*item: If true, it creates a flex item.*/}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name='search' variant='outlined' label='Search Memories' onKeyDown={handlekeyPress} fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <ChipInput
                  style={{margin:'10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label='Search Tags'
                  variant='outlined'
                />
                <Button onClick={searchPost} className={classes.searchPost} color='primary' variant='contained'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length)&& (
              <Paper  elevation={6} className={classes.pagination}>
                 <Pagination page={page}/>
              </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home;
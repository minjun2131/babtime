import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const usePostEdit = (postId) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [post, setPost] = useState({
    title: '',
    location: '',
    description: '',
    category: '',
    rating: 0,
    image_url: null
  });
  const [isEdit, setIsEdit] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.info('로그인이 필요합니다.');
        nav('/login');
        return;
      }
      setCurrentUser(user);
    };
    checkUser();
  }, [nav]);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId && currentUser) {
        const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
        if (error) {
          console.error('Error fetching post:', error.message);
          return;
        }
        if (data && data.user_id === currentUser.id) {
          setPost(data);
          setIsEdit(true);
        } else {
          nav(-1);
        }
      }
    };
    fetchPost();
  }, [postId, currentUser, nav]);

  return { currentUser, post, setPost, isEdit };
};

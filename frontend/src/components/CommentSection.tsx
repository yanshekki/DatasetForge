import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, Divider } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';

interface Comment {
  id: number;
  content: string;
  user: { name: string; profilePicture?: string };
  createdAt: string;
}

export default function CommentSection({ datasetId, showError }: { datasetId: number; showError: (msg: string) => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/datasets/${datasetId}/comments`);
      setComments(res.data.data || []);
    } catch (error: any) {
      showError('Failed to load comments');
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/api/datasets/${datasetId}/comments`, {
        content: newComment,
      });
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (error: any) {
      showError(error.response?.data?.error || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [datasetId]);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Comments ({comments.length})</Typography>

      {/* Comment Input */}
      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Write a comment... (use @username to mention)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<Send />}
          onClick={handleSubmitComment}
          disabled={loading || !newComment.trim()}
        >
          Send
        </Button>
      </Box>

      {/* Comments List */}
      <List>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <Avatar src={comment.user.profilePicture} sx={{ mr: 2 }}>
                  {comment.user.name[0]}
                </Avatar>
                <ListItemText
                  primary={comment.user.name}
                  secondary={
                    <>
                      {comment.content}
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < comments.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography color="text.secondary" sx={{ pl: 2 }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </List>
    </Box>
  );
}

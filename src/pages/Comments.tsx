
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  text: string;
  created_at: string;
  user: {
    username: string | null;
  } | null;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial comments
    fetchComments();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments'
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    try {
      // First, let's check if there's a profiles table that might have the username
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          text,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If we have comments, let's get the usernames separately
      if (data && data.length > 0) {
        // Get unique user IDs from comments
        const userIds = [...new Set(data.map(comment => comment.user_id))];
        
        // Fetch usernames from profiles table
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds);
          
        if (profilesError) throw profilesError;
        
        // Create a map of user_id to username
        const usernameMap = new Map();
        profilesData?.forEach(profile => {
          usernameMap.set(profile.id, profile.username);
        });
        
        // Create properly formatted comments with username info
        const formattedComments: Comment[] = data.map(comment => ({
          id: comment.id,
          text: comment.text,
          created_at: comment.created_at,
          user: {
            username: usernameMap.get(comment.user_id) || null
          }
        }));
        
        setComments(formattedComments);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error loading comments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }));
      toast({
        title: "Please log in",
        description: "You need to be logged in to post a comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            text: newComment,
            user_id: user.id
          }
        ]);

      if (error) throw error;

      setNewComment("");
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully!",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error posting comment",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getUserInitials = (username: string | null) => {
    if (!username) return 'U';
    return username[0].toUpperCase();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Community Comments
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join the conversation and share your thoughts with our community.
          </p>
        </div>

        {/* Comment Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="p-6 glass-card">
            <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
            <div className="mb-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {!user ? (
                  <span>
                    Please{" "}
                    <button 
                      className="text-purple-600 hover:text-purple-800 underline"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }))}
                    >
                      log in
                    </button>{" "}
                    to comment
                  </span>
                ) : (
                  <span>Commenting as <span className="font-medium">{user.user_metadata.username || user.email}</span></span>
                )}
              </div>
              
              <Button 
                onClick={handleSubmitComment} 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post Comment'
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Comments List */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Comments</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 bg-purple-600 text-white">
                      <AvatarFallback>
                        {getUserInitials(comment.user?.username)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{comment.user?.username || 'Anonymous'}</h3>
                        <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;

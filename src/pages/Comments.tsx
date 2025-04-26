
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  username: string;
  initials: string;
  text: string;
  date: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Would come from auth context in real app
  const [currentUser, setCurrentUser] = useState({ 
    username: "Guest User", 
    initials: "GU" 
  }); // Would come from auth context in real app
  const { toast } = useToast();

  // Simulate loading comments from a database
  useEffect(() => {
    // Simulated data
    const mockComments = [
      {
        id: 1,
        username: "Arta Mahpay",
        initials: "AM",
        text: "This is an amazing platform! I love the interactive elements and smooth animations.",
        date: "2025-04-15T14:30:00Z",
      },
      {
        id: 2,
        username: "John Smith",
        initials: "JS",
        text: "The parallax scrolling and gradient transitions are really impressive. Great work!",
        date: "2025-04-10T09:15:00Z",
      },
      {
        id: 3,
        username: "Sarah Johnson",
        initials: "SJ",
        text: "I've been using this for my project and it's been a game changer. The team is very responsive to questions.",
        date: "2025-04-05T16:45:00Z",
      },
    ];

    setComments(mockComments);
  }, []);

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      // Prompt user to login
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { type: 'login' } }));
      toast({
        title: "Please log in",
        description: "You need to be logged in to post a comment",
        variant: "destructive",
      });
      return;
    }

    // Add new comment to the list
    const newCommentObj = {
      id: comments.length + 1,
      username: currentUser.username,
      initials: currentUser.initials,
      text: newComment,
      date: new Date().toISOString(),
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");

    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully!",
    });
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
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {!isLoggedIn && (
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
                )}
                {isLoggedIn && (
                  <span>Commenting as <span className="font-medium">{currentUser.username}</span></span>
                )}
              </div>
              
              <Button 
                onClick={handleSubmitComment} 
                className="bg-purple-600 hover:bg-purple-700"
              >
                Post Comment
              </Button>
            </div>
          </Card>
        </div>

        {/* Comments List */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Comments</h2>
          
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="avatar-initials bg-purple-600 text-white">
                      {comment.initials}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{comment.username}</h3>
                        <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
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

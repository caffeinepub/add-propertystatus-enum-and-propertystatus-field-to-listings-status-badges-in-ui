import { useState } from 'react';
import { useGetReviewsForListing, useAddReview, useGetCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewSectionProps {
  listingId: bigint;
}

export default function ReviewSection({ listingId }: ReviewSectionProps) {
  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviewsForListing(listingId);
  const { data: userProfile } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();
  const addReview = useAddReview();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity) {
      toast.error('Please login to leave a review');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      await addReview.mutateAsync({
        listingId,
        rating: BigInt(rating),
        comment: comment.trim(),
      });

      // Success animation
      const toastId = toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <span>Thank you for your feedback!</span>
        </div>,
        {
          duration: 3000,
          className: 'animate-in slide-in-from-bottom-5',
        }
      );

      setComment('');
      setRating(5);
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-400" />
          Reviews & Ratings
        </h2>
        {identity && !showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-white/20 animate-in slide-in-from-top-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white font-semibold mb-2 block">Your Rating</label>
              <StarRating 
                rating={rating} 
                size="lg" 
                interactive 
                onRatingChange={setRating}
              />
            </div>

            <div>
              <label className="text-white font-semibold mb-2 block">Your Review</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this property..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                maxLength={500}
              />
              <p className="text-white/50 text-sm mt-1">{comment.length}/500 characters</p>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={addReview.isPending}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                {addReview.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setComment('');
                  setRating(5);
                }}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviewsLoading ? (
        <div className="text-white/70 text-center py-8">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/10 text-center">
          <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70 text-lg">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id.toString()}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 animate-in fade-in duration-500"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {review.reviewer.toString() === identity?.getPrincipal().toString() 
                        ? userProfile?.name || 'You'
                        : 'User'}
                    </p>
                    <p className="text-white/50 text-sm">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <StarRating rating={Number(review.rating)} size="sm" />
              </div>
              <p className="text-white/80 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

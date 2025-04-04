// src/components/events/EventInteractions.js
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { Heart, Share, Bookmark, MessageCircle } from 'lucide-react';
import Alert from "../../components/ui/alert"; 

const EventInteractions = ({ eventId, initialData }) => {
  const [likes, setLikes] = useState(initialData.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [alert, setAlert] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkInteractions = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        setIsLiked(userDoc.data()?.likedEvents?.includes(eventId));
        setIsSaved(userDoc.data()?.savedEvents?.includes(eventId));
      }
    };

    checkInteractions();
  }, [eventId]);

  const handleLike = async () => {
    if (!auth.currentUser) {
      setAlert({ type: 'error', message: 'Please login to like events' });
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const eventRef = doc(db, 'events', eventId);

      if (isLiked) {
        await updateDoc(userRef, {
          likedEvents: arrayRemove(eventId)
        });
        await updateDoc(eventRef, {
          likes: increment(-1)
        });
        setLikes(prev => prev - 1);
      } else {
        await updateDoc(userRef, {
          likedEvents: arrayUnion(eventId)
        });
        await updateDoc(eventRef, {
          likes: increment(1)
        });
        setLikes(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update like status' });
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      setAlert({ type: 'error', message: 'Please login to save events' });
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      if (isSaved) {
        await updateDoc(userRef, {
          savedEvents: arrayRemove(eventId)
        });
      } else {
        await updateDoc(userRef, {
          savedEvents: arrayUnion(eventId)
        });
      }
      setIsSaved(!isSaved);
      setAlert({ 
        type: 'success', 
        message: isSaved ? 'Event removed from saved' : 'Event saved successfully' 
      });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save event' });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {alert && (
        <Alert 
          variant={alert.type === 'error' ? 'destructive' : 'default'}
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}
      
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 ${
          isLiked ? 'text-red-500' : 'text-gray-500'
        } hover:text-red-500`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        <span>{likes}</span>
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center space-x-1 ${
          isSaved ? 'text-blue-500' : 'text-gray-500'
        } hover:text-blue-500`}
      >
        <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        <span>Save</span>
      </button>

      <button
        onClick={() => setShowShareModal(true)}
        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
      >
        <Share className="w-5 h-5" />
        <span>Share</span>
      </button>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        eventId={eventId}
        eventData={initialData}
      />
    </div>
  );
};

export default EventInteractions;
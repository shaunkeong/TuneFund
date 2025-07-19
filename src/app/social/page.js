'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Heart, MessageCircle, Share2, Send, Image, Plus, User, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0x45ea36aD4c839609325D79150fEFF933db670Df2'
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"}],"name":"addCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"string","name":"content","type":"string"}],"name":"addComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"addUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"campaignContributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"comments","outputs":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_commentId","type":"uint256"}],"name":"deleteComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"deletePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"fundCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCampaigns","outputs":[{"components":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Campaign[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"getPostComments","outputs":[{"components":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Comment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getSupportedCampaignCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalCampaignsByUser","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalContributedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalFundsRaisedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"hasUserLikedPost","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"likePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"postComments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"postLikes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"unlikePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userSupportedCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"registrationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const artistNames = ['Aisha Rahman', 'The KL Collective', 'Faizal Tahir', 'Mizz Nina', 'Sheila Majid', 'Malaysian Music Foundation']

export default function SocialPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ content: '', imageUrl: '' })
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [commentTexts, setCommentTexts] = useState({})
  const [expandedComments, setExpandedComments] = useState({})

  useEffect(() => {
    fetchPosts()
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const userAddress = await signer.getAddress()
        setCurrentUser(userAddress)
      }
    } catch (err) {
      console.error('Error getting current user:', err)
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
        
        const postsData = await contract.getAllPosts()
        
        const processedPosts = await Promise.all(
          postsData.map(async (post, index) => {
            const postId = post.postId.toString()
            
            // Get user info
            const user = await contract.users(post.userId)
            
            // Get comments for this post
            let comments = []
            try {
              const commentsData = await contract.getPostComments(postId)
              comments = commentsData.map(comment => ({
                id: comment.commentId.toString(),
                userId: comment.userId.toString(),
                content: comment.content,
                timestamp: new Date(comment.timestamp.toNumber() * 1000),
                userAddress: user.wallet
              }))
            } catch (err) {
              console.error(`Error fetching comments for post ${postId}:`, err)
            }

            // Check if current user liked this post
            let hasLiked = false
            try {
              if (currentUser) {
                hasLiked = await contract.hasUserLikedPost(postId, currentUser)
              }
            } catch (err) {
              console.error(`Error checking like status for post ${postId}:`, err)
            }

            return {
              id: postId,
              userId: post.userId.toString(),
              content: post.content,
              imageUrl: post.imageUrl,
              timestamp: new Date(post.timestamp.toNumber() * 1000),
              likesCount: post.likesCount.toNumber(),
              commentsCount: post.commentsCount.toNumber(),
              isActive: post.isActive,
              userAddress: user.wallet,
              artistName: artistNames[index % artistNames.length],
              comments: comments,
              hasLiked: hasLiked
            }
          })
        )

        // Sort posts by timestamp (newest first)
        const sortedPosts = processedPosts.sort((a, b) => b.timestamp - a.timestamp)
        setPosts(sortedPosts)
      } else {
        setError('MetaMask not detected. Please install MetaMask to view posts.')
        
        // Demo posts for non-MetaMask users
        const demoPosts = [
          {
            id: '1',
            userId: '1',
            content: 'Just finished recording my new single! Can\'t wait to share it with everyone. The studio sessions were incredible and I can feel this track is going to be special. 🎵✨',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likesCount: 42,
            commentsCount: 8,
            isActive: true,
            userAddress: '0x1234...5678',
            artistName: 'Aisha Rahman',
            comments: [
              { id: '1', content: 'Can\'t wait to hear it! 🔥', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
              { id: '2', content: 'Your music always hits different! ❤️', timestamp: new Date(Date.now() - 30 * 60 * 1000) }
            ],
            hasLiked: false
          },
          {
            id: '2',
            userId: '2',
            content: 'Behind the scenes at our music video shoot today. The energy on set is unmatched! Malaysian music is about to get a major boost. 🎬🇲🇾',
            imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            likesCount: 89,
            commentsCount: 15,
            isActive: true,
            userAddress: '0x5678...9012',
            artistName: 'The KL Collective',
            comments: [
              { id: '3', content: 'This looks amazing! When is the release?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
            ],
            hasLiked: true
          }
        ]
        setPosts(demoPosts)
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(`Failed to load posts: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    
    try {
      setIsCreatingPost(true)
      setError(null)

      if (!newPost.content.trim()) {
        throw new Error('Post content cannot be empty')
      }

      if (!window.ethereum) {
        throw new Error('MetaMask not detected')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const userAddress = await signer.getAddress()

      // Check if user is registered
      const userId = await contract.addressToUserId(userAddress)
      if (userId.eq(0)) {
        // User is not registered, try to register them automatically
        try {
          setError('You need to register first. Attempting to register you now...')
          const registerTx = await contract.addUser()
          await registerTx.wait()
          setError(null) // Clear the registration message
        } catch (registerError) {
          if (registerError.message.includes('Already registered')) {
            // This shouldn't happen but handle it gracefully
            setError(null)
          } else {
            throw new Error('Failed to register automatically. Please use the "Register Now" button on the homepage.')
          }
        }
      }

      // Create the post
      const tx = await contract.createPost(newPost.content, newPost.imageUrl || '')
      await tx.wait()

      // Reset form and close modal
      setNewPost({ content: '', imageUrl: '' })
      setShowCreatePost(false)
      
      // Refresh posts
      await fetchPosts()
      
      alert('Post created successfully!')
      
    } catch (err) {
      setError(err.message)
      console.error('Post creation error:', err)
    } finally {
      setIsCreatingPost(false)
    }
  }

  const handleLikePost = async (postId, hasLiked) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not detected')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = hasLiked 
        ? await contract.unlikePost(postId)
        : await contract.likePost(postId)
      
      await tx.wait()
      
      // Update local state immediately for better UX
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                hasLiked: !hasLiked,
                likesCount: hasLiked ? post.likesCount - 1 : post.likesCount + 1
              }
            : post
        )
      )
      
    } catch (err) {
      console.error('Like/unlike error:', err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleAddComment = async (postId) => {
    try {
      const commentText = commentTexts[postId]
      if (!commentText || !commentText.trim()) return

      if (!window.ethereum) {
        throw new Error('MetaMask not detected')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await contract.addComment(postId, commentText.trim())
      await tx.wait()

      // Clear comment text
      setCommentTexts(prev => ({ ...prev, [postId]: '' }))
      
      // Refresh posts to show new comment
      await fetchPosts()
      
    } catch (err) {
      console.error('Comment error:', err)
      alert(`Error: ${err.message}`)
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Music Social</h1>
            <p className="text-gray-400">Connect with Malaysian musicians and music lovers</p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="What's happening in your musical journey?"
                    rows={4}
                    className="w-full px-3 py-2 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500 resize-none"
                    maxLength={500}
                  />
                  <p className="text-gray-500 text-sm mt-1">{newPost.content.length}/500 characters</p>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingPost || !newPost.content.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatingPost ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchPosts}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts Feed */}
        {!loading && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{post.artistName}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  {post.userAddress === currentUser && (
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Post Content */}
                <div className="px-4 pb-4">
                  <p className="text-white mb-4 leading-relaxed">{post.content}</p>
                  
                  {post.imageUrl && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={post.imageUrl} 
                        alt="Post content" 
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikePost(post.id, post.hasLiked)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                          post.hasLiked 
                            ? 'text-red-400 bg-red-400/10' 
                            : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likesCount}</span>
                      </button>
                      
                      <button
                        onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.commentsCount}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={commentTexts[post.id] || ''}
                      onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id)
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments */}
                  {expandedComments[post.id] && post.comments.length > 0 && (
                    <div className="mt-4 space-y-3 border-t border-gray-800 pt-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-[#0B1120] rounded-lg px-3 py-2">
                              <p className="text-white text-sm">{comment.content}</p>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              {formatTimeAgo(comment.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No posts yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Be the first to share your musical journey with the community!
            </p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
            >
              <Plus className="w-4 h-4" />
              Create First Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

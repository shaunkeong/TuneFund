'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { ArrowLeft, Upload, DollarSign, FileText, Target } from 'lucide-react'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0x45ea36aD4c839609325D79150fEFF933db670Df2'
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"}],"name":"addCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"string","name":"content","type":"string"}],"name":"addComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"addUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"campaignContributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"comments","outputs":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_commentId","type":"uint256"}],"name":"deleteComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"deletePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"fundCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCampaigns","outputs":[{"components":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Campaign[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"getPostComments","outputs":[{"components":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Comment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getSupportedCampaignCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalCampaignsByUser","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalContributedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalFundsRaisedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"hasUserLikedPost","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"likePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"postComments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"postLikes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"unlikePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userSupportedCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"registrationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export default function CreateCampaignPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      setError(null)

      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Campaign title is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Campaign description is required')
      }
      if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
        throw new Error('Target amount must be greater than 0')
      }

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to create a campaign')
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      // Create Web3 provider and contract instance
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const userAddress = await signer.getAddress()

      // Check if user is registered
      try {
        const userId = await contract.addressToUserId(userAddress)
        if (userId.eq(0)) {
          // User is not registered, register them first
          setError('You need to register first. Registering your account...')
          const registerTx = await contract.addUser()
          await registerTx.wait()
          setError(null) // Clear the registration message
        }
      } catch (registrationError) {
        if (registrationError.message.includes('Already registered')) {
          // User is already registered, continue with campaign creation
          setError(null)
        } else {
          console.error('Registration check failed:', registrationError)
          throw new Error('Failed to check or complete user registration')
        }
      }

      // Convert target amount to Wei (ETH to Wei)
      const targetAmountWei = ethers.utils.parseEther(formData.targetAmount)

      // Call the addCampaign function
      const tx = await contract.addCampaign(
        formData.title,
        formData.description,
        targetAmountWei
      )
      
      await tx.wait()

      setSuccess(true)
      setFormData({ title: '', description: '', targetAmount: '' })
      
    } catch (err) {
      if (err.message.includes('Not registered')) {
        setError('You need to register first. Please use the "Register Now" button on the homepage.')
      } else {
        setError(err.message)
      }
      console.error('Campaign creation error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Campaign Created Successfully!</h2>
          <p className="text-gray-400 mb-8">Your campaign has been created and is now live on the platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaign"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Campaigns
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Create Another Campaign
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/campaign"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Create Your Campaign</h1>
          <p className="text-gray-400 text-lg">
            Share your musical vision with the community and get the funding you need
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Title */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Campaign Title</h3>
                <p className="text-gray-400">Give your campaign a compelling title</p>
              </div>
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Debut Album: Malaysian Rhythms"
              className="w-full px-4 py-3 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500"
              maxLength={100}
            />
            <p className="text-gray-500 text-sm mt-2">{formData.title.length}/100 characters</p>
          </div>

          {/* Campaign Description */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Campaign Description</h3>
                <p className="text-gray-400">Describe your project in detail</p>
              </div>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell supporters about your musical project, your goals, and how the funds will be used..."
              rows={6}
              className="w-full px-4 py-3 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500 resize-none"
              maxLength={1000}
            />
            <p className="text-gray-500 text-sm mt-2">{formData.description.length}/1000 characters</p>
          </div>

          {/* Target Amount */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Funding Goal</h3>
                <p className="text-gray-400">How much ETH do you need to raise?</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ETH
              </div>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-12 pr-4 py-3 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Be realistic about your funding needs. Consider production costs, marketing, and platform fees.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

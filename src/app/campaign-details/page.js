'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ethers } from 'ethers'
import { ArrowLeft, Heart, Share2, Users, Calendar, Target, Wallet, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0x45ea36aD4c839609325D79150fEFF933db670Df2'
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"}],"name":"addCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"string","name":"content","type":"string"}],"name":"addComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"addUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"campaignContributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"comments","outputs":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_commentId","type":"uint256"}],"name":"deleteComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"deletePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"fundCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCampaigns","outputs":[{"components":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Campaign[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"getPostComments","outputs":[{"components":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Comment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getSupportedCampaignCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalCampaignsByUser","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalContributedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalFundsRaisedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"hasUserLikedPost","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"likePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"postComments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"postLikes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"unlikePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userSupportedCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"registrationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const categoryTypes = ['Album Production', 'Concert Tour', 'Music Video', 'Cultural Heritage', 'Education', 'Documentary']
const artistNames = ['Aisha Rahman', 'The KL Collective', 'Faizal Tahir', 'Mizz Nina', 'Sheila Majid', 'Malaysian Music Foundation']

export default function CampaignDetailsPage() {
  const searchParams = useSearchParams()
  const campaignId = searchParams.get('id')
  
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fundingAmount, setFundingAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [fundingError, setFundingError] = useState(null)
  const [userContribution, setUserContribution] = useState('0')

  useEffect(() => {
    if (campaignId) {
      fetchCampaignDetails()
    }
  }, [campaignId])

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
        
        // Fetch campaign details
        const campaignData = await contract.campaigns(campaignId)
        
        if (campaignData.campaignId.eq(0)) {
          throw new Error('Campaign not found')
        }

        const targetAmountEth = parseFloat(ethers.utils.formatEther(campaignData.targetAmount))
        const amountRaisedEth = parseFloat(ethers.utils.formatEther(campaignData.amountRaised))
        const fundingPercentage = targetAmountEth > 0 ? Math.floor((amountRaisedEth / targetAmountEth) * 100) : 0

        // Get user contribution if wallet is connected
        let userContrib = '0'
        try {
          const signer = provider.getSigner()
          const userAddress = await signer.getAddress()
          const contribution = await contract.campaignContributions(campaignId, userAddress)
          userContrib = ethers.utils.formatEther(contribution)
        } catch (err) {
          // User not connected or no contribution
        }

        const processedCampaign = {
          id: campaignData.campaignId.toString(),
          userId: campaignData.userId.toString(),
          title: campaignData.title || `Campaign ${campaignData.campaignId}`,
          description: campaignData.description || 'No description provided',
          targetAmount: targetAmountEth.toFixed(2),
          amountRaised: amountRaisedEth.toFixed(2),
          isActive: campaignData.isActive,
          fundingPercentage: Math.min(fundingPercentage, 100),
          // Enhanced mock data
          artist: artistNames[parseInt(campaignId) % artistNames.length],
          category: categoryTypes[parseInt(campaignId) % categoryTypes.length],
          daysLeft: Math.floor(Math.random() * 45) + 5,
          backers: Math.floor(Math.random() * 200) + 25,
          featured: parseInt(campaignId) <= 3
        }

        setCampaign(processedCampaign)
        setUserContribution(userContrib)
      } else {
        setError('MetaMask not detected. Please install MetaMask to view campaign details.')
      }
    } catch (err) {
      console.error('Error fetching campaign details:', err)
      setError(`Failed to load campaign: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFunding = async (e) => {
    e.preventDefault()
    
    try {
      setIsFunding(true)
      setFundingError(null)

      if (!fundingAmount || parseFloat(fundingAmount) <= 0) {
        throw new Error('Please enter a valid funding amount')
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
        throw new Error('You need to register first. Please use the "Register Now" button on the homepage.')
      }

      // Convert funding amount to Wei
      const fundingAmountWei = ethers.utils.parseEther(fundingAmount)

      // Call fundCampaign function
      const tx = await contract.fundCampaign(campaignId, {
        value: fundingAmountWei
      })
      
      await tx.wait()

      // Refresh campaign details
      await fetchCampaignDetails()
      setFundingAmount('')
      
      alert('Funding successful! Thank you for supporting this campaign.')
      
    } catch (err) {
      setFundingError(err.message)
      console.error('Funding error:', err)
    } finally {
      setIsFunding(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-4">Loading campaign details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/campaign"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-gray-400 mb-6">Campaign not found</p>
          <Link
            href="/campaign"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/campaign"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                  {campaign.category}
                </span>
                {campaign.featured && (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    🌟 FEATURED
                  </span>
                )}
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  campaign.isActive 
                    ? 'bg-green-500/20 text-green-400 border border-green-500' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500'
                }`}>
                  {campaign.isActive ? 'Active' : 'Completed'}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">{campaign.title}</h1>
              <p className="text-xl text-white/90 mb-4">by {campaign.artist}</p>
              
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{campaign.daysLeft} days left</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{campaign.backers} backers</span>
                </div>
              </div>
            </div>

            {/* Campaign Description */}
            <div className="bg-[#1a1a1a] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Campaign</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {campaign.description}
              </p>
            </div>

            {/* Your Contribution */}
            {parseFloat(userContribution) > 0 && (
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Your Contribution</h3>
                </div>
                <p className="text-green-400 text-2xl font-bold">{userContribution} ETH</p>
                <p className="text-gray-400">Thank you for supporting this campaign!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Funding Progress */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {campaign.amountRaised} ETH
                </div>
                <div className="text-gray-400">
                  raised of {campaign.targetAmount} ETH goal
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{campaign.fundingPercentage}% funded</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(campaign.fundingPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{campaign.backers}</div>
                  <div className="text-gray-400 text-sm">backers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{campaign.daysLeft}</div>
                  <div className="text-gray-400 text-sm">days left</div>
                </div>
              </div>

              {/* Funding Form */}
              {campaign.isActive && (
                <form onSubmit={handleFunding} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Fund this campaign
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-12 pr-16 py-3 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                        ETH
                      </span>
                    </div>
                  </div>

                  {fundingError && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-red-400 text-sm">{fundingError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isFunding || !campaign.isActive}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFunding ? 'Processing...' : 'Fund Campaign'}
                  </button>
                </form>
              )}

              {!campaign.isActive && (
                <div className="text-center">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">This campaign has ended</p>
                  </div>
                </div>
              )}

              {/* Social Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Heart className="w-4 h-4" />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

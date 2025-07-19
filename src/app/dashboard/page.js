'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Wallet, Heart, TrendingUp, Users, Music, Calendar, Target, DollarSign, Award } from 'lucide-react'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0x45ea36aD4c839609325D79150fEFF933db670Df2'
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"}],"name":"addCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"string","name":"content","type":"string"}],"name":"addComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"addUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"campaignContributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"comments","outputs":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_commentId","type":"uint256"}],"name":"deleteComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"deletePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"fundCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCampaigns","outputs":[{"components":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Campaign[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"getPostComments","outputs":[{"components":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Comment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getSupportedCampaignCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalCampaignsByUser","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalContributedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalFundsRaisedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"hasUserLikedPost","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"likePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"postComments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"postLikes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"unlikePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userSupportedCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"registrationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    totalContributed: '0',
    supportedCampaigns: 0,
    totalCampaigns: 0,
    totalFundsRaised: '0',
    registrationTime: null,
    isRegistered: false
  })
  const [userCampaigns, setUserCampaigns] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawError, setWithdrawError] = useState(null)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!window.ethereum) {
        throw new Error('MetaMask not detected. Please install MetaMask to view your dashboard.')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
      const address = await signer.getAddress()
      setUserAddress(address)

      // Check if user is registered
      const userId = await contract.addressToUserId(address)
      if (userId.eq(0)) {
        setUserStats(prev => ({ ...prev, isRegistered: false }))
        return
      }

      // Fetch user registration info
      const userInfo = await contract.users(userId)
      const registrationDate = new Date(userInfo.registrationTime.toNumber() * 1000)

      // Fetch user statistics using all getter functions
      const [
        totalContributed,
        supportedCampaigns,
        totalCampaigns,
        totalFundsRaised,
        userPostsData,
        allCampaigns
      ] = await Promise.all([
        contract.getTotalContributedByUser(address),
        contract.getSupportedCampaignCount(address),
        contract.getTotalCampaignsByUser(address),
        contract.getTotalFundsRaisedByUser(address),
        contract.getUserPosts(address),
        contract.getAllCampaigns()
      ])

      // Filter user's campaigns from all campaigns
      const userCampaignsList = allCampaigns.filter(campaign => 
        campaign.userId.eq(userId)
      ).map(campaign => ({
        id: campaign.campaignId.toString(),
        title: campaign.title,
        description: campaign.description,
        targetAmount: ethers.utils.formatEther(campaign.targetAmount),
        amountRaised: ethers.utils.formatEther(campaign.amountRaised),
        isActive: campaign.isActive,
        fundingPercentage: campaign.targetAmount.gt(0) 
          ? Math.floor((parseFloat(ethers.utils.formatEther(campaign.amountRaised)) / parseFloat(ethers.utils.formatEther(campaign.targetAmount))) * 100)
          : 0
      }))

      // Process user posts
      const processedPosts = userPostsData.map(post => ({
        id: post.postId.toString(),
        content: post.content,
        imageUrl: post.imageUrl,
        timestamp: new Date(post.timestamp.toNumber() * 1000),
        likesCount: post.likesCount.toNumber(),
        commentsCount: post.commentsCount.toNumber(),
        isActive: post.isActive
      }))

      setUserStats({
        totalContributed: ethers.utils.formatEther(totalContributed),
        supportedCampaigns: supportedCampaigns.toNumber(),
        totalCampaigns: totalCampaigns.toNumber(),
        totalFundsRaised: ethers.utils.formatEther(totalFundsRaised),
        registrationTime: registrationDate,
        isRegistered: true
      })

      setUserCampaigns(userCampaignsList)
      setUserPosts(processedPosts.sort((a, b) => b.timestamp - a.timestamp))

    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(`Failed to load dashboard: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleWithdrawFunds = async () => {
    try {
      setIsWithdrawing(true)
      setWithdrawError(null)

      if (!window.ethereum) {
        throw new Error('MetaMask not detected')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // Get campaigns with available funds to withdraw
      const campaignsWithFunds = userCampaigns.filter(campaign => 
        parseFloat(campaign.amountRaised) > 0 && campaign.isActive
      )

      if (campaignsWithFunds.length === 0) {
        alert('No funds available to withdraw from your campaigns.')
        return
      }

      let totalWithdrawn = 0
      let withdrawnCampaigns = 0

      // Withdraw funds from each campaign that has funds
      for (const campaign of campaignsWithFunds) {
        try {
          const tx = await contract.withdrawFunds(campaign.id)
          await tx.wait()
          
          totalWithdrawn += parseFloat(campaign.amountRaised)
          withdrawnCampaigns++
          
          console.log(`Successfully withdrew ${campaign.amountRaised} ETH from campaign: ${campaign.title}`)
        } catch (campaignError) {
          console.error(`Failed to withdraw from campaign ${campaign.title}:`, campaignError)
          // Continue with other campaigns even if one fails
        }
      }

      if (withdrawnCampaigns > 0) {
        alert(`Successfully withdrew ${totalWithdrawn.toFixed(4)} ETH from ${withdrawnCampaigns} campaign(s)!`)
        
        // Refresh the dashboard data to show updated balances
        await fetchUserData()
      } else {
        alert('Failed to withdraw funds from any campaigns. Please try again.')
      }

    } catch (err) {
      console.error('Withdraw funds error:', err)
      
      if (err.message.includes('Not campaign creator')) {
        setWithdrawError('You can only withdraw funds from campaigns you created.')
      } else if (err.message.includes('No funds to withdraw')) {
        setWithdrawError('No funds available to withdraw from your campaigns.')
      } else {
        setWithdrawError(`Withdrawal failed: ${err.message}`)
      }
    } finally {
      setIsWithdrawing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!userStats.isRegistered) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Not Registered</h2>
          <p className="text-gray-400 mb-8">
            You need to register first to access your dashboard and use TuneFund features.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage & Register
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white">My Dashboard</h1>
            <button
              onClick={handleWithdrawFunds}
              disabled={isWithdrawing || userStats.totalFundsRaised === '0.0000'}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <DollarSign className="w-5 h-5" />
              {isWithdrawing ? 'Withdrawing...' : 'Withdraw Funds'}
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span>{formatAddress(userAddress)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Member since {formatDate(userStats.registrationTime)}</span>
            </div>
          </div>
          
          {withdrawError && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
              <p className="text-red-400">{withdrawError}</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Contributed */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Total Contributed</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {parseFloat(userStats.totalContributed).toFixed(4)} ETH
            </div>
            <p className="text-gray-400 text-sm">Amount you've contributed</p>
          </div>

          {/* Supported Campaigns */}
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium">Supported</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.supportedCampaigns}</div>
            <p className="text-gray-400 text-sm">Campaigns you've backed</p>
          </div>

          {/* Created Campaigns */}
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-purple-400 text-sm font-medium">Created</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{userStats.totalCampaigns}</div>
            <p className="text-gray-400 text-sm">Your campaigns</p>
          </div>

          {/* Total Funds Raised */}
          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">Funds Raised</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {parseFloat(userStats.totalFundsRaised).toFixed(4)} ETH
            </div>
            <p className="text-gray-400 text-sm">Total you've raised</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Campaigns */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Campaigns</h2>
              <Link
                href="/create-campaign"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Create New
              </Link>
            </div>
            
            {userCampaigns.length > 0 ? (
              <div className="space-y-4">
                {userCampaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1 line-clamp-1">{campaign.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{campaign.description}</p>
                      </div>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                        campaign.isActive 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {campaign.isActive ? 'Active' : 'Completed'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-green-400 font-medium">{campaign.amountRaised} ETH</span>
                        <span className="text-gray-400"> / {campaign.targetAmount} ETH</span>
                      </div>
                      <div className="text-blue-400 font-medium">{campaign.fundingPercentage}%</div>
                    </div>
                    
                    <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(campaign.fundingPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                {userCampaigns.length > 3 && (
                  <Link
                    href="/campaign"
                    className="block text-center py-3 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View all {userCampaigns.length} campaigns →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">You haven't created any campaigns yet</p>
                <Link
                  href="/create-campaign"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Campaign
                </Link>
              </div>
            )}
          </div>

          {/* My Posts */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
              <Link
                href="/social"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                View All
              </Link>
            </div>
            
            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                    <p className="text-white text-sm mb-3 line-clamp-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>
                      <span>{post.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                
                {userPosts.length > 3 && (
                  <Link
                    href="/social"
                    className="block text-center py-3 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View all {userPosts.length} posts →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">You haven't shared any posts yet</p>
                <Link
                  href="/social"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Share Your First Post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/create-campaign"
              className="flex items-center gap-3 p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg hover:bg-blue-600/20 transition-colors group"
            >
              <Target className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-white font-medium">Create Campaign</h3>
                <p className="text-gray-400 text-sm">Start fundraising for your music</p>
              </div>
            </Link>
            
            <Link
              href="/campaign"
              className="flex items-center gap-3 p-4 bg-green-600/10 border border-green-500/30 rounded-lg hover:bg-green-600/20 transition-colors group"
            >
              <Heart className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-white font-medium">Support Artists</h3>
                <p className="text-gray-400 text-sm">Discover and fund campaigns</p>
              </div>
            </Link>
            
            <Link
              href="/social"
              className="flex items-center gap-3 p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg hover:bg-purple-600/20 transition-colors group"
            >
              <Users className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-white font-medium">Social Feed</h3>
                <p className="text-gray-400 text-sm">Connect with the community</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

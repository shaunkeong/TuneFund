'use client'

import { Search, Heart, Share2, Users, Calendar, Target } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0x45ea36aD4c839609325D79150fEFF933db670Df2'
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"}],"name":"addCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"string","name":"content","type":"string"}],"name":"addComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"addUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"campaignContributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"comments","outputs":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"}],"name":"createPost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_commentId","type":"uint256"}],"name":"deleteComment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"deletePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"fundCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCampaigns","outputs":[{"components":[{"internalType":"uint256","name":"campaignId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"targetAmount","type":"uint256"},{"internalType":"uint256","name":"amountRaised","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Campaign[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"getPostComments","outputs":[{"components":[{"internalType":"uint256","name":"commentId","type":"uint256"},{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Comment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getSupportedCampaignCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalCampaignsByUser","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalContributedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getTotalFundsRaisedByUser","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"getUserPosts","outputs":[{"components":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TuneFundSmartContract.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"hasUserLikedPost","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"likePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"postComments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"postLikes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"uint256","name":"postId","type":"uint256"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likesCount","type":"uint256"},{"internalType":"uint256","name":"commentsCount","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"unlikePost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userSupportedCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"registrationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const categoryTypes = ['Album Production', 'Concert Tour', 'Music Video', 'Cultural Heritage', 'Education', 'Documentary']
const artistNames = ['Aisha Rahman', 'The KL Collective', 'Faizal Tahir', 'Mizz Nina', 'Sheila Majid', 'Malaysian Music Foundation']

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('all')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      let provider
      let contract

      // Try to use MetaMask first
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          provider = new ethers.providers.Web3Provider(window.ethereum)
          
          // Check network
          const network = await provider.getNetwork()
          console.log('Connected to network:', network.name, 'Chain ID:', network.chainId)
          
          contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
          
          // Check if contract exists at this address
          const contractCode = await provider.getCode(CONTRACT_ADDRESS)
          if (contractCode === '0x') {
            throw new Error(`No contract deployed at address ${CONTRACT_ADDRESS} on ${network.name} (Chain ID: ${network.chainId})`)
          }
          
          // First, try to get the campaign counter to see how many campaigns exist
          let campaignData = []
          
          try {
            // Try the getAllCampaigns function first
            campaignData = await contract.getAllCampaigns()
            console.log('Successfully fetched campaigns:', campaignData.length)
          } catch (getAllError) {
            console.log('getAllCampaigns failed, trying alternative method:', getAllError.message)
            
            // Alternative method: manually fetch campaigns by ID
            // Start from ID 1 and keep fetching until we hit an invalid campaign
            const campaigns = []
            let currentId = 1
            let maxAttempts = 50 // Prevent infinite loop
            
            while (currentId <= maxAttempts) {
              try {
                const campaign = await contract.campaigns(currentId)
                
                // Check if this is a valid campaign (campaignId > 0)
                if (campaign.campaignId && campaign.campaignId.gt(0)) {
                  campaigns.push(campaign)
                  currentId++
                } else {
                  // No more campaigns
                  break
                }
              } catch (singleCampaignError) {
                // This campaign doesn't exist, we've reached the end
                break
              }
            }
            
            campaignData = campaigns
            console.log('Fetched campaigns using alternative method:', campaigns.length)
          }
          
          // Process the campaign data
          const processedCampaigns = campaignData.map((campaign, index) => {
            const targetAmountEth = parseFloat(ethers.utils.formatEther(campaign.targetAmount))
            const amountRaisedEth = parseFloat(ethers.utils.formatEther(campaign.amountRaised))
            const fundingPercentage = targetAmountEth > 0 ? Math.floor((amountRaisedEth / targetAmountEth) * 100) : 0
            
            return {
              id: campaign.campaignId.toString(),
              userId: campaign.userId.toString(),
              title: campaign.title || `Campaign ${campaign.campaignId}`,
              description: campaign.description || 'No description provided',
              targetAmount: targetAmountEth.toFixed(2),
              amountRaised: amountRaisedEth.toFixed(2),
              isActive: campaign.isActive,
              fundingPercentage: Math.min(fundingPercentage, 100),
              // Enhanced mock data
              artist: artistNames[index % artistNames.length],
              category: categoryTypes[index % categoryTypes.length],
              daysLeft: Math.floor(Math.random() * 45) + 5,
              backers: Math.floor(Math.random() * 200) + 25,
              featured: index < 3
            }
          })

          setCampaigns(processedCampaigns)
          
        } catch (contractError) {
          console.error('Contract interaction error:', contractError)
          
          // Check if it's a specific error we can handle
          if (contractError.message.includes('missing revert data') || 
              contractError.message.includes('execution reverted')) {
            setError('⚠️ Smart contract issue detected. This could mean:\n• Contract not deployed at this address\n• Wrong network selected in MetaMask\n• Contract missing getAllCampaigns function\n\nPlease check your contract deployment and network settings.')
          } else if (contractError.message.includes('No contract deployed')) {
            setError(`❌ ${contractError.message}\n\nPlease:\n1. Deploy your smart contract\n2. Update the CONTRACT_ADDRESS\n3. Ensure you're on the correct network`)
          } else {
            setError(`Contract error: ${contractError.message}`)
          }
          
          // For demonstration purposes, let's add some sample data
          // Remove this in production once the contract is properly deployed
          const sampleCampaigns = [
            {
              id: '1',
              userId: '1',
              title: 'Sample Campaign 1',
              description: 'This is a sample campaign to demonstrate the UI while the contract is being set up.',
              targetAmount: '10.00',
              amountRaised: '3.50',
              isActive: true,
              fundingPercentage: 35,
              artist: 'Aisha Rahman',
              category: 'Album Production',
              daysLeft: 25,
              backers: 87,
              featured: true
            },
            {
              id: '2',
              userId: '2',
              title: 'Sample Campaign 2',
              description: 'Another sample campaign showing different funding progress.',
              targetAmount: '15.00',
              amountRaised: '12.75',
              isActive: true,
              fundingPercentage: 85,
              artist: 'The KL Collective',
              category: 'Cultural Heritage',
              daysLeft: 18,
              backers: 156,
              featured: true
            },
            {
              id: '3',
              userId: '3',
              title: 'Sample Campaign 3',
              description: 'A third sample campaign demonstrating various states.',
              targetAmount: '8.00',
              amountRaised: '8.00',
              isActive: false,
              fundingPercentage: 100,
              artist: 'Faizal Tahir',
              category: 'Concert Tour',
              daysLeft: 0,
              backers: 203,
              featured: true
            }
          ]
          
          // Only use sample data if no real campaigns were found
          if (campaigns.length === 0) {
            console.log('Using sample data for demonstration')
            setCampaigns(sampleCampaigns)
          }
        }
      } else {
        setError('MetaMask not detected. Please install MetaMask to view campaigns.')
        
        // Still show sample data for demo purposes
        const sampleCampaigns = [
          {
            id: '1',
            userId: '1',
            title: 'Demo Campaign - Install MetaMask',
            description: 'Install MetaMask wallet to interact with real blockchain campaigns.',
            targetAmount: '10.00',
            amountRaised: '0.00',
            isActive: true,
            fundingPercentage: 0,
            artist: 'Demo Artist',
            category: 'Demo',
            daysLeft: 30,
            backers: 0,
            featured: true
          }
        ]
        setCampaigns(sampleCampaigns)
      }

    } catch (err) {
      console.error('Error fetching campaigns:', err)
      setError(`Failed to load campaigns: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (sortBy === 'active') return campaign.isActive && matchesSearch
    return matchesSearch
  })

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'newest') return parseInt(b.id) - parseInt(a.id)
    return 0
  })

  // Calculate statistics
  const totalRaised = campaigns.reduce((sum, campaign) => sum + parseFloat(campaign.amountRaised), 0)
  const totalBackers = campaigns.reduce((sum, campaign) => sum + campaign.backers, 0)
  const averageFunding = campaigns.length > 0 
    ? campaigns.reduce((sum, campaign) => sum + campaign.fundingPercentage, 0) / campaigns.length
    : 0

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#4361EE] to-[#7209B7] pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Header Content */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing Campaigns
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Support Malaysian musicians and help bring their creative visions to life
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Active Campaigns */}
            <div className="text-center">
              <div className="text-5xl md:text-5xl font-bold text-white mb-2">
                {campaigns.filter(c => c.isActive).length}
              </div>
              <div className="text-white/80 text-lg">Active Campaigns</div>
            </div>

            {/* Total Raised */}
            <div className="text-center">
              <div className="text-5xl md:text-5xl font-bold text-white mb-2 whitespace-nowrap">
                {totalRaised.toFixed(1)} ETH
              </div>
              <div className="text-white/80 text-lg">Total Raised</div>
            </div>

            {/* Total Backers */}
            <div className="text-center">
              <div className="text-5xl md:text-5xl font-bold text-white mb-2">{totalBackers}</div>
              <div className="text-white/80 text-lg">Total Backers</div>
            </div>

            {/* Average Funding */}
            <div className="text-center">
              <div className="text-5xl md:text-5xl font-bold text-white mb-2">
                {Math.round(averageFunding)}%
              </div>
              <div className="text-white/80 text-lg">Avg. Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Listing Section */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns, artists, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B1120] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setSortBy('all')}
                className={`px-6 py-2.5 rounded-lg border transition-colors ${
                  sortBy === 'all' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-[#0B1120] text-white border-gray-800 hover:bg-gray-800'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setSortBy('newest')}
                className={`px-6 py-2.5 rounded-lg border transition-colors ${
                  sortBy === 'newest' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-[#0B1120] text-white border-gray-800 hover:bg-gray-800'
                }`}
              >
                Newest First
              </button>
              <Link
                href="/create-campaign"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Campaign
              </Link>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-400 mb-6">
            Showing {sortedCampaigns.length} of {campaigns.length} campaigns
          </p>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-400 mt-4">Loading campaigns...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={fetchCampaigns}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Campaign Grid - Exactly 3 per row */}
          {!loading && !error && sortedCampaigns.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sortedCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* Campaign Image/Header */}
                  <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {campaign.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {campaign.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          🌟 FEATURED
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 text-white">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 h-14">
                        {campaign.title}
                      </h3>
                      <p className="text-blue-400 font-medium">by {campaign.artist}</p>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 h-16">
                      {campaign.description}
                    </p>

                    {/* Funding Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{campaign.fundingPercentage}% funded</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          campaign.isActive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {campaign.isActive ? 'Active' : 'Completed'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(campaign.fundingPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Funding Stats */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-green-400 text-xl font-bold">{campaign.amountRaised} ETH</p>
                        <p className="text-gray-400 text-sm">of {campaign.targetAmount} ETH goal</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-white font-medium">{campaign.backers}</span>
                        </div>
                        <p className="text-gray-400 text-sm">backers</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/campaign-details?id=${campaign.id}`}
                      className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
                    >
                      Support Campaign
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No campaigns found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? "No campaigns match your search. Try different keywords or create the first campaign!"
                  : "Be the first to create a campaign and support Malaysian music!"
                }
              </p>
              <Link
                href="/create-campaign"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Create the First Campaign
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

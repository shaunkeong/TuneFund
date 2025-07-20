// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TuneFundSmartContract {
    address private owner;
    uint256 private userIdCounter = 1;
    uint256 private campaignIdCounter = 1;
    uint256 private postIdCounter = 1;
    uint256 private commentIdCounter = 1;

    struct User {
        uint256 userId;
        address wallet;
        uint256 registrationTime;
    }

    struct Campaign {
        uint256 campaignId;
        uint256 userId;
        string title;
        string description;
        uint256 targetAmount;
        uint256 amountRaised;
        bool isActive;
    }

    struct Post {
        uint256 postId;
        uint256 userId;
        string content;
        string imageUrl;
        uint256 timestamp;
        uint256 likesCount;
        uint256 commentsCount;
        bool isActive;
    }

    struct Comment {
        uint256 commentId;
        uint256 postId;
        uint256 userId;
        string content;
        uint256 timestamp;
        bool isActive;
    }

    mapping(uint256 => User) public users;
    mapping(address => uint256) public addressToUserId;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment) public comments;
    mapping(address => uint256[]) public userSupportedCampaigns;
    mapping(uint256 => mapping(address => uint256)) public campaignContributions;
    
    // Social media mappings
    mapping(uint256 => mapping(address => bool)) public postLikes; // postId => user address => liked
    mapping(address => uint256[]) public userPosts; // user address => post IDs
    mapping(uint256 => uint256[]) public postComments; // postId => comment IDs

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyRegisteredUser() {
        require(addressToUserId[msg.sender] != 0, "Not registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addUser() external {
        require(addressToUserId[msg.sender] == 0, "Already registered");

        users[userIdCounter] = User({
            userId: userIdCounter,
            wallet: msg.sender,
            registrationTime: block.timestamp
        });

        addressToUserId[msg.sender] = userIdCounter;
        userIdCounter++;
    }

    function addCampaign(string calldata title, string calldata description, uint256 targetAmount) external onlyRegisteredUser {
        uint256 uid = addressToUserId[msg.sender];

        campaigns[campaignIdCounter] = Campaign({
            campaignId: campaignIdCounter,
            userId: uid,
            title: title,
            description: description,
            targetAmount: targetAmount,
            amountRaised: 0,
            isActive: true
        });

        campaignIdCounter++;
    }

    // Social Media Functions
    function createPost(string calldata content, string calldata imageUrl) external onlyRegisteredUser {
        uint256 uid = addressToUserId[msg.sender];

        posts[postIdCounter] = Post({
            postId: postIdCounter,
            userId: uid,
            content: content,
            imageUrl: imageUrl,
            timestamp: block.timestamp,
            likesCount: 0,
            commentsCount: 0,
            isActive: true
        });

        userPosts[msg.sender].push(postIdCounter);
        postIdCounter++;
    }

    function likePost(uint256 _postId) external onlyRegisteredUser {
        require(_postId > 0 && _postId < postIdCounter, "Invalid post ID");
        require(posts[_postId].isActive, "Post is not active");
        require(!postLikes[_postId][msg.sender], "Already liked this post");

        postLikes[_postId][msg.sender] = true;
        posts[_postId].likesCount++;
    }

    function unlikePost(uint256 _postId) external onlyRegisteredUser {
        require(_postId > 0 && _postId < postIdCounter, "Invalid post ID");
        require(posts[_postId].isActive, "Post is not active");
        require(postLikes[_postId][msg.sender], "Haven't liked this post");

        postLikes[_postId][msg.sender] = false;
        posts[_postId].likesCount--;
    }

    function addComment(uint256 _postId, string calldata content) external onlyRegisteredUser {
        require(_postId > 0 && _postId < postIdCounter, "Invalid post ID");
        require(posts[_postId].isActive, "Post is not active");
        require(bytes(content).length > 0, "Comment cannot be empty");

        uint256 uid = addressToUserId[msg.sender];

        comments[commentIdCounter] = Comment({
            commentId: commentIdCounter,
            postId: _postId,
            userId: uid,
            content: content,
            timestamp: block.timestamp,
            isActive: true
        });

        postComments[_postId].push(commentIdCounter);
        posts[_postId].commentsCount++;
        commentIdCounter++;
    }

    function deletePost(uint256 _postId) external onlyRegisteredUser {
        require(_postId > 0 && _postId < postIdCounter, "Invalid post ID");
        
        Post storage post = posts[_postId];
        require(post.postId != 0, "Post does not exist");
        
        User memory postCreator = users[post.userId];
        require(msg.sender == postCreator.wallet, "Not post creator");
        
        post.isActive = false;
    }

    function deleteComment(uint256 _commentId) external onlyRegisteredUser {
        require(_commentId > 0 && _commentId < commentIdCounter, "Invalid comment ID");
        
        Comment storage comment = comments[_commentId];
        require(comment.commentId != 0, "Comment does not exist");
        
        User memory commentCreator = users[comment.userId];
        require(msg.sender == commentCreator.wallet, "Not comment creator");
        
        comment.isActive = false;
        posts[comment.postId].commentsCount--;
    }

    // Getter functions for social media
    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postIdCounter - 1);
        uint256 count = 0;

        for (uint256 i = 1; i < postIdCounter; i++) {
            if (posts[i].isActive) {
                allPosts[count] = posts[i];
                count++;
            }
        }

        // Resize array to remove empty slots
        Post[] memory activePosts = new Post[](count);
        for (uint256 i = 0; i < count; i++) {
            activePosts[i] = allPosts[i];
        }

        return activePosts;
    }

    function getPostComments(uint256 _postId) external view returns (Comment[] memory) {
        require(_postId > 0 && _postId < postIdCounter, "Invalid post ID");
        
        uint256[] memory commentIds = postComments[_postId];
        uint256 activeCount = 0;
        
        // Count active comments
        for (uint256 i = 0; i < commentIds.length; i++) {
            if (comments[commentIds[i]].isActive) {
                activeCount++;
            }
        }
        
        Comment[] memory activeComments = new Comment[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < commentIds.length; i++) {
            if (comments[commentIds[i]].isActive) {
                activeComments[index] = comments[commentIds[i]];
                index++;
            }
        }
        
        return activeComments;
    }

    function getUserPosts(address userAddr) external view returns (Post[] memory) {
        uint256[] memory postIds = userPosts[userAddr];
        uint256 activeCount = 0;
        
        // Count active posts
        for (uint256 i = 0; i < postIds.length; i++) {
            if (posts[postIds[i]].isActive) {
                activeCount++;
            }
        }
        
        Post[] memory activePosts = new Post[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < postIds.length; i++) {
            if (posts[postIds[i]].isActive) {
                activePosts[index] = posts[postIds[i]];
                index++;
            }
        }
        
        return activePosts;
    }

    function hasUserLikedPost(uint256 _postId, address userAddr) external view returns (bool) {
        return postLikes[_postId][userAddr];
    }

    // Existing campaign functions continue below...
    function fundCampaign(uint256 _campaignId) external payable onlyRegisteredUser {
        require(_campaignId > 0 && _campaignId < campaignIdCounter, "Invalid campaign ID");

        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.isActive, "Campaign is not active");
        require(msg.value > 0, "Must send ETH");

        campaign.amountRaised += msg.value;
        campaignContributions[_campaignId][msg.sender] += msg.value;

        // Prevent duplicate campaign entries
        if (!hasSupportedCampaign(msg.sender, _campaignId)) {
            userSupportedCampaigns[msg.sender].push(_campaignId);
        }
    }

    function withdrawFunds(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.campaignId != 0, "Campaign does not exist");

        User memory creator = users[campaign.userId];
        require(msg.sender == creator.wallet, "Not campaign creator");
        require(campaign.amountRaised > 0, "No funds to withdraw");

        uint256 amount = campaign.amountRaised;
        campaign.amountRaised = 0;
        campaign.isActive = false;

        payable(msg.sender).transfer(amount);
    }

    function hasSupportedCampaign(address user, uint256 campaignId) internal view returns (bool) {
        uint256[] memory supported = userSupportedCampaigns[user];
        for (uint256 i = 0; i < supported.length; i++) {
            if (supported[i] == campaignId) {
                return true;
            }
        }
        return false;
    }

    function getTotalCampaignsByUser(address userAddr) external view returns (uint256 count) {
        uint256 uid = addressToUserId[userAddr];
        for (uint256 i = 1; i < campaignIdCounter; i++) {
            if (campaigns[i].userId == uid) {
                count++;
            }
        }
    }

    function getTotalFundsRaisedByUser(address userAddr) external view returns (uint256 total) {
        uint256 uid = addressToUserId[userAddr];
        for (uint256 i = 1; i < campaignIdCounter; i++) {
            if (campaigns[i].userId == uid) {
                total += campaigns[i].amountRaised;
            }
        }
    }

    function getTotalContributedByUser(address userAddr) external view returns (uint256 total) {
        for (uint256 i = 1; i < campaignIdCounter; i++) {
            total += campaignContributions[i][userAddr];
        }
    }

    function getSupportedCampaignCount(address userAddr) external view returns (uint256) {
        return userSupportedCampaigns[userAddr].length;
    }

    function getAllCampaigns() external view returns (Campaign[] memory) {
        // Create an array to store active campaigns
        Campaign[] memory allCampaigns = new Campaign[](campaignIdCounter - 1);
        uint256 count = 0;

        // Iterate through all campaigns and add them to the array
        for (uint256 i = 1; i < campaignIdCounter; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[count] = campaign;
            count++;
        }

        return allCampaigns;
    }

    // not important function
    // function notImportant() external {
    //     // do nothing
    // }
}
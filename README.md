deployed contract: f11b08bebcb0e2d0e367234683f4bb86eafd1d2f621a2b0c2543c719a1a18fc4

Stryd Fitness Challenge dApp
This project contains the full-stack application for the Stryd Fitness Challenge, built on the Aptos blockchain with a Next.js frontend. It allows two users to enter into a direct fitness challenge, stake cryptocurrency, track their progress, and automatically determine a winner.
This README is divided into two main parts: Frontend (Next.js) and Smart Contract (Aptos Move).
Frontend (Next.js)
This section covers how to set up and run the user interface for the dApp.
Getting Started
First, ensure you have Node.js (version 18.x or later) and a package manager like npm or yarn installed.
Then, clone the repository and install the dependencies:
git clone <your-repo-url>
cd <your-repo-folder>
npm install
# or
yarn install


Running the Development Server
To start the development server and view the application in your browser, run:
npm run dev
# or
yarn dev


Open http://localhost:3000 with your browser to see the result.
You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.
Learn More about Next.js
To learn more about Next.js, take a look at the following resources:
Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
Smart Contract (Aptos Move)
This section covers the on-chain logic and how to deploy and interact with it directly.
Overview
The core functionality of this smart contract is to facilitate peer-to-peer fitness competitions. A user can create a challenge, define an opponent and a stake, and both participants can submit their progress. The contract logic then resolves the challenge by declaring a winner based on the submitted progress.
Smart Contract Architecture
The contract is composed of two main data structures:
ChallengeStore
A resource stored under the account of a user who wants to create or join challenges. It acts as a personal registry for that user's challenges.
challenges: A vector that holds all Challenge objects created by or involving the user.
next_id: A counter to ensure every new challenge gets a unique ID within that store.
Challenge
A struct representing a single fitness challenge.
ID: The unique identifier for the challenge.
creator: The address of the user who initiated the challenge.
opponent: The address of the user who was challenged.
creator_progress & opponent_progress: Stores the fitness progress for each participant.
stake_amount: The amount of coin staked (Note: Payout logic is a placeholder).
vault_address: The address of the vault holding the stake.
joined, is_resolved, is_active: Flags to track the state of the challenge.
winner: Stores the address of the winner after resolution.
How to Use the Smart Contract Directly
1. Deployment
Prerequisite: Make sure you have the Aptos CLI installed and a profile configured with a funded account.
Publish the contract from your project's root directory:
aptos move publish


2. Initialize the Challenge Store
Before a user can create or join a challenge, they must initialize their own ChallengeStore. This needs to be done one time for each user account that will interact with the contract.
aptos move run \
  --function-id '<PUBLISHER_ADDRESS>::fitness_challenge::init_store' \
  --profile <USER_PROFILE_NAME>


Replace <PUBLISHER_ADDRESS> with the address that deployed the contract.
Replace <USER_PROFILE_NAME> with the profile of the user initializing their store.
3. Create a Challenge
A user who has initialized their store can create a new challenge.
aptos move run \
  --function-id '<PUBLISHER_ADDRESS>::fitness_challenge::create_challenge' \
  --args 'address:<OPPONENT_ADDRESS>' 'u64:<STAKE_AMOUNT>' 'address:<VAULT_ADDRESS>' \
  --profile <CREATOR_PROFILE_NAME>


4. Join a Challenge
The challenged opponent must join the challenge to make it active. The opponent must also have initialized their own ChallengeStore first.
aptos move run \
  --function-id '<PUBLISHER_ADDRESS>::fitness_challenge::join_challenge' \
  --args 'u64:<CHALLENGE_ID>' \
  --profile <OPPONENT_PROFILE_NAME>


5. Submit Progress
Either the creator or the opponent can submit their progress at any time.
aptos move run \
  --function-id '<PUBLISHER_ADDRESS>::fitness_challenge::submit_progress' \
  --args 'u64:<CHALLENGE_ID>' 'u64:<PROGRESS_SCORE>' \
  --profile <USER_PROFILE_NAME>


6. Resolve the Challenge
Once the competition is over, either participant can resolve the challenge.
aptos move run \
  --function-id '<PUBLISHER_ADDRESS>::fitness_challenge::resolve_challenge' \
  --args 'u64:<CHALLENGE_ID>' \
  --profile <USER_PROFILE_NAME>


Important Note on Payouts
The resolve_challenge function currently determines and records the winner on-chain. However, the logic for the actual payout of the stake from the vault_address is a placeholder. A complete implementation would require integrating Aptos Coin management logic to transfer the funds from the vault to the winner's account upon resolution.
module Stryd::fitness_challenge {

    use std::vector;
    use std::signer;
    use std::error;
    use std::option::{Self, Option};
    use std::string;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;

    /// Each participant's data
    struct Participant has key, store {
        addr: address,
        progress: u64,
    }

    /// Challenge object
    struct Challenge has key, store {
        ID: u64,
        creator: address,
        opponent: address,
        creator_progress: u64,
        opponent_progress: u64,
        stake_amount: u64,
        joined: bool,
        is_resolved: bool,
        winner: address,
        vault_address: address,
        is_active: bool,
    }

    /// Global challenge list
    struct ChallengeStore has key {
        next_id: u64,
        challenges: vector<Challenge>,
    }

    /// Initialize the challenge store
   use aptos_framework::event;

public entry fun init_store(account: &signer) {
    let addr = signer::address_of(account);
    move_to(account, ChallengeStore {
        next_id: 0,
        challenges: vector::empty<Challenge>(),
    });
}


    /// Create a new challenge
public entry fun create_challenge(account: &signer, opponent: address, stake_amount: u64, vault_address: address)
    acquires ChallengeStore {
        let creator = signer::address_of(account);
        let store = borrow_global_mut<ChallengeStore>(creator);

        let challenge_id = store.next_id;
        store.next_id = challenge_id + 1;

        let challenge = Challenge {
            ID: challenge_id,
            creator,
            opponent,
            creator_progress: 0,
            opponent_progress: 0,
            stake_amount,
            joined: false,
            is_resolved: false,
            winner: @0x0,
            vault_address,
            is_active: true,
        };

    vector::push_back(&mut store.challenges, challenge);
    store.next_id = challenge_id + 1;

}

    /// Join an existing challenge
   public entry fun join_challenge(account: &signer, challenge_id: u64)
    acquires ChallengeStore {
        let opponent_addr = signer::address_of(account);
        let store = borrow_global_mut<ChallengeStore>(opponent_addr);
        let challenge = borrow_mut_challenge(&mut store.challenges, challenge_id);

        assert!(!challenge.joined, 100);
        assert!(challenge.opponent == opponent_addr, 101);

        challenge.joined = true;
    }


    /// Submit progress to a challenge
    public entry fun submit_progress(account: &signer, challenge_id: u64, progress: u64)
    acquires ChallengeStore {
        let addr = signer::address_of(account);
        let store = borrow_global_mut<ChallengeStore>(addr);
        let challenge = borrow_mut_challenge(&mut store.challenges, challenge_id);

        if (addr == challenge.creator) {
            challenge.creator_progress = progress;
        } else if (addr == challenge.opponent) {
            challenge.opponent_progress = progress;
        } else {
            abort 102;
        }
    }

    /// Payout and finalize the challenge
    public entry fun resolve_challenge(account: &signer, challenge_id: u64) acquires ChallengeStore {
    let addr = signer::address_of(account);
    let store = borrow_global_mut<ChallengeStore>(addr);
    let challenge = borrow_mut_challenge(&mut store.challenges, challenge_id);

    // Ensure challenge is not resolved already and the caller is a participant
    assert!(!challenge.is_resolved, 101);
    assert!(challenge.creator == addr || challenge.opponent == addr, 102);
    assert!(challenge.joined, 103);

    // Determine the winner
    if (challenge.creator_progress > challenge.opponent_progress) {
        challenge.winner = challenge.creator;
    } else if (challenge.opponent_progress > challenge.creator_progress) {
        challenge.winner = challenge.opponent;
    } else {
        challenge.winner = @0x0; // draw, no winner
    };

    challenge.is_resolved = true;

    // Payout logic placeholder: transfer from vault_address to winner, etc.
    // e.g., use Coin<T> logic here to pay from vault if integrated
}


    /// Get the winner
    public fun get_winner(challenge: &Challenge): address {
        challenge.winner
    }

    /// Get list of all challenges
    public fun get_all_challenges(store: &ChallengeStore): &vector<Challenge> {
        &store.challenges
    }

    /// Check if a challenge is active
    public fun is_active(store: &ChallengeStore, challenge_id: u64): bool {
        let challenge = borrow_challenge(&store.challenges, challenge_id);
        challenge.is_active
    }

    /// Helpers

    fun borrow_mut_challenge(challenges: &mut vector<Challenge>, id: u64): &mut Challenge {
        let len = vector::length(challenges);
        let i = 0;
        while (i < len) {
            let ch = vector::borrow_mut(challenges, i);
            if (ch.ID == id) {
                return ch;
            };
            i = i + 1;
        };
        abort 404
    }

    fun borrow_challenge(challenges: &vector<Challenge>, id: u64): &Challenge {
        let len = vector::length(challenges);
        let i = 0;
        while (i < len) {
            let ch = vector::borrow(challenges, i);
            if (ch.ID == id) {
                return ch;
            };
            i = i + 1;
        };
        abort 404
    }
}
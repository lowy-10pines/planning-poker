export function createRoom(): string {
    const code = "SOME-RANDOM-CODE" //TODO: call UUID generate
    // TODO: push new room to firebase
    return code
}

export function closeVoting(roomCode: string) {
    // TODO: push to firebase the end vote notice
}

export function setVote(userId: string, vote: string, roomCode: string) {
    // TODO: push vote for participant to firebase 
}

export function addParticipant(participant: { id: string, name: string }, roomCode: string) {
    // TODO: push participant to firebase without vote value
}
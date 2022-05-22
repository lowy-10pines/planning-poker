import { collection, addDoc, getFirestore, setDoc, doc, updateDoc, arrayRemove, arrayUnion, DocumentReference } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import Room from "../types/Room";

function roomRef(code: string) {
    const db = getFirestore();
    return doc(collection(db, "rooms"), code)
}
function issueRef(issue: string, roomRef: DocumentReference) {
    return doc(collection(roomRef, "issues"), issue)
}

export function createRoom(): string {
    const code = uuidv4();
    const room: Room = {
        isEmpty: false,
        code,
        issue: "Default Issue",
        participants: {},
        voting: true
    }
    setDoc(roomRef(code), room).catch(e => {
        console.error("Error adding document: ", e);
    })
    return code
}

export function closeVoting(roomCode: string) {
    updateDoc(roomRef(roomCode), { voting: false }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function setVote(userId: string, issue: string, vote: string, roomCode: string) {
    setDoc(issueRef(issue, roomRef(roomCode)), { [userId]: vote }, { merge: true }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function setParticipant(participant: { id: string, name: string }, roomCode: string) {
    updateDoc(roomRef(roomCode), {
        [`participants.${participant.id}`]: participant.name
    }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function changeIssue(issue: string, roomCode: string) {
    updateDoc(roomRef(roomCode), { 
        issue,
        voting: true,
    }).catch(e => {
        console.error("Error updating document: ", e);
    })
    
}
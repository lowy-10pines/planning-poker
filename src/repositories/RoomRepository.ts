import { collection, addDoc, getFirestore, setDoc, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import Room from "../types/Room";

export function createRoom(): string {
    const db = getFirestore();
    const code = uuidv4();
    const room: Room = {
        isEmpty: false,
        code,
        issue: "Default Issue",
        participants: [],
        voting: true
    }
    setDoc(doc(collection(db, "rooms"), code), room).catch(e => {
        console.error("Error adding document: ", e);
    })
    return code
}

export function closeVoting(roomCode: string) {
    const db = getFirestore();
    const roomRef = doc(collection(db, "rooms"), roomCode)
    updateDoc(roomRef, { voting: false }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function setVote(userId: string, issue: string, vote: string, roomCode: string) {
    const db = getFirestore();
    const roomRef = doc(collection(db, "rooms"), roomCode)
    const issueRef = doc(collection(roomRef, "issues"), issue)

    setDoc(issueRef, { [userId]: vote }, { merge: true }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function addParticipant(participant: { id: string, name: string }, roomCode: string) {
    const db = getFirestore();
    const roomRef = doc(collection(db, "rooms"), roomCode)

   updateDoc(roomRef, { 
        participants: arrayUnion({ ...participant })
    }).catch(e => {
        console.error("Error updating document: ", e);
    })
}

export function changeIssue(issue: string, roomCode: string) {
    const db = getFirestore();
    const roomRef = doc(collection(db, "rooms"), roomCode)

    updateDoc(roomRef, { 
        issue,
        voting: true,
    }).catch(e => {
        console.error("Error updating document: ", e);
    })
    
}
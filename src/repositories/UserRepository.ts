import { getAuth, updateProfile } from "firebase/auth";
import { setParticipant } from "./RoomRepository";

export function setCurrentUserName(name: string, roomCode: string) {
    const auth = getAuth();
    const user = auth.currentUser
    if (user) {
        updateProfile(user, { displayName: name }).catch(e => {
            console.error("Error updating user", e)
        })
        setParticipant({ id: user.uid, name }, roomCode)
    }
}
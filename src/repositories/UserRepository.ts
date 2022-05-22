import { getAuth, updateProfile } from "firebase/auth";

export function setCurrentUserName(name: string) {
    const auth = getAuth();
    const user = auth.currentUser
    if (user) {
        updateProfile(user, { displayName: name }).catch(e => {
            console.log("Error updating user", e)
        })
    }
}
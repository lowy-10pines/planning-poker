import { createContext, FC, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UserData {
    id: string;
    name: string;
}
const defaultState = { id: "default", name: "" }
const UserContext = createContext<UserData>(defaultState)

interface UserContextProps {
    children: React.ReactNode;
}
export const UserContextProvider: FC<UserContextProps> = ({ children }) => {
    const auth = getAuth();
    const startingState = auth.currentUser ? {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName ?? "Anonymous"
    } : defaultState
    const [state, setState] = useState<UserData>(startingState)

    onAuthStateChanged(auth, (user) => {
        if (state.id === user?.uid) { return }
        if (user) {
            setState({
                id: user.uid,
                name: user.displayName ?? "Anonymous"
            })
        } else {
            setState(defaultState)
        }
    });
    return (<UserContext.Provider value={state}>
        {children}
    </UserContext.Provider>)
}

export function useUser() {
    return useContext(UserContext);
}
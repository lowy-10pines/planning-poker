import { createContext, FC, useContext, useState } from "react";

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
    const [state, setState] = useState<UserData>(defaultState)

    // TODO: Subscribe to user state from firebase here

    return (<UserContext.Provider value={state}>
        {children}
    </UserContext.Provider>)
}

export function useUser() {
    return useContext(UserContext);
}
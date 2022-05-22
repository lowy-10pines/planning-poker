import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useRoom } from "./RoomContext";

interface VotesData {
    votes: Array<{ id: string, value: string }>;
}
const defaultState: VotesData = { votes: [] }
const VotesContext = createContext<VotesData>(defaultState)

interface VotesContextProps {
    children: React.ReactNode;
  }
export const VotesContextProvider: FC<VotesContextProps> = ({ children }) => {
    const [state, setState] = useState<VotesData>(defaultState)
    const room = useRoom()

    useEffect(() => {
        if (!room.issue || !room.code) { return }
        const db = getFirestore()

        const roomRef = doc(collection(db, "rooms"), room.code)
        const issueRef = doc(collection(roomRef, "issues"), room.issue)

        const unsub = onSnapshot(issueRef, (doc) => {
            const data = doc.data();
            if (!data) { 
                setState({ votes: [] })
                return 
            }

            const votes: Array<{ id: string, value: string }> = Object.keys(data)
                .map(key => {
                    return { id: key, value: data[key] }
                })

            setState({ votes })
          });

        return () => {
            unsub && unsub()
        }
    }, [room.issue, room.code])

    return (<VotesContext.Provider value={state}>
        {children}
    </VotesContext.Provider>)
}

export function useVotes() {
    return useContext(VotesContext);
}
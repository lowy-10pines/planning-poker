import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { setParticipant, createRoom } from "../repositories/RoomRepository";
import Room from "../types/Room";
import { useUser } from "./UserContext";

interface RoomData extends Room {
    generateRoom: () => void;
    joinRoom: (code: string) => void;
}
const defaultState: RoomData = { isEmpty: true, code: "", issue: "", participants: {}, voting: true, generateRoom: () => {}, joinRoom: (_) => {} }
const RoomContext = createContext<RoomData>(defaultState)

interface RoomContextProps {
    children: React.ReactNode;
  }
export const RoomContextProvider: FC<RoomContextProps> = ({ children }) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)
    const [state, setState] = useState<RoomData>(defaultState)
    const user = useUser()

    useEffect(() => {
        function joinRoom(code: string) {
            setParticipant(user, code)
            setRoomCode(code)
        }

        function generateRoom() {
            const randomCode = createRoom()
            joinRoom(randomCode)
        }

        setState(prev => ({
            ...prev,
            generateRoom,
            joinRoom
        }))
    }, [user, setRoomCode])

    useEffect(() => {
        if (!roomCode) { return }

        const db = getFirestore()
        const unsub = onSnapshot(doc(db, "rooms", roomCode), (doc) => {
            const data = doc.data();
            if (!data) { return }

            setState(prev => {
                return {
                    ...prev,
                    code: data.code,
                    isEmpty: false,
                    issue: data.issue,
                    participants: data.participants,
                    voting: data.voting
                }
            })
          });

        return () => {
            unsub && unsub()
        }
    }, [roomCode])

    return (<RoomContext.Provider value={state}>
        {children}
    </RoomContext.Provider>)
}

export function useRoom() {
    return useContext(RoomContext);
}
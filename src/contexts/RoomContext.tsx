import { createContext, FC, useContext, useEffect, useState } from "react";
import { addParticipant, createRoom } from "../repositories/RoomRepository";
import { useUser } from "./UserContext";

interface RoomData {
    isEmpty: boolean;
    code: string;
    issue: string;
    participants: Array<{id: string, name: string, vote: string}>
    voting: boolean;
    generateRoom: () => void;
    joinRoom: (code: string) => void;
}
const defaultState: RoomData = { isEmpty: true, code: "", issue: "", participants: [], voting: true, generateRoom: () => {}, joinRoom: (_) => {} }
const RoomContext = createContext<RoomData>(defaultState)

interface RoomContextProps {
    children: React.ReactNode;
  }
export const RoomContextProvider: FC<RoomContextProps> = ({ children }) => {
    const [roomCode, setRoomCode] = useState<string | null>(null)
    const user = useUser()

    function joinRoom(code: string) {
        addParticipant(user, code)
        setRoomCode(code)
    }
    function generateRoom() {
        const randomCode = createRoom()
        joinRoom(randomCode)
    }

    const [state, setState] = useState<RoomData>({ ...defaultState,
        generateRoom,
        joinRoom
   })

    useEffect(() => {
        if (!roomCode) { return }
        // TODO: Subscribe to room state using code from firebase here
        setState(prev => {
            return {
                ...prev,
                code: roomCode,
                isEmpty: false,
                issue: "12345",
                participants: [
                    { id: "123", name: "Lowy", vote: "5" },
                    { id: "default", name: "Default", vote: "" }
                ],
                voting: true
            }
        })

    }, [roomCode])
    


    return (<RoomContext.Provider value={state}>
        {children}
    </RoomContext.Provider>)
}

export function useRoom() {
    return useContext(RoomContext);
}
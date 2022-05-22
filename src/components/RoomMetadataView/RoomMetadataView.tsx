import { useEffect, useRef, useState } from 'react';
import { useRoom } from '../../contexts/RoomContext'
import { useUser } from '../../contexts/UserContext';
import { changeIssue } from '../../repositories/RoomRepository';
import styles from './RoomMetadataView.module.css'

export function RoomMetadataView() {
    const room = useRoom();
    const user = useUser();
    
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [room.isEmpty])
    const joinRoomRef = useRef<HTMLInputElement>(null)
    const issueRef = useRef<HTMLInputElement>(null)

    return (<div className={styles.container}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Pepita" defaultValue={user.name}></input>
        <input type="button" value="Change" /><br/>

        { room.isEmpty && (<>
            <input type="button" value="Generate room code" onClick={() => {
                setLoading(true)
                room.generateRoom()
            }} /><br/>
            OR
            <label htmlFor="join-room">Join room</label>
            <input ref={joinRoomRef} id="join-room" type="text" placeholder="SOME-OTHER-ROOM"></input>
            <input type="button" value="Join" onClick={() => {
                if (joinRoomRef.current && joinRoomRef.current.value) {
                    setLoading(true)
                    room.joinRoom(joinRoomRef.current.value.trim())
                }
            }}/><br/>
            { loading && <p>Entering room...</p>}
        </>)}
        { !room.isEmpty && (<>
            <div>Room: {room.code}</div>
            <div id="qr-code-container" className={styles.qr}>TODO: Show QR for code here</div>
        
            <label htmlFor="issue">Issue</label>
            <input ref={issueRef} id="issue" type="text" placeholder="SAB-123" defaultValue={room.issue}></input>
            <input type="button" value="Vote" onClick={() => {
                if (issueRef.current && issueRef.current.value) {
                    changeIssue(issueRef.current.value.trim(), room.code)
                }
            }}/><br/>
        </>)}
    </div>)
}
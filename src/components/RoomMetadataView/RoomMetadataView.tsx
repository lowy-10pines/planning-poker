import { useEffect, useRef, useState } from 'react';
import { useRoom } from '../../contexts/RoomContext'
import { useUser } from '../../contexts/UserContext';
import { changeIssue } from '../../repositories/RoomRepository';
import { setCurrentUserName } from '../../repositories/UserRepository';
import styles from './RoomMetadataView.module.css';
import { toCanvas } from 'qrcode';

export function RoomMetadataView() {
    const room = useRoom();
    const user = useUser();
    
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [room.isEmpty])
    const joinRoomRef = useRef<HTMLInputElement>(null)
    const issueRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const qrCanvasRef = useRef<HTMLCanvasElement>(null)

    if (qrCanvasRef.current && !room.isEmpty) {
        toCanvas(qrCanvasRef.current, room.code, (e) => {
            console.log("Error getting QR code", e)
        })
    }

    return (<div className={styles.container}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} id="name" type="text" placeholder="Pepita" defaultValue={user.name}></input>
        <input type="button" value="Change" onClick={() => {
            if(nameRef.current && nameRef.current.value) {
                setCurrentUserName(nameRef.current.value.trim())
            }
        }}/><br/>

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
            <p className={styles.roomCode}>Code: {room.code}</p>
            <canvas ref={qrCanvasRef} id="qr-code-container" className={styles.qr} />
        
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
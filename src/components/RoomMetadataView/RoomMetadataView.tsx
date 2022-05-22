import { useState } from 'react';
import { useRoom } from '../../contexts/RoomContext'
import { useUser } from '../../contexts/UserContext';
import styles from './RoomMetadataView.module.css'

export function RoomMetadataView() {
    const room = useRoom();
    const user = useUser();

    const [loading, setLoading] = useState(false);

    return (<div className={styles.container}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Pepita" defaultValue={user.name}></input>
        <input type="button" value="Change" /><br/>

        { room.isEmpty && (<>
            <input type="button" value="Generate room code" onClick={() => {
                setLoading(true)
                room.generateRoom()
            }} /><br/>
            { loading && <p>Creating room...</p>}
            OR
            <label htmlFor="join-room">Join room</label>
            <input id="join-room" type="text" placeholder="SOME-OTHER-ROOM"></input>
            <input type="button" value="Join" /><br/>
        </>)}
        { !room.isEmpty && (<>
            <div>Room: {room.code}</div>
            <div id="qr-code-container" className={styles.qr}>TODO: Show QR for code here</div>
        
            <label htmlFor="issue">Issue</label>
            <input id="issue" type="text" placeholder="SAB-123" defaultValue={room.issue}></input>
            <input type="button" value="Vote" /><br/>
        </>)}
    </div>)
}
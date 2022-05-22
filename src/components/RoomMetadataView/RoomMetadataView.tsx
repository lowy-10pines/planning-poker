import styles from './RoomMetadataView.module.css'

export function RoomMetadataView() {
    return (<div className={styles.container}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Pepita"></input>
        <input type="button" value="Change" /><br/>

        <div>Room: MY-AWESOME-CODE</div>
        <div id="qr-code-container" className={styles.qr}/>

        <label htmlFor="issue">Issue</label>
        <input id="issue" type="text" placeholder="SAB-123"></input>
        <input type="button" value="Vote" /><br/>

        <label htmlFor="join-room">Join room</label>
        <input id="join-room" type="text" placeholder="SOME-OTHER-ROOM"></input>
        <input type="button" value="Join" /><br/>
    </div>)
}
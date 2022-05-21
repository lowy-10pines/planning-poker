import styles from './RoomMetadataView.module.css'

export function RoomMetadataView() {
    return (<div className={styles.container}>
        <button>Toggle</button>
        <div>MY-AWESOME-CODE</div>
        <div id="qr-code-container" className={styles.qr}/>
        <label htmlFor="issue">Issue</label>
        <input id="issue" type="text" value="SAB-123"></input>
        <input type="button" value="Vote" />
    </div>)
}
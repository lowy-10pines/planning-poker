import { useRoom } from "../../contexts/RoomContext"
import { useUser } from "../../contexts/UserContext"
import { classes } from "../../helpers/cssModules"
import styles from "./ParticipantsView.module.css"

export function ParticipantsView() {
    const room = useRoom()
    const user = useUser()

    function isCurrentUser(id: string) {
        return user.id === id
    }

    return (<div className={styles.container}>
        { room.participants.map(p => (
            <div 
                key={p.id}
                className={classes(styles.participant, isCurrentUser(p.id) ? styles.self : "" )} 
            >
                <p>{p.name}</p>
                <p>{room.voting ? (p.vote ? "Voted!" : "Is Voting...") : (p.vote ? p.vote : "?")}</p>
            </div>
        ))}
    </div>)
}
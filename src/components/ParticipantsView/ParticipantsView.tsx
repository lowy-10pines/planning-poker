import { useRoom } from "../../contexts/RoomContext"
import { useUser } from "../../contexts/UserContext"
import { useVotes } from "../../contexts/VotesContext"
import { classes } from "../../helpers/cssModules"
import styles from "./ParticipantsView.module.css"

export function ParticipantsView() {
    const room = useRoom()
    const user = useUser()
    const { votes } = useVotes()

    function isCurrentUser(id: string) {
        return user.id === id
    }

    return (<div className={styles.container}>
        { room.participants.map(p => {
            const participation = votes.find(v => v.id === p.id)
            return (
            <div 
                key={p.id}
                className={classes(styles.participant, isCurrentUser(p.id) ? styles.self : "" )} 
            >
                <p>{p.name}</p>
                <p>{room.voting ? (participation ? "Voted!" : "Is Voting...") : (participation?.value ?? "?")}</p>
            </div>
        )}
        )}
    </div>)
} // TODO: Improve visuals for voted/voting states
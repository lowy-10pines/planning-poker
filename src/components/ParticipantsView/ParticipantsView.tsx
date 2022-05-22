import { useRoom } from "../../contexts/RoomContext"
import { useUser } from "../../contexts/UserContext"
import { useVotes } from "../../contexts/VotesContext"
import styles from "./ParticipantsView.module.css"

export function ParticipantsView() {
    const room = useRoom()
    const user = useUser()
    const { votes } = useVotes()

    function isCurrentUser(id: string) {
        return user.id === id
    }

    return (<div className={styles.container}>
        { Object.keys(room.participants).map(key => {
            const participation = votes.find(v => v.id === key)
            return (
            <div 
                key={key}
                className={styles.participant} 
            >
                <p>{room.participants[key]}</p>
                <p>{room.voting ? (participation ? "Voted!" : "Is Voting...") : (participation?.value ?? "?")}</p>
            </div>
        )}
        )}
    </div>)
} // TODO: Improve visuals for voted/voting states
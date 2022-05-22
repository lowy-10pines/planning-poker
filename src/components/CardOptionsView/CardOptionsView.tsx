import { useRoom } from '../../contexts/RoomContext'
import { useUser } from '../../contexts/UserContext'
import { useVotes } from '../../contexts/VotesContext'
import { classes } from '../../helpers/cssModules'
import { setVote } from '../../repositories/RoomRepository'
import { Fibonacci } from '../../types/Fibonacci'
import styles from './CardOptionsView.module.css'

export function CardOptionsView() {
    const room = useRoom()
    const user = useUser()
    const { votes } = useVotes()

    const userParticipation = votes.find(v => v.id === user.id)
    function isUserVote(value: string) {
        return userParticipation && value === userParticipation.value
    }

    return (
    <div className={styles.container}>
        { Fibonacci.map(value => (
            <div key={value} className={classes(styles.card, isUserVote(value) ? styles.self : "") } onClick={() => setVote(user.id, room.issue, value, room.code)}>{value}</div>
        ))}
    </div>
    )
}

// TODO: Improve visuals for selected state
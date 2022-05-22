import { useRoom } from '../../contexts/RoomContext'
import { useUser } from '../../contexts/UserContext'
import { classes } from '../../helpers/cssModules'
import { setVote } from '../../repositories/RoomRepository'
import { Fibonacci } from '../../types/Fibonacci'
import styles from './CardOptionsView.module.css'

export function CardOptionsView() {
    const room = useRoom()
    const user = useUser()

    const userParticipation = room.participants.find(p => p.id === user.id)
    function isUserVote(value: string) {
        return userParticipation && value === userParticipation.vote
    }

    return (
    <div className={styles.container}>
        { Fibonacci.map(value => (
            <div key={value} className={classes(styles.card, isUserVote(value) ? styles.self : "") } onClick={() => setVote(user.id, value, room.code)}>{value}</div>
        ))}
    </div>
    )
}
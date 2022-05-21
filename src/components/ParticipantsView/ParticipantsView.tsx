import styles from "./ParticipantsView.module.css"

export function ParticipantsView() {
    const participants: string[] = ["Micho", "Tito", "Gordo", "Cabezon", "Micho", "Tito", "Gordo", "Cabezon", "Micho", "Tito", "Gordo", "Cabezon", "Micho", "Tito", "Gordo", "Cabezon"]
    return (<div className={styles.container}>
        { participants.map(p => (
            <div className={styles.participant}>Card for {p}</div>
        ))}
    </div>)
}
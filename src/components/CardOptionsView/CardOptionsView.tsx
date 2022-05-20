import styles from './CardOptionsView.module.css'

export function CardOptionsView() {
    return (
    <div className={styles.container}>
        { [1,2,3,5,8,13,21,"?"].map(value => (
            <div className={styles.card}>{value}</div>
        ))}
    </div>
    )
}
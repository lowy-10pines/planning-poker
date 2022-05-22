import { useRoom } from '../../contexts/RoomContext'
import { closeVoting } from '../../repositories/RoomRepository'
import styles from './ResultView.module.css'

export function ResultView() {
    const room = useRoom()

    const initial: Array<{key: string, value: number}> = []
    const results = room.voting ? 
        [] : // Avoids extra work of calculating votes if voting didn't end
        room.participants.map(p => p.vote ? p.vote : "?").reduce((acc, v)=> {
            const exists = acc.some(kv => kv.key === v)
            return exists ? 
                acc.map(kv => kv.key === v ? { key: kv.key, value: kv.value + 1 } : kv) :
                acc.concat({ key: v, value: 1 })
        }, initial)

    const highest = results.reduce((accum, current) => {
        return accum.value >= current.value ? accum : current
    },results[0] ?? { "?": 0 })
    const total = results.reduce((accum, current) => {
        return accum + current.value
    }, 0)

    return (<div className={styles.container}>
        { !room.voting && results.map(kv => (
            <div className={styles.result}>
                { kv.key === highest.key && <p>👑</p> }
                <label htmlFor={`${kv.key}`}>{kv.key}</label>
                <meter id={`${kv.key}`} value={kv.value} min="0" max={total} />
                <p>{kv.value} votes</p>
            </div>
        ))}
        { room.voting && <button onClick={() => closeVoting(room.code)}>Reveal</button> }
    </div>)
}
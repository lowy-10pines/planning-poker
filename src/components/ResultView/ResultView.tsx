import { useState } from 'react'
import styles from './ResultView.module.css'

export function ResultView() {
    const results = [
        { key: 1, value: 2 },
        { key: 2, value: 3 },
        { key: 3, value: 5 },
        { key: 8, value: 1 },
        { key: 13, value: 8 },
        { key: "?", value: 2 },
    ]
    const highest = results.reduce((accum, current) => {
        return accum.value >= current.value ? accum : current
    },results[0] ?? { "?": 0 })
    const total = results.reduce((accum, current) => {
        return accum + current.value
    }, 0)

    const [voting, setVoting] = useState(true);

    return (<div className={styles.container}>
        { !voting && results.map(kv => (
            <div className={styles.result}>
                { kv.key === highest.key && <p>👑</p> }
                <label htmlFor={`${kv.key}`}>{kv.key}</label>
                <meter id={`${kv.key}`} value={kv.value} min="0" max={total} />
                <p>{kv.value} votes</p>
            </div>
        ))}
        { voting && <button onClick={() => setVoting(false)}>Reveal</button> }
    </div>)
}
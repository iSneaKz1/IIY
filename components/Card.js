import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export function Card(props) {
    const {label, value, symbol, id, favorites, addFavorite, selected, setSelected} = props
    return (
        <div className={styles.card} data-selected={`${selected === id}`} onClick={setSelected}>
            <label>{label} ({symbol})</label>
            <div title={`$${value.toFixed(2)}`} className={styles.value}>${value.toFixed(2)}</div>
            <button
                className={styles.buttonFavorite}
                onClick={() => addFavorite()}
                style={{color: favorites.find(f => f.id === id) ? '#ebb134' : undefined}}
                title={'Favoritar'}
            >
                <span className={'material-icons-round'}>star</span>
            </button>
        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    symbol: PropTypes.string,
    id: PropTypes.string,
    favorites: PropTypes.array,
    addFavorite: PropTypes.func,
    selected: PropTypes.string,
    setSelected: PropTypes.func
}
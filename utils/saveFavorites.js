export default function saveFavorites(favorites, setFavorites, a) {
    if (!favorites.find(f => f.id === a.id)) {
        const newArr = [...favorites, a]
        setFavorites(newArr)
        localStorage.setItem('favorites', JSON.stringify(newArr.map(n => n.id)))
    } else {
        const newArr = favorites.filter(f => f.id !== a.id)
        setFavorites(newArr)
        localStorage.setItem('favorites', JSON.stringify(newArr.map(n => n.id)))
    }


}
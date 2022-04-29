import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        setCargando(true);
        const obtenerReceta = async () => {
            if (!bebidaId) return
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
                const { data } = await axios(url);
                setReceta(data.drinks[0]);
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false);
            }
        }
        obtenerReceta();
    }, [bebidaId]);

    useEffect(() => {
        const getLocalStorage = () => {
            const favoritosLs = JSON.parse(localStorage.getItem('favoritos')) ?? [];
            setFavoritos(favoritosLs);
        }
        getLocalStorage();
    }, []);

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    const handleModalClick = () => {
        setModal(!modal);
    }

    const consultarBebida = async (datos) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&${datos.categoria}`;
            const { data } = await axios(url);
            setBebidas(data.drinks);
        } catch (error) {
            console.log(error)
        }
    }

    const handleBebidaId = (id) => {
        setBebidaId(id);
    }

    const incluidoEnFavoritos = (id) => {
        const favoritosConcidencias = favoritos.filter(favorito => favorito.idDrink === id);
        let incluido = false;
        if (favoritosConcidencias.length > 0) {
            incluido = true;
        }
        return incluido
    }

    const agregarFavoritos = (drink) => {
        if (favoritos.length > 0) {
            if (incluidoEnFavoritos(drink.idDrink) === false) {
                setFavoritos([...favoritos, drink]);
            }
        } else {
            setFavoritos([drink]);
        }
    }

    const eliminarFavoritos = (id) => {
        const nuevoFavoritos = favoritos.filter(favorito => favorito.idDrink !== id);
        setFavoritos(nuevoFavoritos);
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                modal,
                handleModalClick,
                handleBebidaId,
                receta,
                setReceta,
                cargando,
                favoritos,
                agregarFavoritos,
                incluidoEnFavoritos,
                eliminarFavoritos
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export { BebidasProvider }

export default BebidasContext;
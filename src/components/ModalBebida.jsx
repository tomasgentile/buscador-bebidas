import { Button, Image, Modal } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

const ModalBebida = () => {
    const { modal, handleModalClick, receta, setReceta, cargando, agregarFavoritos, incluidoEnFavoritos, eliminarFavoritos } = useBebidas();

    const mostrarIngredientes = () => {
        let ingredientes = [];

        for (let i = 1; i < 16; i++) {
            if (receta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={i}>{receta[`strIngredient${i}`]} - {receta[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }
    const checkFavoritos = incluidoEnFavoritos(receta.idDrink);

    return (
        !cargando && (
            <Modal show={modal} onHide={() => {
                handleModalClick()
                setReceta({})
            }}>
                <Image src={receta.strDrinkThumb} alt={`Imagen ${receta.strDrink}`} />
                <Modal.Header>
                    <Modal.Title>{receta.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2>Intrucciones</h2>
                        {receta.strInstructions}
                        <h2>Ingredientes y Cantidades</h2>
                        {mostrarIngredientes()}
                    </div>
                    {checkFavoritos ? (
                        <Button
                            variant='warning'
                            className="w-100 text-uppercase mt-2 mb-2"
                            onClick={() => eliminarFavoritos(receta.idDrink)}
                        >Eliminar de Favoritos</Button>
                    ) : (
                        <Button
                            variant='warning'
                            className="w-100 text-uppercase mt-2 mb-2"
                            onClick={
                                () => agregarFavoritos({
                                    idDrink: receta.idDrink,
                                    strDrink: receta.strDrink,
                                    strDrinkThumb: receta.strDrinkThumb
                                })}
                        >Agregar a Favoritos</Button>
                    )}

                </Modal.Body>
            </Modal >
        )
    )
}

export default ModalBebida
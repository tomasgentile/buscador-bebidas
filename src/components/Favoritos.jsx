import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import Bebida from "./Bebida";

const Favoritos = () => {
    const { favoritos } = useBebidas();
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

    return (
        <>
            <Row align='end'>
                <Col md={{ span: 4, offset: 8 }}>
                    <Button
                        variant='warning'
                        onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
                    >
                        {mostrarFavoritos ? 'X' : 'Favoritos'}
                    </Button>
                </Col>
            </Row>
            {mostrarFavoritos && (
                <>
                    <h3>Tus bebidas favoritas</h3>
                    <Row className="mt-5">
                        {favoritos.map(favorito => (
                            <Bebida
                                key={favorito.id}
                                bebida={favorito}
                            />
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

export default Favoritos
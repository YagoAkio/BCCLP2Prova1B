import { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col, Image, Alert, Button, Form } from "react-bootstrap";

export default function DetalhesCandidato(props) {
    const [curtidas, setCurtidas] = useState(0);
    const [descurtidas, setDescurtidas] = useState(0);
    const [questionamentos, setQuestionamentos] = useState([]);
    const [pergunta, setPergunta] = useState("");
    const [perguntas, setPerguntas] = useState([]);

    useEffect(() => {
        const descutidasSalvas = localStorage.getItem(`descurtidas_${props.candidatoSelecionado.nome}`)
        const curtidasSalvas = localStorage.getItem(`curtidas_${props.candidatoSelecionado.nome}`);
        const questionamentosSalvos = localStorage.getItem(`perguntas_${props.candidatoSelecionado.nome}`);
        if (curtidasSalvas) {
            setCurtidas(parseInt(curtidasSalvas, 10));
        }
        if (questionamentosSalvos) {
            setQuestionamentos(JSON.parse(questionamentosSalvos));
        } if (descutidasSalvas) {
            setDescurtidas(parseInt(descutidasSalvas, 10));
        }
        const perguntasSalvas = localStorage.getItem(`perguntas_${props.candidatoSelecionado.nome}`);
        if (perguntasSalvas) {
            setPerguntas(JSON.parse(perguntasSalvas));
        }
    }, [props.candidatoSelecionado.nome]);

    const enviarPergunta = () => {
        if (pergunta.trim() === "") return;

        const novasPerguntas = [...perguntas, pergunta];
        setPerguntas(novasPerguntas);
        setPergunta(""); 

        localStorage.setItem(`perguntas_${props.candidatoSelecionado.nome}`, JSON.stringify(novasPerguntas));
    };

    return (
        <Container fluid="md">
            <h1>Detalhes do Candidato</h1>
            <Row class="d-flex flex-row">
                <Col  >
                    <Image variant="top" height="250" width="250" src={props.candidatoSelecionado.avatar} />
                </Col>
                <Col >
                <Alert key="info" variant="info">
                    <h3>Nome: {props.candidatoSelecionado.nome}</h3>
                    <hr />
                    <h5>E-mail: {props.candidatoSelecionado.email}</h5>
                    <h5>Curtidas: {curtidas}</h5>
                    <h5>Descurtidas: {descurtidas}</h5>
                    <h5>Questionamentos: {questionamentos.length}</h5>
                </Alert>
                    
                </Col>
            </Row>
            <br />
            <Alert key="success" variant="success"><h2>Propostas</h2></Alert>
            <ListGroup>
                {props.candidatoSelecionado.propostas.map((proposta, index) => (
                    <ListGroup.Item key={index}>
                        {proposta}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <br />
            <Alert key="success" variant="success"><h2>Fórum de Perguntas</h2> </Alert>


            <ListGroup>
                {perguntas.map((pergunta, index) => (
                    <ListGroup.Item key={index}>
                        {pergunta}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Form>

                <Form.Group className="mt-3" controlId="formPergunta">
                    <Form.Label> <h4>Envie sua pergunta</h4> </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua pergunta"
                        value={pergunta}
                        onChange={(e) => setPergunta(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button className="mt-2" variant="primary" onClick={enviarPergunta}>
                    Enviar Pergunta
                </Button>

            </Form>

            <br />
            <Button variant="danger" onClick={() => props.setDetalharCandidato(false)}>Voltar</Button>
            <br />
        </Container>
    );
}

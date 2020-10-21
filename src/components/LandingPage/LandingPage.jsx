import React from 'react';
import pokeball from '../../img/pokeball.png';
import { Form, Button, Card } from 'react-bootstrap';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';

function LandingPage(props) {
    const history = useHistory();
    let { username, password } = props.pokemonTrainer;

    const handleChange = e => {
        let { name, value } = e.target;
        props.setPokemonTrainer(prevstate => ({
            ...prevstate,
            [name]: value
        }))
    }


    const handleLogin = (username, password) => {
        const url = 'http://127.0.0.1:8000/token-auth/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                props.setToken(json.token);
                props.setPokemonTrainer(prevstate => ({
                    ...prevstate,
                    ...json
                }))
            })
            .catch(error => console.log(error))
        history.push('/encounter/')
    }



    return (
        <div className="pokemon">
            <header className="Landing-header">
                <img src={pokeball} className="Landing-logo" alt="pokeball" />
                <p>
                    Welcome to the world of Pokémon!!!
                </p>
                <div className="User-forms">
                    <Card style={{ width: '25rem', margin: '10px' }}>
                        <Card.Header className="formCard" style={{ fontSize: '30px', textAlign: 'center' }}>Login</Card.Header>
                        <Form className="formCard" onSubmit={() => handleLogin(username, password)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={username} onChange={handleChange} placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={password} onChange={handleChange} placeholder="Enter Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                             </Button>
                            <br />
                            <Card.Link style={{ color: 'rgb(255, 204, 1)' }} href="/signup/">Not a Trainer? Signup!!!!</Card.Link>
                        </Form>
                    </Card>
                </div>
                <h3>All Pokémon and Pokémon related content is property of Pokémon and Nintendo. We do not own any of it, and this is a fan made project. 
                    No Pokémon were harmed in the making of this game.

</h3>
            </header>
        </div>
    );
}



export default LandingPage;
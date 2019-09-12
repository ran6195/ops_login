import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import Axios from 'axios';
import $ from 'jquery'



export default class LoginForm extends React.Component {

    constructor( props ) {
        super( props )

        this.state  = {
            user: '' ,
            pass: '' ,
            login: false ,
            errore: 'Non sei ancora autenticato' ,
            token: ''
        }


        this.handlePassChange = this.handlePassChange.bind( this )
        this.handleUserChange = this.handleUserChange.bind( this )
        this.handleSubmit     = this.handleSubmit.bind( this )
        this.handleBlur       = this.handleBlur.bind( this )

    }

    handleBlur( event ) {
        event.target.reportValidity()
    }

    handleUserChange( event ) {
        this.setState({ user: event.target.value } , () => {
            payload = this.state
        })
    }

    handlePassChange( event ) {
        this.setState({ pass: event.target.value } , () => {
            payload = this.state
        })
    }

    handleSubmit( event ) {
        event.preventDefault()

        if( ! $( '#formLogin' )[ 0 ].checkValidity() ) {
            $( 'input:visible[ required="required" ]' ).each(( e , i) => {
                if( ! i.validity.valid ) {
                    i.reportValidity()
                    i.focus()
                    return false
                }
            })
        } else {
            Axios({
                method: 'post' ,
                url: 'http://www.opsboard.cloud/apilaravel/public/login' ,
                data: payload
            }).then( response => {

                const errore = response.data.errore
                console.log( errore )
                if( errore !== undefined ) {
                    this.setState({
                        errore : errore ,
                        login: false 
                    })
                } else {
                    this.setState({
                        login: true ,
                        token: response.data.token
                    })
                }
            }).catch( err => console.log( err ))

        }
    }




    render() {

        let stato;
        if( this.state.login ) {
            stato =  ( 
                <div>
                    <div className="mb-3">Il login è andato a buon fine</div> 
                    <div className="mb-3">token: { this.state.token }</div> 
                </div>
                
            )
        } else {
            stato =  ( 
                <div>
                    <div className="mb-3">{ this.state.errore }</div>
                </div>
            )
        }
           

        return (
            <form className="form-signin" id="formLogin">
                <img className="mb-4" src="https://azimuth.opsboard.cloud/assets/images/logo_board_login.png" alt="" width="100%" />
                <h1 className="h3 mb-3 font-weight-normal">Accedi</h1>
                <label htmlFor="inputEmail" className="sr-only">Indirizzo email</label>
                <input 
                    onChange={ this.handleUserChange }
                    onBlur={ this.handleBlur }
                    type="email" 
                    id="inputEmail" 
                    className="form-control" 
                    placeholder="Indirizzo email" 
                    required 
                    autoFocus 
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input 
                    onChange={ this.handlePassChange }
                    onBlur={ this.handleBlur }
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Password" 
                    required 
                />
                { stato }
                <button className="btn btn-lg btn-primary btn-block" onClick={ this.handleSubmit }>Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>
        )
    }


}

let payload = {}
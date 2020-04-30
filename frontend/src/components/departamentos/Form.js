import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addDepartamento }  from '../../actions/departamentosActions'

export class Form extends Component {

    state ={
        clave:'',
        nombre:'',
        encargado:''
    }

    static propTypes = {
        addDepartamento: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]:e.target.value});

    onSubmit = e => {
        e.preventDefault();

        this.props.addDepartamento(this.state);

        this.setState({
            clave:'',
            nombre:'',
            encargado:''
        })
    }

    render() {
        const {clave,nombre, encargado} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h3>Agregar Departamento</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Clave</label>
                        <input
                            className="form-control"
                            type="text"
                            name="clave"
                            onChange={this.onChange}
                            value={clave}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            onChange={this.onChange}
                            value={nombre}
                        />
                    </div>

                    <div className="form-group">
                        <label>Encargado</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="encargado"
                            onChange={this.onChange}
                            value={encargado}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
                
                
            </div>
        )
    }
}

export default connect(null,{addDepartamento})(Form)

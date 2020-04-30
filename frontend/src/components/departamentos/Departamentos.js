import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDepartamentos, deleteDepartamento } from '../../actions/departamentosActions'

export class Departamentos extends Component {
    static propTypes = {
        deptos: PropTypes.array.isRequired    
    }

    componentDidMount(){
        this.props.getDepartamentos();
    }

    render() {
        return (
            <Fragment>
                <h3>Departamentos</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Encargado</th>
                            <th></th>
                        </tr>
                        </thead>    
                        <tbody>
                            { this.props.deptos.map (depto => (
                                <tr key={depto.id}>
                                    <td>{depto.id}</td>
                                    <td>{depto.clave}</td>
                                    <td>{depto.nombre}</td>
                                    <td>{depto.encargado}</td>
                                    <td>
                                        <button 
                                            onClick={this.props.deleteDepartamento.bind(this, depto.id)}
                                            className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    
                </table>
            </Fragment>
        )
    }
}

const mapState = state => ({
    deptos: state.departamentos.lista
})

export default connect(mapState, { getDepartamentos, deleteDepartamento })(Departamentos)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getGrupos, addGrupo, deleteGrupo } from '../../actions/gruposActions'

class Grupos extends Component {

    static propTypes = {
        grupos: PropTypes.array.isRequired
    }

    state = {
        clave:'',
        nombre:''
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})     

    onSubmit = e => {
        e.preventDefault();
        
        this.props.addGrupo(this.state);
        this.setState({clave:'', nombre:''});
    }

    componentDidMount(){
        this.props.getGrupos();
    }

    render() {

        const {clave, nombre} = this.state;
        return (
            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h4>Agregar Grupos</h4>
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
                                <button type="submit" className="btn btn-info">
                                    Guardar
                                </button>
                        </div>
                    </form>
                </div>     

                <h2>Grupos de productos</h2>    
                 
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.props.grupos.map (item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.clave}</td>
                                    <td>{item.nombre}</td>
                                    <td>
                                        <button 
                                            onClick={this.props.deleteGrupo.bind(this,item.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                    

                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </Fragment>
        )
    }
}


const mapState = state => ({
    grupos: state.grupos.lista
})

const mapDispatchs = {
    getGrupos,
    addGrupo, 
    deleteGrupo
}

export default connect (mapState, mapDispatchs)(Grupos)

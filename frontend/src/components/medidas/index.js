import React, { Component, Fragment } from 'react'
import { connect }  from 'react-redux'
import { PropTypes } from 'prop-types'
import {getMedidas, addMedida, deleteMedida } from '../../actions/medidasActions'


class Medidas extends Component {

    static propTypes = {
        medidas: PropTypes.array.isRequired,
        addMedida:PropTypes.func.isRequired,
        deleteMedida:PropTypes.func.isRequired,
    }

    state = {
        clave:'',
        nombre:'',
    }

    onChange = e => this.setState({[e.target.name]: e.target.value}) 

    onSubmit = e => {
        e.preventDefault();
        const { clave,nombre } = this.state ;
        const medida = { clave,nombre};
        
        this.props.addMedida(medida);
        this.setState({
            clave:'', 
            nombre:''
        }); 

    }

    componentDidMount(){
        this.props.getMedidas();
    }

    render() {

        const { clave, nombre } = this.state;

        return (
            <Fragment>


                <div className="card card-body mt-4 mb-4">
                    <h3><i class="fa fa-angle-double-right"></i> Unidad de Medida </h3>
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
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </div>

                    </form> 
                </div>


                <h2>Medidas   </h2>
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
                            { this.props.medidas.map (item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.clave}</td>
                                    <td>{item.nombre}</td>                                    
                                    <td>
                                        <button 
                                            onClick={this.props.deleteMedida.bind(this, item.id)}
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
    medidas : state.medidas.lista
})

export default connect (mapState, {getMedidas, addMedida,deleteMedida})(Medidas);

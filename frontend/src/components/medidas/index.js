import React, { Component, Fragment } from 'react'
import { connect }  from 'react-redux'
import { PropTypes } from 'prop-types'
import {getMedidas, addMedida, editMedida, deleteMedida } from '../../actions/medidasActions'


class Medidas extends Component {

    static propTypes = {
        medidas: PropTypes.array.isRequired,
        addMedida:PropTypes.func.isRequired,
        editMedida:PropTypes.func.isRequired,
        deleteMedida:PropTypes.func.isRequired,
    }

    state = {
        id:'',
        clave:'',
        nombre:'',
        mode: 'list'
    }

    onChange = e => this.setState({[e.target.name]: e.target.value}) 

    onSubmit = e => {
        e.preventDefault();

        const {id, clave,nombre } = this.state ;

        const medida = { clave,nombre};

        if (this.state.mode == 'new')          
            this.props.addMedida(medida);
         
        if (this.state.mode == 'edit') 
            this.props.editMedida (medida,id)
         
        
        this.setState({
            clave:'', 
            nombre:'',
            mode:'list'
        }); 

    }

    cancelar = () =>  {
        this.setState ({
            id: '',
            clave: '',
            nombre: '', 
            mode: 'list'
        })
    }

    add = () => { this.setState ({mode: 'new'})

    }     
    editItem = item => {
        this.setState ({
            id: item.id,
            clave: item.clave,
            nombre: item.nombre, 
            mode: 'edit'
        })
    }


    componentDidMount(){
        this.props.getMedidas();
    }

    render() {

        const { clave, nombre } = this.state;

        return (
            <Fragment>
                {

                    this.state.mode == 'list' 
                    ?
                        <Fragment>
                        <h2> Medidas   </h2>
                        <button 
                            onClick={this.add.bind(this)}
                            className="btn btn-default btn-sm">
                            <span className="fa fa-plus-square fa-lg" aria-hidden="true"></span>
                        </button>
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
                                                    onClick={this.editItem.bind(this,item)}
                                                    className="btn btn-default btn-sm">
                                                    <span className="fa fa-edit fa-lg" aria-hidden="true"></span>
                                                </button>
                                                <button 
                                                    onClick={this.props.deleteMedida.bind(this, item.id)}
                                                    className="btn btn-default btn-sm">
                                                    <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>                    
                        </table>
                        </Fragment>
                       
                    : 
                        <div className="card card-body mt-4 mb-4">
                        <h3><i class="fa fa-angle-double-right"></i> Unidad de Medida </h3>
                        <form>      
                        
                                
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
                                <button 
                                     onClick={this.onSubmit.bind(this)}
                                     className="btn btn-primary">
                                    Guardar
                                </button>
                                <button 
                                    onClick={this.cancelar.bind(this)}
                                    className="btn btn-default">
                                    Cancelar
                                </button>
                                
                            </div>

                        </form> 
                        </div>  
                }
                                  
            </Fragment>
        )
    }
}

const mapState = state => ({
    medidas : state.medidas.lista
})

export default connect (mapState, {getMedidas, addMedida, editMedida, deleteMedida})(Medidas);

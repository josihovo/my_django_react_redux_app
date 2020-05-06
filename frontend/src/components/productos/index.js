import React, { Component, Fragment } from 'react'
import { connect }  from 'react-redux'
import { PropTypes } from 'prop-types'
import {getProductos,addProducto,editProducto,deleteProducto } from '../../actions/productosActions'
import { getGrupos } from '../../actions/gruposActions'
import { createMessage} from '../../actions/messages'


class Productos extends Component {

    static propTypes = {
        grupos: PropTypes.array.isRequired, 
        productos: PropTypes.array.isRequired,
        addProducto:PropTypes.func.isRequired,
        editProducto:PropTypes.func.isRequired,
        deleteProducto:PropTypes.func.isRequired,
    }


    state = {
        id:'',
        grupo:'',
        clave:'',
        nombre:'',
        mode: 'list'
    }

    onChange = e => this.setState({[e.target.name]: e.target.value}) 

    onSubmit = e => {
        e.preventDefault();

        const {id, grupo, clave,nombre } = this.state;
        const producto = { grupo,clave,nombre};
        const { createMessage,addProducto,editProducto } = this.props; 

        if (grupo == null || grupo == '' ){
            createMessage({msg:'No ha indicado el grupo del producto'})
            return;
        }

        if (clave == null || nombre == null || clave == '' || nombre == '' ){
            createMessage({msg:'No ha capturado la clave y el nombre producto'})
            return;
       }

        if (this.state.mode == 'new')          
            addProducto(producto);
         
        if (this.state.mode == 'edit') 
           editProducto(producto,id);
         
        
        this.setState({
            grupo:'',
            clave:'', 
            nombre:'',
            mode:'list'
        }); 

    }

    cancelar = () =>  {
        this.setState ({
            id: '',
            grupo:'',
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
            grupo: item.grupo.id,
            clave: item.clave,
            nombre: item.nombre, 
            mode: 'edit'
        })
    }

    


    componentDidMount(){        
        this.props.getGrupos();
        this.props.getProductos();        
    }

    render() {

        const { grupo, clave, nombre } = this.state;
        const { grupos } = this.props;

        return (
            <Fragment>
                {

                    this.state.mode == 'list' 
                    ?
                        <Fragment>
                        <h2> Productos   </h2>
                        <button 
                            onClick={this.add.bind(this)}
                            className="btn btn-default btn-sm">
                            <span className="fa fa-plus-square fa-lg" aria-hidden="true"></span>
                        </button>
                        <table className="table table-striped">
                            <thead>
                                <tr>                                    
                                    <th>Clave</th>
                                    <th>Nombre</th>                            
                                    <th>Grupo</th>
                                    <th></th>
                                </tr>
                                </thead>    
                                <tbody>
                                    { this.props.productos.map (item => (
                                        <tr key={item.id}>                                            
                                            <td>{item.clave}</td>
                                            <td>{item.nombre}</td>                                    
                                            <td>{item.grupo.clave} {item.grupo.nombre}</td>
                                            <td>
                                                <button 
                                                    onClick={this.editItem.bind(this,item)}
                                                    className="btn btn-default btn-sm">
                                                    <span className="fa fa-edit fa-lg" aria-hidden="true"></span>
                                                </button>
                                                <button 
                                                    onClick={this.props.deleteProducto.bind(this, item.id)}
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
                        <h3><i className="fa fa-angle-double-right"></i> Productos </h3>
                        <form>      
                            <div className="form-group">
                                <label>Grupo</label>
                                <select 
                                    className="form-control"
                                    onChange={this.onChange} 
                                    name="grupo"
                                    value={grupo}>
                                    <option value="null">Seleccine un grupo</option>                                
                                    {grupos.map(x => (
                                    <option key={x.id} value={x.id}>
                                       {x.clave} {x.nombre}
                                    </option>
                                ))}
                                </select>
                            </div>
                        
                                
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
    grupos : state.grupos.lista,
    productos : state.productos.lista
})

const mapDispatchs = {
    getGrupos, 
    getProductos,
    addProducto,
    editProducto,
    deleteProducto,
    createMessage,    
}

export default connect (mapState, mapDispatchs)(Productos);

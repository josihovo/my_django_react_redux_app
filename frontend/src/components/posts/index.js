import React, { Component, Fragment } from 'react'
import { connect }  from 'react-redux'
import { PropTypes } from 'prop-types'
import {getPosts, addPost, editPost, deletePost, orderPost } from '../../actions/postActions'
import '../css/carsales.css'

class Posts extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        addPost:PropTypes.func.isRequired,
        editPost:PropTypes.func.isRequired,
        deletePost:PropTypes.func.isRequired,
    }

    state = {
        id:'',
        marca:'',
        linea:'',
        modelo:'',
        precio:'',
        telefono:'',
        comentarios:'',
        ciudad:'',
        imageA:'',
        imageB:'',
        imageC:'',
        mode: 'list',
        filtro:'',
        showA: true,
        showB: false,
        showC: false,
        img:'A',
        idInterval:''         
    }

    onChange = e => this.setState({[e.target.name]: e.target.value}) 

    handleImageChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.files[0]
        })
      };

    orderByPrecio = (factor) =>   {
        let newarray = this.props.posts.sort((a,b) => (a.precio > b.precio) ? 1 * factor :( b.precio > a.precio ? -1 * factor : 0));
         
        this.props.orderPost ([])
        this.props.orderPost (newarray)
    } 
 
  
    orderByPublicacion = (factor) => {
        let newarray = this.props.posts.sort((a,b) => (a.created_at > b.created_at) ? 1 * factor :( b.created_at > a.created_at ? -1 * factor : 0));
        this.props.orderPost ([])
        this.props.orderPost (newarray)
    }

     
   

    onSubmit = e => {
        e.preventDefault();

        const {marca,linea,modelo,precio,telefono,comentarios,ciudad, imageA, imageB,imageC } = this.state;
        
        
        let form_data = new FormData();
        form_data.append('marca', marca);
        form_data.append('linea', linea);
        form_data.append('modelo', modelo);
        form_data.append('precio', precio);
        form_data.append('telefono', telefono);
        form_data.append('comentarios', comentarios);
        form_data.append('ciudad', ciudad);
        form_data.append('imageA', imageA, imageA.name);
        form_data.append('imageB', imageB, imageB.name);
        form_data.append('imageC', imageC, imageC.name);

        if (this.state.mode == 'new')          
            this.props.addPost(form_data);
         
        if (this.state.mode == 'edit') 
            this.props.editPost (form_data,id)
         
        
        this.setState({
            marca:'', 
            linea:'',
            modelo:'',
            precio:'',
            telefono:'',
            comentarios:'',
            ciudad:'',
            imageA:'',
            imageB:'',
            imageC:'',
            mode:'list'
        }); 

    }

    

    cancelar = () =>  {
        this.setState ({
            id: '',
            marca:'', 
            linea:'',
            modelo:'',
            precio:'',
            telefono:'',
            comentarios:'',
            ciudad:'',
            imageA:'',
            imageB:'',
            imageC:'',
            mode: 'list'
        })
    }

    add = () => { this.setState ({mode: 'new'})

    }     
    editItem = item => {
        this.setState ({
            id: item.id,
            marca: item.marca,
            linea: item.linea, 
            modelo: item.modelo, 
            precio: item.precio, 
            telefono: item.telefono, 
            comentarios: item.comentarios, 
            ciudad: item.ciudad,
            imageA :item.imageA,
            imageB :item.imageB,
            imageC :item.imageC,
            mode: 'edit'
        })
    }


    componentDidMount(){
        this.props.getPosts();    
        var id = setInterval(this.cambiarimagen, 3000);
        this.setState( { idInterval : id  })    
    }

    componentWillMount() {
        clearInterval(this.state.idInterval)
    }

    cambiarimagen = () => {
              
        switch (this.state.img){
            case 'A':
                this.setState({showA:false, showB:true, showC:false, img:'B'});
                break;
            case 'B':
                this.setState({showA:false, showB:false, showC:true, img:'C'});
                break;
            case 'C':
                this.setState({showA:true, showB:false, showC:false, img:'A'});
                break;
            default:
                console.log ('nothing');
        }
    }

    render() {

        const { marca, linea,modelo,precio,telefono,comentarios, ciudad, filtro } = this.state;

        return (
            <Fragment>
                {

                    this.state.mode == 'list' 
                    ?
                        <Fragment>
                        <h2> Car-Sales .:: The King ::. </h2>

                                            
                        <div className="container mt-3 mb-3"  >
                             <div className="row row-cols-8">
                                <div className="col">
                                    order by
                                </div>
                                <div className="col">
                                    <button 
                                        onClick={this.orderByPrecio.bind(this,1)}
                                        className="btn btn-default btn-sm">
                                        Precio     
                                        <span className="fa fa-angle-double-up fa-lg" aria-hidden="true"></span>
                                         
                                    </button>
                                </div>

                                <div className="col">                        
                                    <button 
                                        onClick={this.orderByPrecio.bind(this,-1)}
                                        className="btn btn-default btn-sm">
                                        Precio Desc
                                        <span className="fa fa-angle-double-down fa-lg" aria-hidden="true"></span> 
                                    </button>                                    
                                </div>
                                <div className="col">
                                    <button 
                                        onClick={this.orderByPublicacion.bind(this,1)}
                                        className="btn btn-default btn-sm">
                                        Fecha
                                        <span className="fa fa-angle-double-up fa-lg" aria-hidden="true"></span>
                                    </button>
                                     
                                </div>
                                <div className="col">
                                    <button 
                                        onClick={this.orderByPublicacion.bind(this,-1)}
                                        className="btn btn-default btn-sm">
                                            Fecha Desc
                                        <span className="fa fa-angle-double-down fa-lg" aria-hidden="true"></span>
                                    </button>
                                      
                                </div>


                                <div className="col">
                                    <input 
                                        type="text" 
                                        placeholder='filtrar: marca, linea o ciudad' 
                                        name='filtro' 
                                        value={filtro} 
                                        onChange={this.onChange} 
                                        />
                                </div>
                                <div className="col">
                                    &nbsp;
                                </div>

                                <div className="col">
                                    <button 
                                        onClick={this.add.bind(this)}
                                        className="btn btn-success btn-sm ">Agregar Publicación 
                                                                               
                                    </button>
                                </div>

                               
                            </div>
                        </div>


                        <div className="container">
                            <div className="row row-cols-3">
                                
                                { this.props.posts.filter(x => x.marca.includes(filtro)
                                                            || x.linea.includes(filtro)
                                                            || x.ciudad.includes(filtro)
                                                        ).map (item => (

                                    <div className="col" key={item.id}>
                                        <div className="cardx">
                                            { this.state.showA &&  <img src={item.imageA}  alt="cars" width="300" height="200"/> }
                                            { this.state.showB &&  <img src={item.imageB} alt="cars" width="300" height="200"/> }
                                            { this.state.showC &&  <img src={item.imageC} alt="cars" width="300" height="200"/> }
                                            
                                            <h2>{item.marca} - {item.linea} ({item.modelo})</h2>
                                            <p className="price">   { Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(item.precio)   }</p>
                                            <p>
                                                Comentarios :  {item.comentarios}<br/> 
                                                Publicado :  {(new Date(item.created_at)).toLocaleDateString('en-GB')}
                                                                
                                            </p>
                                            <p><button>
                                                <span className="fa fa-phone fa-lg" aria-hidden="true">  {item.telefono}</span> 
                                                <br />   
                                                <span className="fa fa-location-arrow fa-lg" aria-hidden="true"> {item.ciudad}</span>
                                             </button></p>
                                        </div>
                                    </div>                                                                                                
                                ))}                    
                            </div>
                        </div>

               
                        </Fragment>
                       
                    : 
                        <div className="card card-body mt-4 mb-4">
                        <h3><i className="fa fa-angle-double-right"></i> Post </h3>


                        <form>
                            <p>
                                <input 
                                    type="text" 
                                    placeholder='Marca' 
                                    name='marca' 
                                    value={marca} 
                                    onChange={this.onChange} 
                                    required/>

                            </p>
                            <p>
                                <input 
                                    type="text" 
                                    placeholder='Línea' 
                                    name='linea' 
                                    value={linea} 
                                    onChange={this.onChange} 
                                    required/>
                            </p>
                            <p>
                                <input 
                                    type="number" 
                                    placeholder='Modelo' 
                                    name='modelo' 
                                    value={modelo} 
                                    onChange={this.onChange} 
                                    required/>
                            </p>
                            <p>
                                <input 
                                    type="number" 
                                    placeholder='Precio' 
                                    name='precio' 
                                    value={precio} 
                                    onChange={this.onChange} 
                                    required/>
                            </p>
                            <p>
                                <input 
                                    type="text" 
                                    placeholder='Teléfono' 
                                    name='telefono' 
                                    value={telefono} 
                                    onChange={this.onChange} 
                                    required/>
                            </p>

                            <p>
                                <input 
                                    type="text" 
                                    placeholder='Comentarios' 
                                    name='comentarios' 
                                    value={comentarios} 
                                    onChange={this.onChange} 
                                    required/>

                            </p>
                            <p>
                                <input 
                                    type="text" 
                                    placeholder='Ciudad' 
                                    name='ciudad' 
                                    value={ciudad} 
                                    onChange={this.onChange} 
                                    required/>

                            </p>
                            <p>
                                <input 
                                    type="file"
                                    name="imageA"
                                    accept="image/png, image/jpeg"  
                                    onChange={this.handleImageChange}                                    
                                    required/>
                            </p>

                            <p>
                                <input 
                                    type="file"
                                    name="imageB"
                                    accept="image/png, image/jpeg"  
                                    onChange={this.handleImageChange} 
                                    required/>
                            </p>

                            <p>
                                <input 
                                    type="file"
                                    name="imageC"
                                    accept="image/png, image/jpeg"  
                                    onChange={this.handleImageChange} 
                                    required/>
                            </p>
                            
                            
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
    posts : state.posts.lista
})

export default connect (mapState, {getPosts,addPost,editPost,deletePost, orderPost})(Posts);

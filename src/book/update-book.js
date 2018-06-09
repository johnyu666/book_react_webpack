import React from 'react';
import 'bootstrap'
export default class UpdateBook extends React.Component{
    constructor(props){
        super(props);
        this.state={book:{bname:'',price:''}};
        this.updateBook=this.updateBook.bind(this);
    }
   render(){
       return (
           <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

                   <div class="modal-dialog" role="document">
                       <div class="modal-content">
                           <div class="modal-header">
                               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                           </div>
                           <div class="modal-body">
                               <form action="#" ref={form=>this.updateForm=form} onSubmit={this.updateBook}>
                                   <input type="text" name="bname" value={this.state.book.bname} onChange={(e)=>this.onChangeHandle(e)}/>
                                   <input type="text" name="price" value={this.state.book.price} onChange={(e)=>this.onChangeHandle(e)}/>
                                   <button type="submit"  class="btn btn-primary">Save changes</button>
                               </form>
                           </div>
                           <div class="modal-footer">
                               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                           </div>
                       </div>
                   </div>
               </div>
       );
   }
    onChangeHandle(e){
        this.state.book[e.target.name]=e.target.value;
        this.setState({book:this.state.book});

    }
   updateBook(e){
        e.preventDefault();
       this.props.callback(this.state.book);
   }

}
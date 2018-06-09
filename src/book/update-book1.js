import React from 'react';

export default class UpdateBook extends React.Component{
    constructor(props){
        super(props);
        this.state={book:{bname:'',price:''}};
        this.updateBook=this.updateBook.bind(this);
    }
   render(){
       return (
           <div id="updateBookPan">
               <form action="#" ref={form=>this.updateForm=form} onSubmit={this.updateBook}>
                   <input type="text" name="bname" value={this.state.book.bname} onChange={(e)=>this.onChangeHandle(e)}/>
                   <input type="text" name="price" value={this.state.book.price} onChange={(e)=>this.onChangeHandle(e)}/>
                   <input type="submit"/>
               </form>
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
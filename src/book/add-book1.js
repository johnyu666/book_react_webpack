import React from 'react';
import $ from 'jquery';
export default class AddBook extends React.Component{
    render(){
        return (
            <div id="addBookPan">
                <form action="#" ref={form=>this.addForm=form} onSubmit={(e)=>this.addBook(e)}>
                    <input type="text" />
                    <input type="text"/>
                    <input type="submit"/>
                </form>
            </div>



        );
    }
    addBook(e){
        e.preventDefault();
        let bname=$(this.addForm).children().first().val();
        let price=$(this.addForm).children().eq(1).val();
        let book={bname:bname,price:price};
        this.props.callback(e,book);
    }
}
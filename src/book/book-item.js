import React from 'react';

export default class BookItem extends React.Component{

    render(){
        let book=this.props.book;
        return (
            <tr key={book.id} onDoubleClick={()=>{this.selectBookToUpdate()}}>
                <td>{book.id}</td>
                <td>{book.bname}</td>
                <td>{book.price}</td>
                <td><button onClick={()=>this.deleteBook()}>删除</button></td>
            </tr>
        );
    }

    selectBookToUpdate(){
        this.props.selectCallback(this.props.book);
    }
    deleteBook(){
        this.props.deleteCallback(this.props.book);
    }
}
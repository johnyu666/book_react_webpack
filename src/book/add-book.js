import React from 'react';
import $ from 'jquery';
export default class AddBook extends React.Component{
    render(){
        return (
            <form class="form-inline" action="#" ref={form=>this.addForm=form} onSubmit={(e)=>this.addBook(e)}>
            <div class="form-group">
            <label for="exampleInputName2">User Name</label>
            <input type="text" class="form-control" id="exampleInputName2" placeholder="Please Input User name"/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail2">User Age</label>
            <input type="number" class="form-control" id="exampleInputEmail2" placeholder="请输入用户年龄"/>
            </div>
            <button type="submit" class="btn btn-info">Submit You Info</button>
    </form>

        );
    }
    addBook(e){
        e.preventDefault();
        let bname=$("input:first",this.addForm).val();
        let price=$("input:nth(1)",this.addForm).val();
        let book={bname:bname,price:price};
        this.props.callback(e,book);
    }
}
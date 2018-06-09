import React from 'react';
import ReactDom from 'react-dom';
import AddBook from './book/add-book';
import BookItem from './book/book-item';
import UpdateBook from './book/update-book';
// import "expose-loader?$!jquery";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class App extends React.Component{
    constructor(props){
        super(props);

        this.current={bname:'',price:''};
        this.state={books:[]};
        this.addBook=this.addBook.bind(this);
        this.updateBook=this.updateBook.bind(this);
        this.selectBookToUpdate=this.selectBookToUpdate.bind(this);
        this.deleteBook=this.deleteBook.bind(this);
    }
    componentDidMount(){
        let opt={url:this.props.url,method:"GET"};
        $.ajax(opt)
            .done((books)=>{
                this.setState({books:books});
            })
    }
    render(){
        return (
            <div>
                <AddBook callback={this.addBook}/>
                <div id="bookList">
                    <table className="table table-striped">
                        <thead>
                        <tr className="info">
                            <th>用户ID</th>
                            <th>用户名字</th>
                            <th>用户年龄</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map((book)=>{
                            return <BookItem key={book.id} book={book} selectCallback={this.selectBookToUpdate}
                            deleteCallback={this.deleteBook} />
                        })}
                        </tbody>
                    </table>
                </div>
                <div ref={(me)=>this.df=me}>
                    <UpdateBook ref={(me)=>this.upref=me} callback={this.updateBook}/>
                </div>
            </div>
        );
    }



    deleteBook(book){
        let opt={url:this.props.url+"/"+book.id,method:"DELETE"};
        $.ajax(opt)
            .done((o)=>{
                let index=this.state.books.indexOf(book);
                this.state.books.splice(index,1);
                this.setState({books:this.state.books});
            })
    }
    addBook(e,book){
        let opt={url:this.props.url,method:"POST"};
        opt.contentType="application/json";
        opt.data=JSON.stringify(book);
        $.ajax(opt)
            .done((book)=>{
                this.state.books.push(book);
                this.setState({books:this.state.books});
            })

    }

    selectBookToUpdate(book){
        console.log($(this.df));
        $("#myModal",$(this.df)).modal();
        this.current=book;
        this.upref.setState({book:Object.assign({},book)});
        // this.state.current=Object.assign({},book);
        // this.setState({current:this.state.current});
    }

    updateBook(book){
        let opt={url:this.props.url+"/"+this.current.id,method:"PUT"};
        opt.contentType="application/json";
        opt.data=JSON.stringify(book);
        $.ajax(opt)
            .done((bk)=>{
                let index=this.state.books.indexOf(this.current);
                this.state.books.splice(index,1,bk);
                this.setState({books:this.state.books});
                this.current=bk;
                $("#myModal",$(this.df)).modal('hide')
            })

    }

}

ReactDom.render(<App url="http://localhost:3000/books"/>, document.getElementById("root"));
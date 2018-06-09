import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class App extends React.Component{
    constructor(props){
        super(props);
        this.books=[];
        this.state={books:this.books,current:{bname:'',price:''}};
        this.addBook=this.addBook.bind(this);
        this.updateBook=this.updateBook.bind(this);
    }
    componentDidMount(){
        let opt={url:this.props.url,method:"GET"};
        $.ajax(opt)
            .done((books)=>{
                this.books=books;
                this.setState({books:this.books});
            })
    }
    render(){
        return (
            <div>
                <div id="addBookPan">
                    <form action="#" ref={form=>this.addForm=form} onSubmit={this.addBook}>
                        <input type="text" />
                        <input type="text"/>
                        <input type="submit"/>
                    </form>
                </div>
                <div id="bookList">
                    <table>
                        <thead></thead>
                        <tbody>
                        {this.books.map((book)=>{
                            return (<tr key={book.id} onDoubleClick={()=>{this.selectBookToUpdate(book)}}>
                                <td>{book.id}</td>
                                <td>{book.bname}</td>
                                <td>{book.price}</td>
                                <td><button onClick={()=>this.deleteBook(book)}>删除</button></td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
                <div id="updateBookPan">
                    <form action="#" ref={form=>this.updateForm=form} onSubmit={this.updateBook}>
                        <input type="text" name="bname" value={this.state.current.bname} onChange={(e)=>this.onChangeHandle(e)}/>
                        <input type="text" name="price" value={this.state.current.price} onChange={(e)=>this.onChangeHandle(e)}/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }

    onChangeHandle(e){
        this.state.current[e.target.name]=e.target.value;
        this.setState({current:this.state.current});
    }

    deleteBook(book){
        let opt={url:this.props.url+"/"+book.id,method:"DELETE"};
        $.ajax(opt)
            .done((o)=>{
                let index=this.books.indexOf(book);
                this.books.splice(index,1);

                this.setState({books:this.books});
            })
    }
    addBook(e){
        e.preventDefault();
       let bname=$(this.addForm).children().first().val();
        let price=$(this.addForm).children().eq(1).val();

        let opt={url:this.props.url,method:"POST"};
        opt.contentType="application/json";
        opt.data=JSON.stringify({bname:bname,price:price});
        $.ajax(opt)
            .done((book)=>{
                this.books.push(book);
                this.setState({books:this.books});
            })

    }

    selectBookToUpdate(book){
        this.current=book;
        this.state.current=Object.assign({},book);
        this.setState({current:this.state.current});
    }

    updateBook(e){
        e.preventDefault();
        let opt={url:this.props.url+"/"+this.current.id,method:"PUT"};
        opt.contentType="application/json";
        opt.data=JSON.stringify(this.state.current);
        $.ajax(opt)
            .done((book)=>{
                let index=this.books.indexOf(this.current);
                this.books.splice(index,1,book);
                this.setState({books:this.books});
            })

    }

}

ReactDom.render(<App url="http://localhost:3000/books"/>, document.getElementById("root"));
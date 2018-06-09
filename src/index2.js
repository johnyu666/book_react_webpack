import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{
    render(){
        return (<div><div><Clock/></div><div><Clock format="iso"/></div></div>);
    }
}
class  Clock extends React.Component{
    constructor(props){
       super(props);
       this.state={date:new Date()};
    }
    render(){
        return (
            <div>
            <h3>当前的时间为：
        {this.props.format=="iso"?this.state.date.toISOString():this.state.date.toLocaleString()}
        </h3>
                <button onClick={()=>clearInterval(this.pd)}>stop</button>
                <button onClick={()=>this.work()}>start</button>
            </div>
        )
    }

    work(){

        this.pd=setInterval(()=>{this.setState({date:new Date()})}
            ,1000);
    }
    componentDidMount(){
        this.work();
    }
    componentWillUnmount(){
        clearInterval(pd);
    }
}

class Book extends React.Component{
    constructor(props){
        super(props);
        this.state={bname:'john',price:23.45,major:'se',sex:true};
    }
    render(){
        return (
            <div>
                <span>{this.state.bname}</span>,
                <span>{this.state.price}</span>,
                <span>{this.state.major}</span>,
                <span>{this.state.sex?"男":"女"}</span>
                <br/>
                <input type="text" name="bname" defaultValue={this.state.bname}/>
                {/*<input type="text" name="bname" value={this.state.bname} onChange={(event)=>this.onChangeHandle(event)}/>*/}
                <input type="text" name="price" value={this.state.price} onChange={(event)=>this.onChangeHandle(event)}/>
                <select name="major" value={this.state.major} onChange={(e)=>this.onChangeHandle(e)}>
                    <option value="cs">计算机科学</option>
                    <option value="se">软件工程</option>
                </select>

                <input type="radio" defaultChecked  name="sex" value="true"
                       onChange={(e)=>this.onChangeHandle1(e)}/>男
                <input type="radio"  name="sex" value="false"
                       onChange={(e)=>this.onChangeHandle1(e)}/>女

            </div>
        )
    }
    onChangeHandle(event){
        this.setState({[event.target.getAttribute("name")]:event.target.value});
    }

    onChangeHandle1(event){
        this.setState({sex:event.target.value==="true"});
    }
}

class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={toggle:false};
    }
    render(){
       return (<div>
            <button onClick={()=>this.handleClick()}>{this.state.toggle? "ON":"OFF"} </button>
        </div>);
    }
    handleClick(){
        this.setState(prev=>({toggle:!prev.toggle}));
    }

}

class User{
    constructor(uname,age,id){
        this.uname=uname;
        this.age=age;
        this.id=id;
    }
}
class UserManager extends React.Component{
    constructor(props){
        super(props);
        this.user=new User('john',100,1);
        this.onSubmitHandle=this.onSubmitHandle.bind(this);
    }
    render(){
        return (
            <div>
                <form action="#" onSubmit={this.onSubmitHandle}>
                    <input name="uname" ref={(input)=>(this.unameInput=input)}/>
                    <input name="price" ref={(input)=>(this.ageInput=input)}/>
                    <input type="submit"/>
                </form>
            <table>
                <UserComp user={this.user} ref={me=>this.userComp=me}/>
            </table>
            </div>
        )
    }
    onSubmitHandle(event){
        event.preventDefault();
        let uname=this.unameInput.value;
        let age=this.ageInput.value;
        this.userComp.setState({user:{uname:uname,age:age}});

    }
}
class UserComp extends React.Component{
    constructor(props){
        super(props);
        this.state={user:this.props.user};

    }
    render(){
        return (<tr>
            <td>{this.state.user.id}</td>
            <td>{this.state.user.uname}</td>
            <td>{this.state.user.age}</td>
        </tr>);
    }
}

ReactDom.render(<Book/>, document.getElementById("root"));
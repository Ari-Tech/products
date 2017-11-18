import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class ProductRow extends React.Component{
    render (){
        let row='';
        if(this.props.trdatainterator.stocked){
            row=(<tr><td>{this.props.trdatainterator.name}</td><td>{this.props.trdatainterator.price}</td></tr>)
        }else{
            row=(<tr><td class='tdred'>{this.props.trdatainterator.name}</td><td>{this.props.trdatainterator.price}</td></tr>)
        }
       if(this.props.maxvalue){
           let cost=this.props.maxvalue*1;
           this.props.trdatainterator.price*1<=cost?row=row:row=null
       }
        if(this.props.statuscheck){
            if(!this.props.trdatainterator.stocked){
                row=null
            }
        }
        return (
            row
        )
    }
}
class ProductCategoryRow extends React.Component{
    render(){
        return(
        <tr><td colspan="2"><b>{this.props.catname}</b></td></tr>
        )
    }
}
class ProductTable  extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const rows=[]
        const productList=this.props.dataset;
        let categoryList='';
        let oldcategory=''; 
        productList.forEach((i)=>{
           // console.log(i.category +" "+i.name+" "+i.price);
            if(i.category!==oldcategory){
               rows.push(<ProductCategoryRow catname={i.category}/>)
               oldcategory=i.category
            }
            if(i.name.toUpperCase().indexOf(this.props.searchtext.toUpperCase())>=0){
                rows.push(<ProductRow statuscheck={this.props.statuscheck} maxvalue={this.props.maxvalue} trdatainterator={i}/>)
            }
        })
        return (
            <table border="1">
                <thead>
                <th>Name</th><th>Price ($)</th>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                </table> 
          

            
        )
    }
}
class SearchBar extends React.Component{

    constructor(props){
        super(props)
        this.handleTextChange=this.handleTextChange.bind(this)
        this.handleStatusChange=this.handleStatusChange.bind(this)
        this.handleMaxValueChange=this.handleMaxValueChange.bind(this)

    }
    handleTextChange(event){
        this.props.searchtextChange(event.target.value);
    }
    handleStatusChange(event){
       this.props.statusChange(event.target.checked)
    }
    handleMaxValueChange(event){
        this.props.maxvaluechange(event.target.value)
    }
    render(){
        return (
            <div>
            <input type="text" placeholder="Search Items" value={this.props.searchtext} onChange={this.handleTextChange}/><br/>
            <input type="checkbox" checked={this.props.statuscheck} onChange={this.handleStatusChange}/> Show in Stock<br/>
            <input type="number" placeholder="Max Price" value={this.props.maxvalue} onChange={this.handleMaxValueChange}/><br/>
            <button>Clear Filters</button><br/>
            </div>
        )
    }
}


class FilterableProductTable extends React.Component {
    constructor(props) {
       super(props)
       this.state={"searchtext":"", "statuscheck":false, "maxvalue":100}
       this.handleTextChange=this.handleTextChange.bind(this)
       this.handleStatusChange=this.handleStatusChange.bind(this)
       this.handleMaxValueChange=this.handleMaxValueChange.bind(this)
    }
    handleTextChange(val){
        this.setState(
            {
                "searchtext":val
            }
        )
    }
    handleStatusChange(val){
        this.setState(
            {
                "statuscheck":val
            }
        )
    }
    handleMaxValueChange(val){
        this.setState(
            {
                "maxvalue":val
            }
        )
    }
    render() {

        return (
            <div class="basetable" >
            <SearchBar searchtext={this.state.searchtext} searchtextChange={this.handleTextChange} statuscheck={this.state.statuscheck} statusChange={this.handleStatusChange} maxvalue={this.state.maxvalue} maxvaluechange={this.handleMaxValueChange}/>
            <ProductTable dataset={this.props.dataset} searchtext={this.state.searchtext} statuscheck={this.state.statuscheck} maxvalue={this.state.maxvalue} />
            </div>
        )
    }
}
const dataSet=[
    {category: "Sporting Goods", price: "49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "399.99", stocked: false, name: "iPhone 6Plus"},
    {category: "Electronics", price: "199.99", stocked: true, name: "Nexus 7"}
  ];
ReactDOM.render(
     <FilterableProductTable dataset={dataSet}/>,
    // <Abc searchText="this.state.searchtext"/>,
    document.getElementById('root')
);

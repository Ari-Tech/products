import React from 'react';
import ReactDOM from 'react-dom';

class TRset extends React.Component{
    render (){
        return (
            <tr><td>{this.props.trdatainterator.name}</td><td>{this.props.trdatainterator.price}</td></tr>
        )
    }
}
class ProductTable  extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.dataset)
        var trmap = this.props.dataset.map((key, value) => <TRset trdatainterator={key}/>);
        return (
            <table border="1">
                <thead>
                <th>Name</th><th>Price</th>
                </thead>
                <tbody>
                    {trmap}
                </tbody>
                </table>
          
            
        )
    }
}
class SearchBar extends React.Component{

    render(){
        return (
            <div>
            <input type="text" placeholder="search" value={this.props.searchtext}/><br/>
            <input type="checkbox" value={this.props.checkstate}/> Only Show Products in stock
            </div>
        )
    }
}
class FilterableProductTable extends React.Component {
    constructor(props) {
       super(props)
        this.state={"searchtext":"Ball", "checkstate":true}
    }
   
    render() {

        return (
            <div>
            <SearchBar searchtext={this.state.searchtext} checkstate={this.state.checkstate} />
            <ProductTable dataset={this.props.dataset}/>
            </div>
        )
    }
}
const dataSet=[
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "some shit 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
ReactDOM.render(
     <FilterableProductTable dataset={dataSet}/>,
    // <Abc searchText="this.state.searchtext"/>,
    document.getElementById('root')
);

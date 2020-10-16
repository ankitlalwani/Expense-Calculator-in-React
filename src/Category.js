import React,{Component} from "react";
import AppNav from './AppNav';
import { Container, Button, Input, Table} from "reactstrap";
import BgImage from "./BgImage";


class Category extends Component {

    constructor(props){
        super(props);
   
        this.state = {
            isLoading: true,
            Categories: [],
            category: {categoryType:''},
            categoryId: 0,
            errors: {}
        }
         this.addCategory = this.addCategory.bind(this);
         this.handleChange = this.handleChange.bind(this);
    }

async componentDidMount(){
    const response = await fetch("https://expense-calculator-ankit.herokuapp.com/api/categories")
    const body = await response.json();  
    this.setState({Categories :body, isLoading :false});
}


async addCategory() {
    console.log(" Fields: ",this.state)
    if (this.validateForm()) {
        console.log(this.state);
        let errors = {};
        const Categories = this.state.Categories;
        const category = this.state.category;
        console.log(category);

            await fetch('https://expense-calculator-ankit.herokuapp.com/api/category', {
            method: 'POST' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
    }).then((response) => {
      if(response.status===201){
        
        window.location.reload();

      } else{
        errors["username"] = "*Some issue occurred, please try again";

      }
      this.setState({
        errors: errors,
        Categories: Categories
      })
    }) ;   

    }

  }

  validateForm() {

    let categoryType = this.state.category.categoryType;
    let errors = {};
    let formIsValid = true;

    console.log("reached validate form: ", categoryType)
    if (!categoryType) {
      formIsValid = false;
      errors["categoryType"] = "*Please enter new category type";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }

  handleChange(event) {
    let Categories = this.state.Categories;
    let category = this.state.category;
    category.categoryType = event.target.value;
    this.setState({
      Categories: Categories,
      category
    });
  }


  async remove(id){
      const {Categories} = this.state;
      let errors={};
      console.log("Categories: ", Categories);


    await fetch('https://expense-calculator-ankit.herokuapp.com/api/category/'+id, {
        method: 'DELETE'
    }).then((response)=>{
      
        if(response.status===200){
            
            let updatedCategory = [...this.state.Categories].filter(i=>i.id!==id);
            this.setState({Categories: updatedCategory})
          } else{
            errors["categoryType"] = "*this category cannot be deleted, it has expenses";
            this.setState(
                {Categories: Categories,
                errors: errors,
            categoryId: id})
          }
        
    })

}


render() { 
    const {Categories, isLoading, categoryId} = this.state;

    if(isLoading)
        return ( <div>Loading. Please hold on, we are connecting to the database</div>)  

    return( <div>
        <AppNav />
        <BgImage />
        <Container style={{backgroundColor:'lightblue'}} >

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Categories List
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                    {
                       
                       Categories.map(category =>

                                <tr key={category.id}>
                                    <td>
                                    {category.categoryType}
                                    </td>
                                    <td>
                                    <Button size="sm" color="danger" onClick={()=> this.remove(category.id)}>Delete</Button>
                                    
                                        {
                                        categoryId===category.id &&
                                        <div color="danger" className="errorMsg">{this.state.errors.categoryType}</div>
                                        }
                                        
                                    </td>
                                </tr>
                         
                        )
                    }
                    <tr>
                    <td>
                        <Input type ="text" name="categoryType" id="categoryType" value={this.state.category.categoryType} onChange={this.handleChange}/>
                        <div color="danger" className="errorMsg">{this.state.errors.categoryType}</div>
                    </td>
                    <td>
                        <Button size="sm" color="primary" onClick={()=> this.addCategory()}>Add new Category</Button>
                    </td>
                    </tr>
                    </tbody>
                    </Table>
                    </Container>
    </div>);
}

}


export default Category;


import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductListModel } from '../productListModel';
import { Router } from '@angular/router';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

    /**
   * Variable for binding the data
   */
    searchText? : any = '' ;

    /**
     * Variable for page size
     */
    pageSize = 5;
  
    /**
     * variable for current page
     */
    currentPage = 1;
  
    /**
     * variable for total pages
     */
    totalPages  =1;

    /**
     * Variable for store response of api
     */
  product: ProductListModel[] =[];

  /**
   * Variable for stores filtered api
   */
  filteredProduct: ProductListModel[] = [];

  constructor(
    private router: Router,
    private api:ProductListService){

  }

  ngOnInit(){
    this.getProducts();
    this.filterProducts();
  }
  /**
   * URL link
   */
 // apiUrl ='https://fakestoreapi.com/products'

  /**
   * function for get api list
   */
  getProducts(){
    this.api.getProductListApi().subscribe((res:ProductListModel[])=>{
         this.product = res;
         this.filteredProduct = res;
    })
  }

  /**
   * Function showing filtered list on UI
   */
  filterProducts(){
    this.filteredProduct = this.product.filter((p)=>{
      return p.title?.toLowerCase().includes(this.searchText.toLowerCase())
    })

  }

  /**
   * Function for update the list
   */
update(id:any){
this.router.navigate(['./update', id]);
}

/**
 * Function for navigate to add product page;
 */
insertProduct(){
  this.router.navigate(['/add']);
}

/**Function for delete the row */
delete(event:any , id:number){
  let deleteRow = this.filteredProduct.findIndex((i)=>i.id == id);
  this.filteredProduct.splice(deleteRow,1);
}

/**
 * Function for get into next page
 */
goToPage(pageNumber:number){
  this.currentPage = pageNumber;
}

/**
 * Function get into pervious page
 */
goToPreviousPage(pageNumber:number){
  this.currentPage = pageNumber;
}
}

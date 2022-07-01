import {
  Sort, 
  Filters, 
  Product, 
  RoutePage, 
  ProductList,
} from '../components';
import {useFilterContext} from '../context/filter_context';
import { PathPropsType } from '../model/path';
import { ProductType } from '../model/product';

function Products({path}:PathPropsType) {
  const { FilterInitialState } = useFilterContext();
  const { filtered_products, grid_view } = FilterInitialState;

  console.log('all_products: ', filtered_products);

  return (
    <div>
      <RoutePage path={path}/>
      <section>
        <div className='products'>
          <div className='products__filters'>
            <Filters />
          </div>
          <div className='products__container'>
            <Sort />
            {
              filtered_products.length < 1 ?
              <div className='products__container__notify'>
                <h3>Sorry, no products matched your search.</h3>
              </div> :
              <div className={`products__container__content ${grid_view ? '' : 'list'}`}>
                {
                  filtered_products.map((product:ProductType) => (
                    grid_view ? 
                    <Product {...product} key={product.id} /> :
                    <ProductList {...product} key={product.id}/>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products;
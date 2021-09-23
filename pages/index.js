import { ResourcePicker } from "@shopify/app-bridge-react";
import { useState, useEffect } from "react";
import ProductEmptyState from "../components/ProductEmptyState";
import ProductPage from "../components/ProductPage";
import store from "store-js";

/*
 * SRS: Show Resource Selector to Select Products
 * SSP: Show Selected Products on the App
 * KIS: Keep your selection in the Resource Picker after you've selected the Products
 * ULS: Storing Product Info to the Client's local store
 */

function index( { shopOrigin } ) {
  /* SRS 1: Create isOpen state variable to control when the Resource Selector Opens */
  const [isOpen, setIsOpen] = useState(false)
  // initialize a state variable called isOpen to false
  // The value of isOpen is changed by the function setIsOpen

  /* SSP 1: Function to save the products to the state */
  const [products, setProducts] = useState([])

  function handleProductSelection(payload) {
    setIsOpen(false);
    setProducts(payload.selection);
    /* ULS 1: Storing products in the store */
    store.set(`${shopOrigin}-products`, payload.selection)
  }

  /* KIS 1: Use an effect to create a list of product Ids */
  const [productsId, setProductsId] = useState([]);

  useEffect(() => {
    const ids = products.map((product) => {
      return {
        id: product.id,
      };
    });
    setProductsId(ids);
  }, [products]); //Whenever any product changes you run this effect

  /* ULS 2: Retrieve the store into the variable */
  useEffect(() => {
    const productList = store.get(`${shopOrigin}-products`);
    if (productList) {
      setProducts(productList);
    }
  }, []);

  return (
    // Empty Fragement to wrap multiple components
    // Resource Picker lets you select from a list of Products 
    <>
      <ResourcePicker
        resourceType="Product"
        /* SRS 2: Add boolean to control the opening of the modal */
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        /* SSP 2: Call the function */
        onSelection={handleProductSelection}
        /* KIS 2: Pass the initial Selection to the Resource Picker */
        initialSelectionIds={productsId}
      />

      {products.length > 0 ?
        /* SSP3: Display the products saved to the state
                 Returns Polaris Page Object to display the selected Products
                 Also has a button that can be used to open the resource picker
        */
        <ProductPage setIsOpen={setIsOpen} products={products} /> : 

        /* SRS 3: Polaris Empty State Object
									Display before the products have been selected
                  Has a Select Products Button
									This sets the isOpen to true to open the resource picker
        */
        <ProductEmptyState setIsOpen={setIsOpen} />
      }
    </>
  );
}

export default index;
import { Card, ResourceList } from "@shopify/polaris";
import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  return (
    <Card>
      <ResourceList
        showHeader
        // resourceName is what shows up on the header depending on whether the 
        resourceName={{ singular: "Product", plural: "Products" }}
        items={products}
        renderItem={(product) => { return <ProductItem product={product} />; }}
      />
    </Card>
  );
}

export default ProductList;

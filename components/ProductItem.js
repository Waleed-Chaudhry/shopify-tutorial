import { ResourceList, Stack, TextStyle, Thumbnail } from "@shopify/polaris";
import React from "react";
import { HideMinor } from "@shopify/polaris-icons";

function ProductItem({ product }) {
  console.log(product); // To see which key within product contains the image
  // Handle the case of the item not having an image using a Polaris icon
  // https://polaris-icons.shopify.com/
  const image = product.images[0] ? product.images[0]?.originalSrc : HideMinor;
  return (
    <ResourceList.Item
      media={<Thumbnail source={image} />}
      id={product.id}
      accessibilityLabel={`View details for ${product.title}`}
    >
      {/* Stack will stack items in a horizontal line */}
      <Stack>
        <Stack.Item fill>
          {/* Fill will make the items use all the horizontal space that they can */}
          <h4>
            <TextStyle variation="strong">{product.title}</TextStyle>
          </h4>
        </Stack.Item>
        <Stack.Item>
          <p>${product.variants[0].price}</p>
        </Stack.Item>
      </Stack>
    </ResourceList.Item>
  );
}

export default ProductItem;

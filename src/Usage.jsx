  // const findProduct = cart.find((item) => item.id === product.id);
    // if (findProduct) {
    //   console.log(findProduct);
    //   setCart(
    //     cart.map((item) =>
    //       item.id === product.id
    //         ? { ...findProduct, quantity: findProduct.quantity + 1 }
    //         : ""
    //     )
    //   );
    // } else {
    //   setCart([...cart, { ...product, quantity: 1 }]);
    // }
    const productExist = cart.find((item) => item.id === product.id);
    if (productExist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...productExist, quantity: productExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }


    { label: "All", icon: FaProductHunt, type: "All" },
      { label: "Mobile", icon: RxMobile, type: "smartphones" },
      { label: "Laptops", icon: BsLaptop, type: "laptops" },
      { label: "Fragrances", icon: TbPerfume, type: "fragrances" },
      { label: "Skincare", icon: MdHealthAndSafety, type: "skincare" },
      { label: "Groceries", icon: BiStoreAlt, type: "groceries" },
      { label: "Home Decoration", icon: FiHome, type: "home-decoration" },
      { label: "Furniture", icon: FiHome, type: "furniture" },
      { label: "Womens Dresses", icon: GiDress, type: "womens-dresses" },
      { label: "Womens Shoes", icon: GiSonicShoes, type: "womens-shoes" },
      { label: "Womens Watches", icon: GoWatch, type: "womens-watches" },
      { label: "Womens Bags", icon: BsFillHandbagFill, type: "womens-bags" },
      {
        label: "Womens Jewellery",
        icon: GiJewelCrown,
        type: "womens-jewellery",
      },
      { label: "Mens Shirts", icon: RiShirtLine, type: "mens-shirts" },
      { label: "Mens Shoes", icon: GiConverseShoe, type: "mens-shoes" },
      { label: "Mens Watches", icon: GoWatch, type: "mens-watches" },
      { label: "Sunglasses", icon: BsSunglasses, type: "sunglasses" },
      { label: "Automotive", icon: BiChip, type: "automotive" },
      { label: "Motorcycle", icon: RiEBike2Line, type: "motorcycle" },
      { label: "Home Decor lights", icon: BsLightbulb, type: "lighting" },
      { label: "H", icon: "FiSettings", type: "" },
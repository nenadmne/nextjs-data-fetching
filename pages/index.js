function HomePage({ products }) {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [
        { id: "p1", name: "Product 1" },
        { id: "p2", name: "Product 2" },
        { id: "p3", name: "Product 3" },
      ],
    },
  };
}
export default HomePage;

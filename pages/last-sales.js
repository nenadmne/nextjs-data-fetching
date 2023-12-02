import { useEffect, useState } from "react";

function LastSales() {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://next-js-course-c7fc9-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedData);
        setLoading(false);
      });
  }, []);

  if (loading || !sales) {
    return <p> Loading...</p>;
  }

  return (
    <ul>
      {sales.map((item) => (
        <li key={item.id}>{item.username}</li>
      ))}
    </ul>
  );
}

export default LastSales;

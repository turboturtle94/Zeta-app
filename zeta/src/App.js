import { useState } from "react";
import { ImageGrid } from "./components/ImageGrid/ImageGrid";
import { Pills } from "./components/Pills/Pills";

function App() {
  const getData = async () => {
    let promiseArray = [];
    for (let i = 0; i < 3; i++) {
      promiseArray.push(
        fetch(
          "https://dummyjson.com/products/" + Math.floor(Math.random() * 30)
        )
          .then((data) => {
            return data;
          })
          .then((rawData) => {
            return rawData.json();
          })
      );
    }
    const getCategories = (itemsArray) => {
      let tempCatArray = [];
      itemsArray.forEach((item) => {
        if (tempCatArray.indexOf(item.category) < 0) {
          tempCatArray.push(item.category);
        }
      });
      return tempCatArray;
    };
    Promise.allSettled(promiseArray).then((data) => {
      let tempArray = data.map((item) => {
        const imageData = item.value;
        return {
          id: imageData.id,
          name: imageData.title,
          url: imageData.thumbnail,
          category: imageData.category,
          showImage: true,
        };
      });
      setAppData((prev) => {
        return {
          ...prev,
          imageList: [...prev.imageList, ...tempArray],
          categoryList: [...prev.categoryList, ...getCategories(tempArray)],
        };
      });
    });
  };
  const [appData, setAppData] = useState({
    imageList: [],
    categoryList: []
  });

  return (
    <div className="App">
      <button
        onClick={() => {
          getData();
        }}
      >
        Add
      </button>
      {appData.categoryList.length > 0 ? (
        <Pills
          pillsList={appData.categoryList.map((item) => {
            return item
          })}
          setAppData={setAppData}
        ></Pills>
      ) : null}
      {appData.imageList.length > 0 ? (
        <ImageGrid
          gridData={{
            results: appData.imageList,
            noOfColumns: 3,
          }}
          setAppData={setAppData}
        ></ImageGrid>
      ) : null}
    </div>
  );
}

export default App;

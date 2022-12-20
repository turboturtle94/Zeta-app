import React, { useState } from "react";

import styled from "styled-components";

export const ImageGrid = ({ gridData,setAppData }) => {
  const { results, noOfColumns } = gridData;
  return (
    <ImageGridWrapper noOfColumns={noOfColumns}>
      {results.map((item) => {
        return (
          <div key={item.id}>
            <div className="grid-item" onClick={() => {
                setAppData(prev => {
                    let temp = {...prev};
                    let imageToggled = temp.imageList.find((el) => el.id === item.id);
                    imageToggled.showImage = !imageToggled.showImage;
                    console.log(temp.imageList);
                    return temp;
                })
            }}>
              {item.showImage ? (
                <img src={item.url} alt={item.name} width={200} height={200}></img>
              ) : (
                <label> {item.category}</label>
              )}
            </div>
          </div>
        );
      })}
    </ImageGridWrapper>
  );
};

const ImageGridWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${(props) => {
    let columnTemplate = "";
    let i = 0;
    while(i < props.noOfColumns)  {
        columnTemplate += "1fr ";
        i++;
    }  
    return columnTemplate;
  }};
`;

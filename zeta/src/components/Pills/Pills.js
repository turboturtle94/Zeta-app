import React from 'react';

import styled from 'styled-components';

export const Pills = ({pillsList,setAppData}) => {
  return (
    <PillsWrapper>
    {
        pillsList.map((item,index) => {
            return <div onClick={() => {
                setAppData(prev => {
                    let temp = {...prev};
                    temp.imageList = temp.imageList.filter((el) => {
                        return el.category === item;
                    });
                    return temp;
                })
            }} key={item+""+index}>{item}</div>
        })
    }
    </PillsWrapper>
  )
}


const PillsWrapper = styled.div`
    display: flex;
    gap: 2px;
    flex-wrap: wrap;
    max-width: 400px;
    div{
        background-color: #f2f4f8;
        border-radius: 20px;
        padding: 8px;
        color: grey;
    }

`
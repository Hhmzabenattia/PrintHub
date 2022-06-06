



import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { listProduct } from "../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";


const DIV = styled.div`
z-index:3 ;
`;

const A = styled.a`
  text-decoration: none;
    margin: 20px;

`;



function SearchBar({ }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const dispatch = useDispatch();


  const productList = useSelector((state) => state.productList);
  const { loading, error, products, category } = productList;

  

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);






  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };




  return (
    <DIV>    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={"Chercher..."}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <A className="dataItem" href={`/product/${value._id}`}>
                  <p>{value.name} </p>
                  <img src={value.images} width='80px' heigth="80px"/>
              </A>
            );
          })}
        </div>
      )}
   </DIV>

  );
}

export default SearchBar;

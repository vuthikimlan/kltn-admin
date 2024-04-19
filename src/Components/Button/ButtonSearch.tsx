import { Input } from "antd";
import React, { useState } from "react";

interface DataType {
  text: string;
  handleSearchData: any;
}

const ButtonSearch = ({ text, handleSearchData }: DataType) => {
  const [searchData, setSearchData] = useState();

  const handleSearch = (e: any) => {
    setSearchData(e.target.value);
  };

  return (
    <>
      <Input.Search
        placeholder={text}
        onChange={handleSearch}
        value={searchData}
        onSearch={(values) => handleSearchData(values)}
      />
    </>
  );
};

export default ButtonSearch;

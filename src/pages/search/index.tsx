import React from 'react';

function Search(): React.ReactElement {
  return <div>search</div>;
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Search;

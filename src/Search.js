import React from 'react';

const baseUrl = 'http://openlibrary.org';

export function searchBooks(query) {
    const url = new URL(baseUrl + '/search.json');
    url.searchParams.append('title', query);

    console.log("URL", url)
    return fetch(url).then(response => response.json());
}

export function Search() {

    const [results, setResults] = React.useState(0);

    const handleSearch = (event) => {
    searchBooks(event.target.value).then(response => {
        console.log(event.target.value, "event target value")
        setResults(response.docs);
        console.log(response, "response")
    });
    console.log(event.target.value, "event target value")
    };

    const resultList = (results || []).map((book) =>
    <tr key={book.key}>
        <td>{book.title}</td>
        <td>{book.author_name && book.author_name.join(', ')}</td>
        <td>{book.first_publish_year}</td>
    </tr>
    );


  return (
    <div>
      <div className="search-input">
      <input onChange={handleSearch} type="text" placeholder="Search"/>
      </div>
      <h1 className="h1">Search Results</h1>
      <div className="books">
        <table>
          <thead>
            <tr>
              <th className="title-col">Title</th>
              <th className="author-col">Author</th>
              <th className="year-col">Pub Year</th>
            </tr>
          </thead>
          <tbody>{resultList}</tbody>
        </table>
      </div>
    </div>
  );
}
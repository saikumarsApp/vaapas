import { Component } from "react";
import "./index.css";

class Home extends Component {
  state = {
    inputValue: "",
    dogUrl: "",
    searchResults: [],
  };

  onChangeMovieName = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onClickSearchButton = () => {
    const { inputValue } = this.state;
    this.searchMovie(inputValue);
    this.getDogImage();
  };

  searchMovie = async (movieName) => {
    const query = movieName.split(" ").join("+");
    const url = `https://openlibrary.org/search.json?q=${query}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.setState({ searchResults: data.docs });
        console.log(data.docs);
      } else {
        console.log("Error: Network response was not ok");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  getDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (response.ok) {
        const data = await response.json();
        this.setState({ dogUrl: data.message });
      } else {
        console.log("Error: Network response was not ok");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  render() {
    const { dogUrl, searchResults } = this.state;
    return (
      <>
        <h1 className="movie-main-heading">Search Movie</h1>
        <div className="search-alignment-container">
          <input
            type="search"
            className="movie-search-input"
            placeholder="Search Movie Here..."
            onChange={this.onChangeMovieName}
          />
          <button
            type="button"
            className="search-button-style"
            onClick={this.onClickSearchButton}
          >
            Search
          </button>
        </div>
        <div>
          {dogUrl && (
            <img className="dog-image-styling" alt="dog" src={dogUrl} />
          )}
        </div>
        <div>
          {dogUrl ? <h2>Search Results</h2> : null}
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Home;

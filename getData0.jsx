function App() {
  const { useState, useEffect } = React;
  const { Container, Button } = ReactBootstrap;
  const [data, setData] = useState({ results: [] });
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConsulting, setIsConsulting] = useState(false);

  console.log("Rendering App");
  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
        setIsLoading(false);
        console.log("Exito");
  
      } catch (error) {
        console.log("falló");
        setIsError(true);
      }
    };

    fetchData();
  }, [url]);

    const handleSubmit = () => {
      const character = data.results.filter(item => item.name === query);
      let id = character[0].id;
      setUrl(`https://rickandmortyapi.com/api/character/${id}`);
      setIsConsulting(true);
      console.log('hola');
    }

  if(!isConsulting) {
    return (
    <Container className="contain">
      <input onChange={(event) => setQuery(event.target.value)}></input>
      <Button variant="success" onClick={(event) => handleSubmit(event)}>Search</Button>
      {isError && <div>Couldn't Fetch Data!</div>}
      {isLoading ? 
        <div>Still Loading...</div> : 
        <ul className="ul">
          {data.results.map((item) => (
            <div id={item.id}>
              <h4>{item.name}</h4>
              <img src={item.image} width="100" />
            </div>
            
          ))}
        </ul>
      }
    </Container>
  );
  } else {
    return (
    <Container className="contain">
      {console.log(data)}
      <h2>{data.name}</h2>
      <img src={data.image}/>
      <ul>
        <li>{data.status}</li>
        <li>{data.species}</li>
        <li>{data.gender}</li>
      </ul>
    </Container>
    );
  }
  
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));



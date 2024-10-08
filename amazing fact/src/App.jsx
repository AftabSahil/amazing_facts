import './index.css';
const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];
  
  const initialFacts = [
    {
      id: 1,
      text: "React is being developed by Meta (formerly facebook)",
      source: "https://opensource.fb.com/",
      category: "technology",
      votesInteresting: 24,
      votesMindblowing: 9,
      votesFalse: 4,
      createdIn: 2021,
    },
    {
      id: 2,
      text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
      source:
        "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
      category: "society",
      votesInteresting: 11,
      votesMindblowing: 2,
      votesFalse: 0,
      createdIn: 2019,
    },
    {
      id: 3,
      text: "Lisbon is the capital of Portugal",
      source: "https://en.wikipedia.org/wiki/Lisbon",
      category: "society",
      votesInteresting: 8,
      votesMindblowing: 3,
      votesFalse: 1,
      createdIn: 2015,
    },
  ];
  
  function App()//first component
  {
    const appTitle="THE PLACE WHERE YOU LEARN SOMETHING NEW...";
    return (
      <>
      {/* HEADER */}
    <header className="header1">
      <div className="Logo">
        <img src="./public/amazing.png" height="68" width="68" alt="Fact-learn-Today Logo"/>
        <h1>{appTitle}</h1>
      </div>
      <button className="btn btn-large btn-open">Share a fact Now</button>
    </header>
  
  
    <NewFactForm/>
    <main className="grid-container">
    <CategoryFilter/>
    <FactList/>
    </main>
  </>
  );
  }
  
  function NewFactForm()
  {
    return(
    <form className='fact-form'>
        <input type="text" placeholder="Share a fact with the world" />
        <input type="text" placeholder="Trustworthy source..." />
        <select>
            <option value="">Choose Category</option>
        </select>
        <button className="btn btn-large">Post</button>
    </form>)
}
  function CategoryFilter()
  {
    return (<aside>CategoryFilter</aside>)
  }
  function FactList()
  {
    //lets create a variable 
    const facts=initialFacts;//temporary variable
    return(
    <section>
      <ul className="facts-list">{facts.map((facts)=><Fact key={facts.id} fact={facts}/>)}
      </ul>
      <p>The total fact in Database are {facts.length} ,you can add more !</p>
    </section>
    )
  }
  function Fact({fact})
  // {console.log(props);
  {
    return (
      // <li key={fact.id} className="facts">
      <li  className="facts">
          <p>{fact.text}<a className="source" href={fact.source} target="_blank" rel="noreferrer">(Source)</a></p>
          <span className="category" style={{backgroundColor:CATEGORIES.find((cat)=>cat.name===fact.category).color}}>{fact.category}</span> 
          <div className="vote-buttons">
            <button>👍{fact.votesInteresting}</button>
            <button>🤯{fact.votesMindblowing}</button>
            <button>⛔️{fact.votesFalse}</button> 
          </div>
        </li>
    
      );
  
  }
  export default App;
  
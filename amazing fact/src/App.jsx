import './index.css';

function App()//first component
{
  const appTitle="Fact learn today";
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
  <FactForm/>
  <Category/>
</>
);
}
//factform 
function FactForm()
{
    return(
    <form>
        <input type="text" placeholder="Share a fact with the world" />
        <input type="text" placeholder="Trustworthy source..." />
        <select>
            <option value="">Choose Category</option>
        </select>
        <button className="btn btn-large">Post</button>
    </form>
    
)
}

export default App;
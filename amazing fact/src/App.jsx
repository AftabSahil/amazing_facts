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
    return(<h1>This is will be fact form component</h1>)
}

export default App;
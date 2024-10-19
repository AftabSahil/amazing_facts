import './style.css'
import {useEffect, useState} from 'react'
import supabase from './supabase';
function App() {
  const [showForm,setForm]=useState(false);
  // const [facts,setFacts]=useState(initialFacts);
  const [facts,setFacts]=useState([]);
  const [isLoading,setIsLoading] = useState(false);
  //Adding new state to toggle category
  const [currentCategory,setCurrentCategory] = useState("all");
  useEffect(function() {
    async function getFacts(){
      setIsLoading(true);
      //creating a query object
      let query = supabase.from('facts').select('*');
      if(currentCategory!=="all")
      {
        //using .eq() function to change the current category when the button is clicked
        query=query.eq("category",currentCategory)
      }
      // const { data: facts, error } = await supabase.from('facts').select('*').eq("category","technology").order("text",{ascending:true}).limit(1000);
      // console.log(facts);
      const { data: facts, error } = await query.order("text",{ascending:true}).limit(1000);

      console.log(error);
      if(!error)
      {
        setFacts(facts);
      }
      else
      {
        alert("there was a problem loading data");
      }
      setIsLoading(false);
    }
    getFacts();

//since useEffect function loads only one time while opening the site so when we click a button it wont reload
//and for that we pass the state changing variable to the list so useEffect function gets to know what to change 
  },[currentCategory]);
  return(
    <>
    <Header setForm={setForm} showForm={showForm}/>
    {/* {showForm?<NewFactForm facts={facts} setFacts={setFacts} setForm={setForm}/>:null} */}
    {showForm?<NewFactForm facts={facts} setFacts={setFacts} setForm={setForm}/>:null}
    <main className="grid-container">
      {/* passing the setCurrentCategory state function as a prop to CategoryFilter component */}
        <CategoryFilter setCurrentCategory={setCurrentCategory}/>
        {isLoading ? <Loader/>:<Factslist facts={facts} setFacts={setFacts}/>}
        
        {/* <Factslist facts={facts}/> */}
    </main>
    <ThemeToggle/>
    </>
    )
}
function Loader()
{
  return <p className='message'>Loading your facts,Please Wait for facts...</p>
}
function Header({setForm,showForm})
{
  return(
    <header className="header1">
    <div className="Logo">
      <img src="logo.png" alt="Fact-learn-today logo"/>
    </div> 
    <button className="btn btn-large btn-open" onClick={()=>setForm(!showForm)}>
      Share a fact
    </button>
  </header>
    )
}
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
function isValidUrl(string)
{
  let url;
  try{url =new URL(string);}
  catch(_){return false;}
  return url.protocol==="http:"||url.protocol==="https:"
}
 function NewFactForm({setFacts,setForm})
{
  const [text,setText]=useState("");
  const textLength=text.length;
  const [source,setSource]=useState("");
  const [category,setCategory]=useState("");
  const[isUploading,setIsUploading]=useState(false);
  async function handleSubmit(e)
  {
    //1.prevent the browser reload
    e.preventDefault();
    console.log(text,source,category);
    //2.Check if the data is valid,if so create a new fact
    if(text && isValidUrl(source) && category && textLength<=200)
    {
     
   
      //3.5 Upload fact to supabase and receive facts
      setIsUploading(true);
      const {data:newFact,error}= await supabase.from("facts").insert([{text,source,category}]).select();
      setIsUploading(false);
      console.log(error);
     
      setFacts((facts)=>[newFact[0],...facts]);
    //5.Reset input field
      setText("");
      setSource("");
      setCategory("");
    //6.Close the fields
      setForm(false);
    }
    
  }
  return (
    <form className="fact-form" onSubmit={(handleSubmit)}>
       <input type="text" placeholder="share a fact with the world" value={text}  
       onChange={(e)=>setText(e.target.value)} disabled={isUploading}/>

       <span>{200-textLength}</span>

       <input type="text" placeholder="Trustworthy source..." value={source} 
       onChange={(e)=>setSource(e.target.value)} disabled={isUploading}/>

       <select value={category} onChange={(e)=>setCategory(e.target.value)} disabled={isUploading}>
            <option value="">Choose category</option>
            {
              CATEGORIES.map(
                (cat)=>
                <option value={cat.name} key={cat.name}>
                  {cat.name.toUpperCase()}
                </option>)
            }
        </select>
        <button className="btn btn-large" disabled={isUploading}>Post</button>
    </form>
  )
}

function CategoryFilter({setCurrentCategory})
{
  return (
    <aside className="dropdown-center droper">
      <button className="btn dropdown-toggle drop-btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
    CategoryFilter
  </button>
      <ul className="dropdown-menu">
        <li className="category-list">
          <button className="btn all btn-all-categories" onClick={()=>setCurrentCategory("all")}>
            All
          </button>
        </li>
        {
          CATEGORIES.map(
            (cat)=>
            <li className="category-list" key={cat.name}>
              <button className="btn btn-category" style={{backgroundColor:cat.color}} onClick={()=>setCurrentCategory(cat.name)}>
                {cat.name}
              </button>
            </li>

            )
        }
      </ul>
    </aside>
    );
}
function Factslist({facts,setFacts})
{
  if(facts.length===0)
  {
    return <p className='message'>No facts for this category , pls create a fact😊</p>;
  }
  // const facts=initialFacts;
  return (
    <section>
      <ul className="facts-list">
        {facts.map(
          (facts)=><Fact key={facts.id} fact={facts} setFacts={setFacts}/>
          )
        }
      </ul>
    </section>
    )
}
function Fact({ fact, setFacts })
 {
  const [isUpdate, setIsUpdate] = useState(false);
  const [userVote, setUserVote] = useState(null); // Track the user's vote
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdate(true);
    let newVoteCount = fact[columnName] + 1;

    if (userVote === columnName) {
      // Undo vote if the user clicks the same button again
      newVoteCount -= 1;
      setUserVote(null); // Reset user vote
    } else {
      // Set user vote to the new one
      setUserVote(columnName);
    }

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: newVoteCount })
      .eq("id", fact.id)
      .select();

    setIsUpdate(false);

    if (!error) {
      // Check if the updated column is votesFalse
      if (columnName === "votesFalse" && updatedFact[0].votesFalse >= 100) {
        // Delete the fact from Supabase
        const { error: deleteError } = await supabase
          .from("facts")
          .delete()
          .eq("id", fact.id);

        if (!deleteError) {
          // Remove the fact from the state
          setFacts((facts) => facts.filter((f) => f.id !== fact.id));
        } else {
          console.error("Error deleting fact:", deleteError);
        }
      } else {
        // Update the state for the normal vote counts
        setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));
      }
    }
  }

  return (
    <li className="facts">
      <p>
        {isDisputed ? <span className="disputed">[❌DISPUTED]</span> : null}
        {fact.text}<a className="source" href={fact.source} target="_blank" rel="noreferrer">(Source)</a>
      </p>

      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdate}
          style={{ fontWeight: userVote === "votesInteresting" ? "bold" : "normal" }}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdate || userVote === "votesFalse"} // Disable if user has disliked
          style={{ fontWeight: userVote === "votesMindblowing" ? "bold" : "normal" }}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => handleVote("votesFalse")}
          disabled={isUpdate}
          style={{ fontWeight: userVote === "votesFalse" ? "bold" : "normal" }}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the user's preference from local storage or default to light mode
  useEffect(() => {
      const savedMode = localStorage.getItem('dark-mode');
      if (savedMode === 'true') {
          setIsDarkMode(true);
          document.body.classList.add('dark-mode');
          // const images = document.getElementsByClassName('theme-image');
          document.getElementsByClassName("Logo")[0].classList.add('dark-mode');
      } else {
          document.body.classList.remove('dark-mode');
          document.getElementsByClassName("Logo")[0].classList.remove('dark-mode');
      }
  }, []);

  const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark-mode', !isDarkMode);
  };

  return (
      <div>
          <button onClick={toggleTheme}>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
      </div>
  );
};


export default App;



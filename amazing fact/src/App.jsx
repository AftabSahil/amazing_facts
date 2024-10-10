import { useState } from 'react'
function App() {
return (
  <>
  <div className="center-container">
        <header className="header1">
            <div className="Logo"> 
                <img src="./fact logo.png" alt="logo"/>
                <h1>Amazing Facts</h1>
            </div>
            <button className="btn btn-large">Share a fact</button>
        </header>
    <form className="fact-form">
        <input type="text" placeholder="share a fact with the world"/>
        <span>200</span>
        <input type="text" placeholder="Trustworthy source..."/>
        <select>
            <option value="">Choose categoryy</option>"
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="finance">Finance</option>
        </select>
        <button className="btn btn-large">Post</button>
    </form>
    <main className="grid-container">
            <aside>
                    <ul>
                        <li className="category-list">
                            <button className="btn btn-all-categories">All</button>
                        </li>
                        <li className="category-list">
                            <button className="btn btn-category" style={{backgroundColor:"#3b82f6"}}>Technology</button>
                        </li>
                        <li className="category-list">
                            <button className="btn btn-category" style={{backgroundColor:"#16a34a"}}>Science</button>
                        </li>
                    </ul>
                </aside>
                
                
        </main>
    </div>
  </>
)
}

export default App

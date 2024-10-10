import { useState } from 'react'
function App() {
return (
  <>
  <div className="center-container">
        <header className="header1">
            <div className="Logo"> 
                <img src="/public/amazing.png" alt="logo"/>
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
                <section>
                <ul>
                    <li className="facts">
                        <p>React is being developed by Meta (formerly facebook)<a class="source" href="https://opensource.fb.com/" target="_blank">(Source)</a></p>
                        
                        <span className="category" style={{backgroundColor:'#3b82f6'}}>Technology</span>
                        <div className="vote-buttons">
                            <button>👍24</button>
                            <button>🤯9</button>
                            <button>⛔️4</button>
                        </div>
                    </li>

                    <li className="facts">
                        <p style={{display: 'inline-block'}}>Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%</p>
                        <span className="category" style={{backgroundColor:'#eab308'}}>society</span>
                        <div className="vote-buttons">
                            <button>👍10</button>
                            <button>🤯2</button>
                            <button>⛔️0</button>
                        </div>
                    </li>

                    <li className="facts">
                        <p>Lisbon is the capital of Portugal</p>
                        <span className="category" style={{backgroundColor:'#eab308'}}>society</span>
                        <div className="vote-buttons">
                            <button>👍8</button>
                            <button>🤯3</button>
                            <button>⛔️1</button>
                        </div>
                    </li>
                </ul>
            </section>
                
                
        </main>
    </div>
  </>
)
}

export default App

import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Blog from "./components/Blog";
import { Si1001Tracklists } from "react-icons/si";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function App() {
    const [slogan, setSlogan] = useState(
        "Unleash the Ape-Peal: Make Marketing Magic with our Monkey Mastermind!"
    );
    const [showBlog, setShowBlog] = useState(false);
    const [showRap, setShowRap] = useState(false);
    const [prompt, setPrompt] = useState("ways to learn history");

    const handleText = (event) => {
        event.preventDefault();
        let text = event.target.value;
        setPrompt(text);
        console.log("prompt is now", prompt);
    };

    const viewBlog = () => {
        console.log("showing blog!");
        setShowBlog(true);
    };
    const viewRap = () => {
        setShowRap(!showRap);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={"./gonky-marketing-m.png"}
                    className="App-logo"
                    alt="logo"
                />
                <div id="rapbutton" onClick={viewRap}>
                    <Si1001Tracklists />
                </div>
                {showRap && (
                    <p>
                        My name is Gonky and I'm here to provide
                        <br />
                        some funky marketing content, server-side!
                        <br />
                        I'll write tweets and blogs to make your app explode
                        <br />
                        and give your startup team more time to code!
                        <br />
                    </p>
                )}
                <input onChange={handleText} />
                <button onClick={viewBlog}>Make Blog</button>
                {showBlog && <Blog prompt={prompt} />}
            </header>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function Blog(props) {
    const [tweets, setTweets] = useState(["Loading Tweets..."]);
    const [liPosts, setLIPosts] = useState(["Loading LinkedIn Posts..."]);

    const [blogText, setBlogText] = useState([
        "Loading blog...",
        "Still loading...",
    ]);
    const prompt = "Diverse children learning with computers, photo";
    const [picURL, setPicURL] = useState(
        "https://passed.ai/wp-content/uploads/2023/01/1-768x768.png"
    );

    const getPicURL = async () => {
        let response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        let image_url = response.data.data[0].url;
        setPicURL(image_url);
    };

    useEffect(() => {
        const getBlogText = async () => {
            let response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                // model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful writer creating blog articles. At the end of each blog post, you should subtly mention your company, Passed.AI, which lets teachers prove whether student work was generated by a human or an AI.  Your work should always be formatted as a blog entry, not a letter, and you should always use the first-person plural voice.",
                    },
                    {
                        role: "user",

                        content: `Write a blog post aimed at teachers (without pretending to be a teacher) with helpful information about ${props.prompt}`,
                    },
                ],
            });
            const myBlog = response.data.choices[0].message.content;
            console.log("unedited:", myBlog);
            const editedBlog = myBlog
                .replace("Title:", "")
                .replace("Conclusion\n\n", "")
                .replace("Introduction\n\n", "");
            setBlogText(editedBlog.split("\n\n"));
            console.log("Edited:", editedBlog);
        };

        const getTweets = async () => {
            let response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a friendly, cool Twitter user who is excited to share blog posts. You write in all lowercase and use one to two emojis per post and at least two relevant hashtags. You should always use the first-person plural voice. You do not use double quotation marks ever.",
                    },
                    {
                        role: "user",
                        content: `Create a valid JavaScript array consisting of three tweets, each promoting a blog post about ${props.prompt} following this format:
                        ["First tweet", "Second tweet", "Third tweet"]`,
                    },
                ],
            });
            let myTweets = JSON.parse(
                response.data.choices[0].message.content.replaceAll(
                    "[link]",
                    ""
                )
            );
            console.log("tweets:", myTweets);
            setTweets(myTweets);
        };

        getTweets();

        const getLIPosts = async () => {
            let response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a friendly, professional marketer who is excited to share helpful and informative blog posts on LinkedIn. You should use the first-person plural voice and lots of relevant hashtags. You do not use double quotation marks ever.",
                    },
                    {
                        role: "user",
                        content: `Create a valid JavaScript array consisting of three LinkedIn posts promoting a blog about ${props.prompt}. The response should follow this format:
                        ["First post", "Second post", "Third post"]
                        `,
                    },
                ],
            });
            let myLIPosts = JSON.parse(
                response.data.choices[0].message.content.replace("[link]", "")
            );
            console.log("LIposts:", myLIPosts);
            setLIPosts(myLIPosts);
        };

        getLIPosts();

        getBlogText();

        // getPicURL();
    }, []);

    return (
        <div>
            <h1>Blog</h1>
            {/* <img src={picURL} alt={prompt} /> */}
            <div className="blog-text">
                <h2>Suggested Tweets</h2>
                {Array.isArray(tweets) ? (
                    tweets.map((e, i) => {
                        return <p key={i}>{e}</p>;
                    })
                ) : (
                    <p>{tweets}</p>
                )}
                <h2>Suggested LI/FB Posts</h2>
                {Array.isArray(liPosts) ? (
                    liPosts.map((e, i) => {
                        return <p key={i}>{e}</p>;
                    })
                ) : (
                    <p>{liPosts}</p>
                )}
                <h2>Article</h2>
                {blogText.map((e, i) => {
                    return <p key={i}>{e}</p>;
                })}
            </div>
        </div>
    );
}

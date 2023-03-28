# Gonky's Marketing Helps You Be Good at Business

Blogs can be a useful marketing tool, but sometimes you'd rather just build your product.

Meet Gonky, the funky dancing ape who loves to write blog articles for startups!

Feed him a subject and he'll spit out not just an article but also tweets and Facebook/LinkedIn posts to promote it.

Gonky needs an OpenAI API key for now: just copy our .env.example file, enter your API key, and rename it to '.env.' Then run `npm start` and visit Gonky at `http://localhost:3000` in your browser!

Note: Gonky currently uses gpt-3.5-turbo because it's cheaper than gpt-4. He's also currently calibrated for the company I work at as of early 2023. To get better results, open `Blog.jsx`, change the prompts, and in the various function calls, set `"model" : "gpt-4."`

## Available Scripts

In the project directory, you can run the usual suspects:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

### `npm run build`

### `npm run eject`
